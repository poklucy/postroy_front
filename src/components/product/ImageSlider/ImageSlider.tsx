import React, { useRef, useState } from 'react';
import styles from './ImageSlider.module.css';

interface ImageSliderProps {
    images: string[];
    alt: string;
    index?: number;
    onIndexChange?: (index: number) => void;
    indicator?: boolean;
    hoverSwitch?: boolean;
    className?: string;
    imageClassName?: string;
}

const SWIPE_THRESHOLD = 40;

export const ImageSlider: React.FC<ImageSliderProps> = ({
                                                            images,
                                                            alt,
                                                            index: controlledIndex,
                                                            onIndexChange,
                                                            indicator = true,
                                                            hoverSwitch = false,
                                                            className,
                                                            imageClassName,
                                                        }) => {
    const [innerIndex, setInnerIndex] = useState(0);
    const index = Math.min(controlledIndex ?? innerIndex, images.length - 1);
    const startX = useRef<number | null>(null);
    const swiped = useRef(false);
    const multiple = images.length > 1;

    const goTo = (next: number) => {
        const clamped = Math.max(0, Math.min(images.length - 1, next));
        if (clamped === index) return;
        setInnerIndex(clamped);
        onIndexChange?.(clamped);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        // Inside a product carousel the swipe belongs to the carousel itself.
        if (!multiple || e.currentTarget.closest('.swiper')) return;
        startX.current = e.clientX;
        swiped.current = false;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) < SWIPE_THRESHOLD) return;
        swiped.current = true;
        goTo(index + (dx < 0 ? 1 : -1));
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!hoverSwitch || !multiple || e.pointerType !== 'mouse' || startX.current !== null) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const zone = Math.floor(((e.clientX - rect.left) / rect.width) * images.length);
        goTo(zone);
    };

    return (
        <div
            className={[styles.slider, className].filter(Boolean).join(' ')}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { startX.current = null; }}
            onPointerMove={handlePointerMove}
            onMouseLeave={() => hoverSwitch && goTo(0)}
            onClickCapture={(e) => {
                if (swiped.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    swiped.current = false;
                }
            }}
            onDragStart={(e) => e.preventDefault()}
        >
            <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
                {images.map((src, i) => (
                    <div key={i} className={styles.slide} aria-hidden={i !== index}>
                        <img
                            src={src}
                            alt={multiple ? `${alt}, фото ${i + 1}` : alt}
                            className={imageClassName}
                            loading={i === 0 ? undefined : 'lazy'}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>

            {indicator && multiple && (
                <div className={styles.indicator} aria-hidden="true">
                    {images.map((_, i) => (
                        <span key={i} className={`${styles.line} ${i === index ? styles.lineActive : ''}`} />
                    ))}
                </div>
            )}
        </div>
    );
};
