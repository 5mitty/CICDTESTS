import { render, screen } from '@testing-library/react';
import TestText from '../components/TestText';

test('renders text for testing purposes', () => {
    render(<TestText />);
    const textElement = screen.getByText(/for testing purposes/i);
    expect(textElement).toBeInTheDocument();
});