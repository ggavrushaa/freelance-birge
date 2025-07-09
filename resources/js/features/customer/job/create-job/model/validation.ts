import { CreateCustomerJobFormValues } from "./types";

export const isCustomerJobCreateFormFilled = (data: CreateCustomerJobFormValues) => {
    return (
        data.name.trim() !== '' &&
        data.description.trim() !== '' &&
        data.photo !== null,
        data.price.trim() !== '' &&
        data.terms !== null &&
        data.terms.trim() !== '' &&
        data.category_id !== null
    );
};