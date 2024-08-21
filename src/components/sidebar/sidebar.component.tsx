'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SIDEBAR_OPTIONS } from '@constants';
import { FullLogo, SidebarMenuIcon, UserIconHolder } from '@statics';
import { useSidebarHook } from './useSidebar.hook';

export function Sidebar() {
  const { getIsSelected, handleToggleMenu, toggleMenu } = useSidebarHook();

  function renderHeader() {
    return (
      <div className='flex w-full justify-center border-b-2 border-solid border-background-color-darken p-sidebar-padding pb-4'>
        <Image
          style={{ objectFit: 'contain' }}
          width={170}
          height={50}
          alt='Imagem do logo do site'
          src={FullLogo}
        />
      </div>
    );
  }

  function renderFooter() {
    return (
      <div className='flex w-full justify-start border-t-2 border-solid border-background-color-darken p-sidebar-padding pt-4'>
        <Image
          className='mr-2'
          width={30}
          height={30}
          alt='Imagem do perfil do usuário'
          src={UserIconHolder}
        />
        <div className='flex w-[calc(100%-theme(spacing.2)-30px)] flex-col '>
          <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
            <span>William Rizzi da Silva</span>
          </div>
          <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
            <span>William@hotmail.com</span>
          </div>
        </div>
      </div>
    );
  }

  function renderSubItem(items: Array<any>) {
    return items.map(({ text, page, icon, iconAlt }) => {
      const isSelected = getIsSelected(page);

      return (
        <Link
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
        <div className='mb-4 flex w-full flex-col items-start'>
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
      <div className='py-10px hidden h-20 w-full items-center justify-start bg-sidebar-bg-color px-4 small-screen:flex'>
        <button
          onClick={handleToggleMenu}
          className='bg-#412a4c mr-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full'
        >
          <Image src={SidebarMenuIcon} height={18} alt='Ícone para abrir o menu de opções' />
        </button>
        <Image style={{ objectFit: 'contain' }} alt='Imagem do logo do site' src={FullLogo} />
      </div>
    );
  }

  return (
    <>
      {renderSidebarSmallScreen()}
      <div
        className={`${toggleMenu ? 'translate-x-0' : '-translate-x-full'} z-3 fixed flex h-full w-sidebar-width flex-col items-center bg-sidebar-bg-color text-font-color transition-transform duration-200 ease-in-out`}
      >
        {renderHeader()}
        {renderLinks()}
        {renderFooter()}
      </div>
    </>
  );
}
