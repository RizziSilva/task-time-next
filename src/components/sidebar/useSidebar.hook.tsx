'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function useSidebarHook() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const pathname: string = usePathname();

  function handleToggleMenu(): void {
    setToggleMenu(!toggleMenu);
  }

  function getIsSelected(pagePath: string): Boolean {
    return pagePath === pathname;
  }

  return {
    toggleMenu,
    getIsSelected,
    handleToggleMenu,
  };
}
