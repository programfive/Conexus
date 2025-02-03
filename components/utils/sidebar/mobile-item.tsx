'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface MobileItemProps {
  href?: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

export function MobileItem({
  href,
  icon: Icon,
  active,
  onClick,
}: MobileItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Button variant="ghost" className='[&_svg]:size-6 '  asChild>
      <Link
        onClick={onClick}
        href={href || "#"}
        className={active ? 'bg-accent' : ''}
      >
        <Icon className="h-6 w-6" />
      </Link>
    </Button>
  );
}
