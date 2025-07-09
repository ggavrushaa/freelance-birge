import { EditCustomerJobFormValues } from "./types";

export const isCustomerJobEditFormFilled = (data: EditCustomerJobFormValues) => {
    return (
        data.name.trim() !== '' && data.description.trim() !== '' && data.photo !== null,
        data.price.trim() !== '' &&
            data.terms !== null &&
            String(data.terms).trim() !== '' &&
            data.category_id !== null
    );
};