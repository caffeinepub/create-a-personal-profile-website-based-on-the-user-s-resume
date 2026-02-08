import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({ id, children, className, containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      <div className={cn('container mx-auto px-4 md:px-6 max-w-6xl', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
