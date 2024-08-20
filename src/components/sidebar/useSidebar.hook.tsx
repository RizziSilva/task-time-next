'use client';

import { usePathname } from 'next/navigation';

export function useSidebarHook() {
  const pathname = usePathname();

  function getIsSelected(pagePath: string): Boolean {
    return pagePath === pathname;
  }

  return {
    getIsSelected,
  };
}
