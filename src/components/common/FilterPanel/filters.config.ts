export interface FilterOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface FilterGroup {
    id: string;
    title: string;
    type: 'checkbox' | 'price';
    options?: FilterOption[];
    min?: number;
    max?: number;
    defaultOpen?: boolean;
}

export const FILTER_GROUPS: FilterGroup[] = [
    {
        id: 'brand',
        title: 'Бренд',
        type: 'checkbox',
        defaultOpen: true,
        options: [
            { value: 'aquali', label: 'Aqualink' },
            { value: 'ballu', label: 'Ballu' },
            { value: 'edisson', label: 'Edisson' },
            { value: 'electrolux', label: 'Electrolux' },
            { value: 'thermex', label: 'Thermex' },
        ],
    },
    { id: 'price', title: 'Цена', type: 'price', min: 5000, max: 10000, defaultOpen: true },
    {
        id: 'color',
        title: 'Цвет',
        type: 'checkbox',
        defaultOpen: true,
        options: [
            { value: 'white', label: 'Белый' },
            { value: 'graphite', label: 'Графит' },
            { value: 'grey', label: 'Серый', disabled: true },
        ],
    },
    {
        id: 'stock',
        title: 'Наличие в магазине',
        type: 'checkbox',
        defaultOpen: true,
        options: [
            { value: 'taganka', label: 'На Таганке' },
            { value: 'vyatskaya', label: 'На Вятской', disabled: true },
        ],
    },
    {
        id: 'volume',
        title: 'Объем бака, л',
        type: 'checkbox',
        defaultOpen: true,
        options: [
            { value: '10', label: '10' },
            { value: '20', label: '20' },
            { value: '30', label: '30' },
            { value: '50', label: '50' },
            { value: '75', label: '75' },
            { value: '100', label: '100', disabled: true },
        ],
    },
    {
        id: 'view',
        title: 'Вид',
        type: 'checkbox',
        defaultOpen: true,
        options: [
            { value: 'nakopitelny', label: 'Накопительный' },
            { value: 'electric', label: 'Электрический' },
        ],
    },
    {
        id: 'mount',
        title: 'Тип монтажа',
        type: 'checkbox',
        defaultOpen: true,
        options: [
            { value: 'vertical', label: 'Вертикальный' },
            { value: 'universal', label: 'Универсальный' },
            { value: 'horizontal', label: 'Горизонтальный' },
        ],
    },
    { id: 'tankMaterial', title: 'Материал бака', type: 'checkbox', options: [] },
    { id: 'power', title: 'Мощность, кВт', type: 'checkbox', options: [] },
    { id: 'supply', title: 'Тип подводки', type: 'checkbox', options: [] },
    { id: 'country', title: 'Страна производитель', type: 'checkbox', options: [] },
];

export const FILTER_TAGS = ['Экономичный', 'Большой', 'Компактный', 'Над раковиной'];

export const DEFAULT_PRICE_RANGE: [number, number] = [5000, 10000];

export const DEFAULT_CHECKED: Record<string, string[]> = {
    brand: ['aquali'],
    color: ['white'],
    stock: ['taganka'],
};
