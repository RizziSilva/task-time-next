import { MouseEventHandler } from 'react';

export interface ButtonProps {
  text: string;
  className?: string;
  onClick: MouseEventHandler;
  type: 'button' | 'submit' | 'reset' | undefined;
}
