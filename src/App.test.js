import React from 'react';
import { render } from '@testing-library/react';
import App from './components/App/App';
import { FIRST_NODE } from './constants/nodes';

test('renders title', () => {
	const mockAddNode = jest.fn()
	const { getByText } = render(<App tree={[FIRST_NODE]} onAddNode={mockAddNode} />);
	const titleElement = getByText(/Tree manager/i);
	expect(titleElement).toBeInTheDocument();
});

test('renders canvas', () => {
	const mockAddNode = jest.fn()
	const { getByRole } = render(<App tree={[FIRST_NODE]} onAddNode={mockAddNode} />);
	const canvasElement = getByRole('presentation');
	expect(canvasElement).toBeInTheDocument();
});
