'use client';

import { cn } from '@/lib/utils';

import Link from 'next/link';

interface DesktopItemProps {
  label: string;
  icon: any;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export function DesktopItem({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}: DesktopItemProps) {


  return (
    <li onClick={onClick}>
      <Link
        href={href || "#"}
        className={cn(
          'text-gray-00 group flex gap-x-3 rounded-md p-3 text-sm font-bold leading-6 hover:bg-accent  hover:text-accent-foreground',
          active && 'bg-accent text-foreground',
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
