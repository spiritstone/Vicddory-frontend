'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PlayerMain() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/player/pitcher');
  }, []);
  return null;
}
