import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Dropdown } from '@/components/common/Dropdown';
import { Input, TextArea } from '@/components/common/Input';
import { COURIER_COMMENT_TAGS, DELIVERY_SERVICES, PICKUP_POINTS } from '@/api/mockData/checkout';
import { Checkbox } from '@/components/common/Checkbox';
import { RadioButton } from '@/components/common/RadioButton';
import { AVAILABLE_DELIVERY_METHODS } from '@/config/checkout.config';
import { Address } from '@/types/user.types';
import { DeliveryMethod } from '@/types/order.types';
import styles from '../CheckoutPage.module.css';

interface DeliverySectionProps {
    method: DeliveryMethod;
    onMethodChange: (method: DeliveryMethod) => void;
    addresses: Address[];
    addressId: string;
    onAddressChange: (id: string) => void;
    onAddAddress: (value: string) => void;
    pickupPointId: string;
    onPickupPointChange: (id: string) => void;
    services: string[];
    onToggleService: (service: string) => void;
    comment: string;
    onCommentChange: (value: string) => void;
    error?: string;
}

const PinIcon = () => (
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
        <path
            d="M7 19C7 19 13 12.2 13 7.2C13 3.7 10.3 1 7 1C3.7 1 1 3.7 1 7.2C1 12.2 7 19 7 19Z"
            stroke="black"
        />
        <circle cx="7" cy="7" r="2.5" stroke="black" />
    </svg>
);

export const DeliverySection: React.FC<DeliverySectionProps> = ({
                                                                    method,
                                                                    onMethodChange,
                                                                    addresses,
                                                                    addressId,
                                                                    onAddressChange,
                                                                    onAddAddress,
                                                                    pickupPointId,
                                                                    onPickupPointChange,
                                                                    services,
                                                                    onToggleService,
                                                                    comment,
                                                                    onCommentChange,
                                                                    error,
                                                                }) => {
    const [newAddressOpen, setNewAddressOpen] = useState(false);
    const [newAddress, setNewAddress] = useState('');

    const showNewAddressForm = newAddressOpen || addresses.length === 0;

    const handleSaveAddress = () => {
        if (!newAddress.trim()) return;
        onAddAddress(newAddress);
        setNewAddress('');
        setNewAddressOpen(false);
    };

    const handleTagClick = (tag: string) => {
        onCommentChange(comment ? `${comment} ${tag}` : tag);
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Выберите способ получения</h2>

            <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Тип доставки</span>
                <div className={styles.radioRow}>
                    {AVAILABLE_DELIVERY_METHODS.map(option => (
                        <RadioButton
                            key={option.value}
                            name="deliveryMethod"
                            value={option.value}
                            checked={method === option.value}
                            onChange={() => onMethodChange(option.value)}
                            label={option.label}
                        />
                    ))}
                </div>
            </div>

            {method === 'pickup' ? (
                <div className={styles.fieldGroup}>
                    <span className={styles.fieldLabel}>Магазин</span>
                    <div className={styles.radioColumn}>
                        {PICKUP_POINTS.map(point => (
                            <RadioButton
                                key={point.id}
                                name="pickupPoint"
                                value={point.id}
                                checked={pickupPointId === point.id}
                                onChange={onPickupPointChange}
                                label={
                                    <>
                                        {point.name} <span className={styles.muted}>{point.schedule}</span>
                                    </>
                                }
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.fieldGroup}>
                        <span className={styles.fieldLabel}>Адрес</span>

                        {addresses.length > 0 && (
                            <Dropdown
                                options={addresses.map(address => ({ value: address.id, label: address.value }))}
                                value={addressId}
                                onChange={onAddressChange}
                                icon={<PinIcon />}
                                placeholder="Выберите адрес доставки"
                                ariaLabel="Адрес доставки"
                                size="md"
                                error={Boolean(error)}
                                fullWidth
                            />
                        )}

                        {showNewAddressForm ? (
                            <div className={styles.newAddress}>
                                <Input
                                    placeholder="Город, улица, дом, квартира"
                                    value={newAddress}
                                    invalid={Boolean(error) && addresses.length === 0}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSaveAddress();
                                        }
                                    }}
                                />
                                <Button variant="outline" onClick={handleSaveAddress} disabled={!newAddress.trim()}>
                                    Сохранить адрес
                                </Button>
                            </div>
                        ) : (
                            <button type="button" className={styles.linkButton} onClick={() => setNewAddressOpen(true)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <circle cx="10" cy="10" r="9.5" stroke="black" />
                                    <path d="M10 6V14M6 10H14" stroke="black" />
                                </svg>
                                <span>Новый адрес</span>
                            </button>
                        )}

                        {error && <span className={styles.errorText}>{error}</span>}
                    </div>

                    <div className={styles.fieldGroup}>
                        <span className={styles.fieldLabel}>Дополнительные услуги</span>
                        <div className={styles.checkboxColumn}>
                            {DELIVERY_SERVICES.map(service => (
                                <Checkbox
                                    key={service}
                                    checked={services.includes(service)}
                                    onChange={() => onToggleService(service)}
                                    label={service}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}

            <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>
                    {method === 'courier' ? 'Комментарий для курьера' : 'Комментарий к заказу'}
                </span>
                {method === 'courier' && (
                    <div className={styles.tags}>
                        {COURIER_COMMENT_TAGS.map(tag => (
                            <button key={tag} type="button" className={styles.tag} onClick={() => handleTagClick(tag)}>
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
                <TextArea
                    value={comment}
                    onChange={(e) => onCommentChange(e.target.value)}
                    placeholder={
                        method === 'courier'
                            ? 'Здесь вы можете указать дополнительную информацию для курьера'
                            : 'Здесь вы можете указать дополнительную информацию к заказу'
                    }
                />
            </div>
        </section>
    );
};
