export interface ButtonOptions {
    type?: "button" | "submit" | "reset";
    for: string;
    onClick?: (event: MouseEvent) => void;
}
