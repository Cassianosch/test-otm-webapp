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

export const formatterCurrencyDolar = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
});
export const formatterDate = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});
export const extractCurrencyInputValue = (masked: string): number => {
    const numericValue = Number(
        masked.replace(/([^,\d])/g, '').replace(/,/g, '.'),
    );

    return numericValue;
};
