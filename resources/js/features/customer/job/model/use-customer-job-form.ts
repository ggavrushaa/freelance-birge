import { ChangeEvent, useState } from "react";

export const useCustomerJobForm = <T,>(initialData: T) => {
    const [formData, setFormData] = useState<T>(initialData);

    const handleChangeField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const toggleMode = (mode: 'express_mode' | 'premium_mode') => {
        setFormData((prev) => ({ ...prev, [mode]: !prev[mode] }));
    };

    const handleChangeCategoryId = (
        formKey: 'category_id' | 'sub_category_id',
        categoryId: number,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [formKey]: categoryId,
        }));
    };

    const handleChangeTerms = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            terms: value,
        }));
    };
    return {
        formData,
        setFormData,
        handleChangeField,
        handleChangeCategoryId,
        handleChangeTerms,
        toggleMode,
    };
};