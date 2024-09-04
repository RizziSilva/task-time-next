'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { UserService } from '@services';

export function useSidebarHook() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const userService: UserService = new UserService();
  const pathname: string = usePathname();

  useEffect(() => {
    async function getUSerInfo() {
      const user = await userService.getUser();
    }

    getUSerInfo();
  }, []);

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
