import { render, screen } from "@testing-library/react";
import { describe, expect, it} from 'vitest';
import Header from "./Header";


describe('Header', () => {
    it('renders with the required parameters', () => {
        render(<Header title="Something" size="text-2xl" />);
        expect(screen.getByTestId('message-container')).toHaveTextContent("Something");
    });

    it('renders with empty strings for required parameters', () => {
        render(<Header title="" size="" />);
        expect(screen.getByTestId('message-container')).toHaveTextContent("");
    });

    it('renders with optional `infoText`', () => {
        render(<Header title="Title" size="text-2xl" infoText="This is some info" />);
        expect(screen.getByText('This is some info')).toBeInTheDocument();
    });

    it('does not render `infoText` when not provided', () => {
        render(<Header title="Title" size="text-2xl" />);
        expect(screen.queryByText('This is some info')).not.toBeInTheDocument();
    });

    it('applies `customClass` when provided', () => {
        render(<Header title="Title" size="text-2xl" customClass="custom-class" />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveClass('custom-class');
    });

    it('applies `coloredClass` to the `coloredText`', () => {
        render(<Header title="Title" size="text-2xl" coloredText="Colored" coloredClass="primary-header-color" />);
        const coloredSpan = screen.getByText('Colored');
        expect(coloredSpan).toHaveClass('primary-header-color');
    });

    it('does not apply `coloredClass` when `coloredText` is not provided', () => {
        render(<Header title="Title" size="text-2xl" coloredClass="primary-header-color" />);
        expect(screen.queryByText('Colored')).not.toBeInTheDocument();
    });

    it('renders the title with the correct size class', () => {
        render(<Header title="Title" size="text-2xl" />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveClass('xl:text-2xl');
    });

    it('renders with all optional props', () => {
        render(<Header
            title="Title"
            size="text-2xl"
            coloredText="Colored"
            coloredClass="primary-header-color"
            customClass="custom-class"
            infoText="This is some info"
        />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveClass('custom-class xl:text-2xl');
        expect(screen.getByText('Colored')).toHaveClass('primary-header-color');
        expect(screen.getByText('This is some info')).toBeInTheDocument();
    });
});