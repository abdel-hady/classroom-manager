export interface ControlledInputProps {
    name: string;
    label: string;
    register: any;
}
export interface Option {
    value: string | number;
    label: string;
}
export interface ControlledDropdownProps extends ControlledInputProps {
    options: Option[];
}