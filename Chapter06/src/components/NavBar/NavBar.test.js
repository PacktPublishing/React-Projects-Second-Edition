import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';

test('The NavBar component should render', () => {
  const view = render(<NavBar />);
  expect(view).toMatchSnapshot();
});

test('The NavBar component should render with a title', () => {
  const title = 'Test application';
  render(<NavBar title={title} />);

  expect(screen.getByRole('heading')).toHaveTextContent(title);
});

test('The NavBar component should respond to button clicks', () => {
  const mockFunction = jest.fn();
  render(<NavBar goBack={mockFunction} openForm={mockFunction} />);

  fireEvent.click(screen.getByText('< Go Back'));
  expect(mockFunction).toHaveBeenCalled();

  fireEvent.click(screen.getByText('+ Add Review'));
  expect(mockFunction).toHaveBeenCalledTimes(2);
});
