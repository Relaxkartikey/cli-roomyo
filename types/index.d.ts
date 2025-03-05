import { ReactNode } from 'react';

declare module 'react' {
  interface JSX {
    IntrinsicElements: {
      [elemName: string]: any;
    };
  }
}

export interface BentoCardProps {
  children: ReactNode;
  className?: string;
} 