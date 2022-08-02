export const SORTING_TYPES = {
    BY_PRICE_ASC: 'По возрастанию цены',
    BY_PRICE_DESC: 'По убыванию цены',
    BY_DISCOUNT: 'По размеру скидки'
};

export const VIEW_TYPES = {
    CARDS: 'CARDS',
    LIST: 'LIST'
};

export const DELIVERY_TYPES = [
    {
        key: 'KUR',
        name: 'Курьерская доставка',
        points: [
            {
                name: 'КИТ',
                price: 2500
            },
            {
                name: 'Деловые линии',
                price: 2500
            },
            {
                name: 'СDEK',
                price: 2500
            },
            {
                name: 'Энергия',
                price: 2500
            },
        ]
    },
    {
        key: 'SAM',
        name: 'Самовывоз из пункта выдачи',
        points: [
            {
                name: 'Улица уличная'
            },
            {
                name: 'Улица уличечная'
            },
        ]
    },
];

export const PAYMENT_TYPES = [
    {
        type: 'CARD_ONLINE',
        text: 'Оплата банковской картой онлайн',
        description: 'Visa, Mastercard, MIR'
    },
    {
        type: 'CARD_DELIVERY',
        text: 'Оплата банковской картой курьеру',
        description: 'Любая банковская карта'
    },
    {
        type: 'NAL',
        text: 'Оплата наличными курьеру',
        description: ''
    },
];

export const STATUS_TYPES = {
    recived: {
        title: 'Получен',
        style: 'status status-filled'
    },
    delivery: {
        title: 'Доставка',
        style: 'status status-disabled'
    },
    awaiting: {
        title: 'Ожидает отправки',
        style: 'status status-outline'
    },
    processing: {
        title: 'В обработке',
        style: 'status status-outline-black'
    }
};

export const TOAST_OPTIONS = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};