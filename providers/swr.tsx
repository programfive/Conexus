'use client';

import { ReactNode } from 'react';
import { SWRConfig as SWR } from 'swr';
import {fetcher} from '@/lib/fetcher'

export default function SWRConfig({ children }: { children: ReactNode }) {
  return (
    <SWR
      value={{fetcher}}
    >
      {children}
    </SWR>
  );
}