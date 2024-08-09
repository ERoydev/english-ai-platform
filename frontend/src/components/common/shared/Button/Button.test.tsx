// Button.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./Button";

describe('Button component', () => {
    it('renders with the correct label', () => {
        render(<Button label="Click Me" />);
        const buttonElement = screen.getByTestId('button');
        expect(buttonElement).toHaveTextContent("Click Me");
    });

    it('applies the main-button class by default', () => {
        render(<Button label="Click Me" />);
        const buttonElement = screen.getByTestId('button');
        expect(buttonElement).toHaveClass("main-button");
    });

    it('applies additional classes when className prop is provided', () => {
        render(<Button label="Click Me" className="custom-class" />);
        const buttonElement = screen.getByTestId('button');
        expect(buttonElement).toHaveClass("main-button custom-class");
    });

    it('renders a span with the correct label text', () => {
        render(<Button label="Click Me" />);
        const spanElement = screen.getByTestId('button-label');
        expect(spanElement).toBeInTheDocument();
        expect(spanElement).toHaveClass("relative");
    });
});
