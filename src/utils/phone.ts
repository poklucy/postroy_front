export const PHONE_PLACEHOLDER = '8 (999) 999-99-99';

export const getPhoneDigits = (value: string): string => value.replace(/\D/g, '');

export const normalizePhone = (value: string): string => {
    const digits = getPhoneDigits(value);
    if (digits.length === 10) return `7${digits}`;
    if (digits.length === 11 && digits[0] === '8') return `7${digits.slice(1)}`;
    return digits;
};

export const isPhoneComplete = (value: string): boolean => normalizePhone(value).length === 11;

export const formatPhone = (phone: string): string => {
    const digits = normalizePhone(phone);
    if (digits.length !== 11) return phone;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
};

export const formatPhoneInput = (value: string): string => {
    const digits = getPhoneDigits(value).slice(0, 11);
    if (!digits) return '';

    const local = digits[0] === '7' || digits[0] === '8' ? digits.slice(1) : digits.slice(0, 10);
    const [code, first, second, third] = [local.slice(0, 3), local.slice(3, 6), local.slice(6, 8), local.slice(8, 10)];

    let result = '8';
    if (code) result += ` (${code}`;
    if (code.length === 3) result += ')';
    if (first) result += ` ${first}`;
    if (second) result += `-${second}`;
    if (third) result += `-${third}`;
    return result;
};
