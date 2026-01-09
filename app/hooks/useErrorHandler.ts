import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "¡Algo salió mal!");
    } else {
        toast.error("¡Algo salió mal!");
    }
};

export const handleRateLimitError = (error: unknown): boolean => {
    if (
        error instanceof AxiosError &&
        error.response?.status === 403
    ) {
        toast.error("Has alcanzado el límite de peticiones de Unsplash 🕒");
        return true; // 👉 error manejado
    }
    return false; // 👉 no era 403
};