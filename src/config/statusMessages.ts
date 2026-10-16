import { ErrorKind, RequestError } from '@/types/request.types';

export interface StatusText {
    title: string;
    description?: string;
}

export const ERROR_MESSAGES: Record<ErrorKind, StatusText> = {
    network: {
        title: 'Нет подключения к интернету',
        description: 'Проверьте соединение — мы повторим попытку автоматически, как только сеть появится.',
    },
    timeout: {
        title: 'Сервер слишком долго отвечает',
        description: 'Попробуйте повторить запрос через несколько секунд.',
    },
    not_found: {
        title: 'Ничего не найдено',
        description: 'Возможно, данные были удалены или ссылка устарела.',
    },
    unauthorized: {
        title: 'Требуется авторизация',
        description: 'Войдите в аккаунт, чтобы продолжить.',
    },
    forbidden: {
        title: 'Нет доступа',
        description: 'У вас недостаточно прав для просмотра этого раздела.',
    },
    validation: {
        title: 'Проверьте введённые данные',
        description: 'Некоторые поля заполнены неверно.',
    },
    rate_limit: {
        title: 'Слишком много запросов',
        description: 'Подождите минуту и попробуйте снова.',
    },
    server: {
        title: 'Сервис временно недоступен',
        description: 'Мы уже работаем над этим. Попробуйте повторить попытку чуть позже.',
    },
    unknown: {
        title: 'Что-то пошло не так',
        description: 'Попробуйте обновить страницу или повторить действие позже.',
    },
};

export const STATUS_MESSAGES = {
    common: {
        loading: 'Загрузка…',
        retry: 'Повторить',
        retrying: 'Повторяем…',
        reload: 'Обновить страницу',
        toHome: 'На главную',
        toCatalog: 'Перейти в каталог',
    },

    network: {
        offline: 'Нет подключения к интернету. Часть данных может быть недоступна.',
        online: 'Соединение восстановлено',
    },

    pages: {
        notFound: {
            title: 'Такой страницы нет',
            description: 'Возможно, она была удалена, переехала или в адресе допущена опечатка. Попробуйте найти нужный товар через поиск или загляните в каталог.',
        },
        serverError: {
            title: 'Что-то пошло не так',
            description: 'Мы уже знаем о проблеме и скоро всё исправим. Попробуйте обновить страницу или вернуться на главную.',
        },
    },

    catalog: {
        loading: 'Загружаем каталог…',
        error: { title: 'Не удалось загрузить каталог' },
        empty: { title: 'Каталог пока пуст', description: 'Мы наполняем витрину — загляните чуть позже.' },
    },

    categoryMenu: {
        loading: 'Загружаем категории…',
        error: { title: 'Не удалось загрузить категории' },
        empty: { title: 'В этой категории пока нет подкатегорий' },
        hint: { title: 'Выберите категорию' },
    },

    category: {
        loading: 'Загружаем раздел…',
        error: { title: 'Не удалось загрузить раздел каталога' },
        notFound: {
            title: 'Раздел не найден',
            description: 'Возможно, он был переименован или удалён. Загляните в каталог — там есть всё актуальное.',
        },
    },

    products: {
        loading: 'Загружаем товары…',
        error: { title: 'Не удалось загрузить товары' },
        empty: {
            default: { title: 'Товары не найдены' },
            category: { title: 'В этой категории пока нет товаров' },
            subcategory: { title: 'В этой подкатегории пока нет товаров' },
            group: { title: 'В этой группе пока нет товаров' },
        },
    },

    product: {
        loading: 'Загружаем карточку товара…',
        error: { title: 'Не удалось загрузить карточку товара' },
        notFound: {
            title: 'Товар не найден',
            description: 'Возможно, он снят с продажи или ссылка устарела. Посмотрите похожие товары в каталоге или воспользуйтесь поиском.',
        },
    },

    search: {
        loading: 'Ищем товары…',
        error: { title: 'Поиск временно недоступен' },
        idle: { title: 'Введите название или артикул товара в строке поиска' },
        empty: (query: string): StatusText => ({
            title: `По запросу «${query}» ничего не найдено`,
            description: 'Проверьте написание или попробуйте более общий запрос.',
        }),
    },

    auth: {
        sendingCode: 'Отправка...',
        verifying: 'Проверка...',
        sendCodeError: 'Не удалось отправить SMS-код',
        verifyError: 'Не удалось проверить код',
        invalidCode: 'Неверный код подтверждения',
    },

    checkout: {
        submitting: 'Оформляем заказ...',
        validation: 'Проверьте правильность заполнения полей',
        submitError: 'Не удалось оформить заказ',
        promoNotFound: 'Промокод не найден',
        promoFirstOrderOnly: 'Промокод действует только на первый заказ',
    },

    compare: {
        added: 'Товар добавлен в список сравнения',
        limit: (max: number) => `В сравнении может быть не больше ${max} товаров`,
        link: 'Перейти в раздел',
    },

    contactForm: {
        sending: 'Отправка...',
        invalidPhone: 'Пожалуйста, введите полный номер телефона',
        error: 'Не удалось отправить заявку',
        success: 'Спасибо! Менеджер свяжется с вами в ближайшее время.',
    },
} as const;

export const getErrorText = (error: RequestError | null | undefined, scope?: StatusText): StatusText => {
    const byKind = ERROR_MESSAGES[error?.kind ?? 'unknown'];
    return {
        title: scope?.title ?? byKind.title,
        description: scope?.description ?? byKind.description,
    };
};

export const getInlineErrorMessage = (error: RequestError | null | undefined, prefix: string): string => {
    const { title } = ERROR_MESSAGES[error?.kind ?? 'unknown'];
    return error?.kind === 'unknown' || !error ? prefix : `${prefix}. ${title}`;
};
