import { render, screen } from "@testing-library/react";
import { describe, expect, it} from 'vitest';
import Logo from "./Logo";


describe('Logo component', () => {
    it('renders the logo image with the correct src and alt text', () => {
        render(<Logo />);
        
        // Find the image element
        const imageElement = screen.getByRole('img', { name: /logo/i });
        
        // Assert that the image is in the document
        expect(imageElement).toBeInTheDocument();
        
        // Assert that the image has the correct src attribute
        expect(imageElement).toHaveAttribute('src', expect.stringContaining('globus.png'));
        
        // Assert that the image has the correct alt attribute
        expect(imageElement).toHaveAttribute('alt', 'Logo');
    });
    
    it('renders the correct text', () => {
        render(<Logo />);
        
        // Check that the text "LexiLearn" is rendered
        expect(screen.getByText('LexiLearn')).toBeInTheDocument();
    });
});