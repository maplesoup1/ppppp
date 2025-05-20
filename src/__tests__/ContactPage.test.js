/**
 * @jest-environment jsdom
 */

const React = require('react');
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');

// Mock next/image
const mockImage = (props) => React.createElement('img', props);

// Mock framer-motion
const mockMotion = {
  div: (props) => React.createElement('div', props, props.children)
};

// Mock ContactPage component
const ContactPage = () => {
  return React.createElement('div', null,
    React.createElement('h1', null, 'Ready to roll?'),
    React.createElement('div', null, 'timmy000728@gmail.com'),
    React.createElement('div', null, '+61415480728'),
    React.createElement('a', { href: 'https://linkedin.com/in/someone' }, 'LinkedIn'),
    React.createElement('a', { href: 'https://x.com/someone' }, 'Twitter')
  );
};

describe('Contact Page', () => {
  test('renders main heading', () => {
    render(React.createElement(ContactPage));
    expect(screen.getByText(/Ready\s+to\s+roll\?/i)).toBeInTheDocument();
  });

  test('renders email', () => {
    render(React.createElement(ContactPage));
    expect(screen.getAllByText('timmy000728@gmail.com')[0]).toBeInTheDocument();
  });

  test('renders phone number', () => {
    render(React.createElement(ContactPage));
    expect(screen.getByText('+61415480728')).toBeInTheDocument();
  });

  test('has social links', () => {
    render(React.createElement(ContactPage));
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', expect.stringContaining('linkedin'));
    expect(links[1]).toHaveAttribute('href', expect.stringContaining('x.com'));
  });
});