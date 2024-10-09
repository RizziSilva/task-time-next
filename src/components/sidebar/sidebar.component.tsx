'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FullLogo, SidebarCloseIcon, SidebarMenuIcon, UserIconHolder } from '@statics';
import { ROUTES } from '@constants';
import { useSidebarHook } from './hooks/useSidebar.hook';
import { SidebarItemsType, SidebarType } from './types/types';
import { SIDEBAR_OPTIONS, TEST_IDS } from './constants/sidebar.constant';

export function SidebarContent({ user }: SidebarType) {
  const { getIsSelected, handleToggleMenu, toggleMenu } = useSidebarHook();

  function renderHeader() {
    return (
      <div className='flex h-20 w-full items-center justify-center border-b-2 border-solid border-background-color-darken p-sidebar-padding pb-4'>
        <button
          onClick={handleToggleMenu}
          className=' mr-3 hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-#412a4c small-screen:flex'
          data-testid={TEST_IDS.CLOSE_MOBILE_SIDEBAR}
        >
          <Image
            style={{ objectFit: 'contain' }}
            src={SidebarCloseIcon}
            height={18}
            alt='Ícone para fechar o menu de opções'
          />
        </button>
        <Image
          style={{ objectFit: 'contain' }}
          width={145}
          height={50}
          alt='Imagem do logo do site'
          src={FullLogo}
          data-testid={TEST_IDS.SIDEBAR_LOGO_IMAGE}
        />
      </div>
    );
  }

  function renderFooter() {
    return (
      <Link href={ROUTES.USER}>
        <div className='flex w-full justify-start border-t-2 border-solid border-background-color-darken p-sidebar-padding pt-4'>
          <Image
            className='mr-2'
            width={30}
            height={30}
            alt='Imagem do perfil do usuário'
            src={UserIconHolder}
          />
          <div className='flex w-[calc(100%-theme(spacing.2)-theme(spacing.3)-30px)] flex-col '>
            <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
              <span data-testid={TEST_IDS.USER_NAME}>{user.name}</span>
            </div>
            <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
              <span data-testid={TEST_IDS.USER_EMAIL}>{user.email}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  function renderSubItem(items: Array<SidebarItemsType>) {
    return items.map(({ text, page, icon, iconAlt }) => {
      const isSelected = getIsSelected(page);

      return (
        <Link
          key={page}
          className={`mb-1 w-full px-sidebar-padding ${isSelected ? 'bg-sidebar-bg-selected' : 'hover:bg-sidebar-bg-hover'}`}
          href={page}
        >
          <div className='flex items-center justify-start'>
            <Image
              alt={iconAlt}
              className='mr-2 text-font-color'
              src={icon}
              width={18}
              height={18}
            />
            <span>{text}</span>
          </div>
        </Link>
      );
    });
  }

  function renderLinksOptions() {
    return SIDEBAR_OPTIONS.map(({ title, items }) => {
      return (
        <div key={title} className='mb-4 flex w-full flex-col items-start'>
          <span className='mb-1 px-sidebar-padding text-sidebar-option-font-color'>{title}</span>
          {renderSubItem(items)}
        </div>
      );
    });
  }

  function renderLinks() {
    return <div className='flex w-full grow flex-col py-4'>{renderLinksOptions()}</div>;
  }

  function renderSidebarSmallScreen() {
    return (
      <div className='hidden h-20 w-full items-center justify-start bg-sidebar-bg-color px-4 py-10px small-screen:flex'>
        <button
          onClick={handleToggleMenu}
          className='mr-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-#412a4c'
          data-testid={TEST_IDS.OPEN_MOBILE_SIDEBAR}
        >
          <Image
            style={{ objectFit: 'contain' }}
            src={SidebarMenuIcon}
            height={18}
            alt='Ícone para abrir o menu de opções'
          />
        </button>
        <Image
          style={{ objectFit: 'contain' }}
          alt='Imagem do logo do site'
          src={FullLogo}
          data-testid={TEST_IDS.HEADER_LOGO_IMAGE}
        />
      </div>
    );
  }

  return (
    <>
      {renderSidebarSmallScreen()}
      <div
        className={`${toggleMenu ? 'small-screen:translate-x-0' : 'small-screen:-translate-x-full'} fixed z-3 flex h-full w-sidebar-width flex-col items-center bg-sidebar-bg-color text-font-color transition-transform duration-200 ease-in-out`}
        data-testid={TEST_IDS.SIDEBAR}
      >
        {renderHeader()}
        {renderLinks()}
        {renderFooter()}
      </div>
    </>
  );
}
