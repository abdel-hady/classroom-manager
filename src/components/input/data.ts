export interface ControlledInputProps {
    name: string;
    label: string;
    register: any;
    errors: any;
}
export interface Option {
    value: string | number;
    label: string;
    name: string;
}
export interface ControlledDropdownProps extends ControlledInputProps {
    options: Option[];
}