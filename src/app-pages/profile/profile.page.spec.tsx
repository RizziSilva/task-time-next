import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfilePage } from './profile.page';

describe('ProfilePage', () => {
  it('renders the Update Profile heading', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Update Profile')).toBeInTheDocument();
  });

  it('renders the form fields', () => {
    render(<ProfilePage />);
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  });

  it('renders the update button', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Update')).toBeInTheDocument();
  });
});
