/**
 * @jest-environment jsdom
 */

const React = require('react');
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');

const ProjectPage = () => {
  return React.createElement('div', null,
    React.createElement('div', null, 'GOODAY'),
    React.createElement('div', null, 'CARTOONOPIA'),
    React.createElement('div', null, 'SCHEDULE-MEETING'),
    React.createElement('a', { href: 'https://gooday-own-contribution.vercel.app' }, 'Project Link'),
    React.createElement('img', { src: '/img/gd.png', alt: 'project image' })
  );
};

describe('Project Page', () => {
  test('renders project names', () => {
    render(React.createElement(ProjectPage));
    expect(screen.getByText('GOODAY')).toBeInTheDocument();
    expect(screen.getByText('CARTOONOPIA')).toBeInTheDocument();
  });

  test('has project link', () => {
    render(React.createElement(ProjectPage));
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://gooday-own-contribution.vercel.app');
  });

  test('has project image', () => {
    render(React.createElement(ProjectPage));
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/img/gd.png');
  });
});