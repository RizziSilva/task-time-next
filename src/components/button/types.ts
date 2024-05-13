import { MouseEventHandler } from 'react';

export interface ButtonProps {
  onClick?: MouseEventHandler;
  text: string;
  className?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
}
