'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SIDEBAR_OPTIONS } from '@constants';
import { FullLogo, UserIconHolder } from '@statics';
import { useSidebarHook } from './useSidebar.hook';

export function Sidebar() {
  const { getIsSelected } = useSidebarHook();

  function renderHeader() {
    return (
      <div className='flex w-full justify-center border-b-2 border-solid border-b-background-base p-sidebar-padding pb-4'>
        <Image width={170} height={50} alt='Imagem do logo do site' src={FullLogo} />
      </div>
    );
  }

  function renderFooter() {
    return (
      <div className='flex w-full justify-start border-t-2 border-solid border-b-background-base p-sidebar-padding pt-4'>
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
        <Link className={`w-full px-sidebar-padding ${isSelected ? 'bg-white' : ''}`} href={page}>
          <div className='flex items-center justify-start'>
            <Image alt={iconAlt} className='mr-2' src={icon} width={18} height={18} />
            <span className=''>{text}</span>
          </div>
        </Link>
      );
    });
  }

  function renderLinksOptions() {
    return SIDEBAR_OPTIONS.map(({ title, items }) => {
      return (
        <div className='flex w-full flex-col items-start'>
          <span className='mb-1 px-sidebar-padding'>{title}</span>
          {renderSubItem(items)}
        </div>
      );
    });
  }

  function renderLinks() {
    return <div className='flex w-full grow py-4'>{renderLinksOptions()}</div>;
  }

  return (
    <div className='fixed flex h-full w-sidebar-width flex-col items-center bg-sidebar-bg-color'>
      {renderHeader()}
      {renderLinks()}
      {renderFooter()}
    </div>
  );
}
