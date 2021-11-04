export interface StudentFormData {
    first_name: string;
    last_name: string;
    birthday: string;
    course: string;
    hour: number;
    price: number;
}
export interface StudentData extends StudentFormData {
    id: number;
}
