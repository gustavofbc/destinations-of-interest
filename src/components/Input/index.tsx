import { InputHTMLAttributes } from "react";
import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
}

export function Input({ label, name, placeholder, type, ...rest }: InputProps) {
    return (
        // <Container>
        <Container htmlFor={name}> {label}
            <input
                id={name}
                type={type ? type : 'text'}
                placeholder={placeholder}
                required
                {...rest}
            />
        </Container>
        // </Container>
    )
}