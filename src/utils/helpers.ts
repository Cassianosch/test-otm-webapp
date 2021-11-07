import { AxiosError } from 'axios';

export const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const serviceErrorHandler = (err: AxiosError): string => {
    if (typeof err === 'string') return err;

    if (err.response?.data) {
        if ('errors' in err.response.data) {
            return err.response.data.errors[0].message;
        }

        if ('message' in err.response.data) {
            let allErrors = '';

            Object.keys(err.response.data.message).forEach(function (key) {
                allErrors += `${this[key]} `;
            }, err.response.data.message);
            return allErrors;
        }
    }

    if (typeof err === 'object') {
        if (err.message) return err.message;

        if ('message' in err.response.data) return err.response.data.message;
    }

    return JSON.stringify(err);
};

export const formatterCurrencyEuro = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
});

export const formatterDate = (date: string): string => {
    const newDate = new Date(`${date}T00:00:00`);
    const pad = function (num) {
        return `00${num}`.slice(-2);
    };
    return `${pad(newDate.getDate())}/${pad(
        newDate.getMonth() + 1,
    )}/${newDate.getFullYear()}`;
};
export const extractCurrencyInputValue = (masked: string): number => {
    const numericValue = Number(
        masked.replace(/([^,\d])/g, '').replace(/,/g, '.'),
    );

    return numericValue;
};
