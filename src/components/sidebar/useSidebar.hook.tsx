'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function useSidebarHook() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const pathname = usePathname();

  function handleToggleMenu() {
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
