import { Container } from "./styles";

interface InputProps {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
}

export function Input({ label, name, placeholder, type }: InputProps) {
    return (
        // <Container>
        <Container htmlFor={name}> {label}
            <input
                id={name}
                type={type ? type : 'text'}
                placeholder={placeholder}
                required
            />
        </Container>
        // </Container>
    )
}