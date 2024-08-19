import { FullLogo, UserIconHolder } from '@/statics';
import Image from 'next/image';

export function Sidebar() {
  function renderHeader() {
    return (
      <div className='p-sidebar-padding flex w-full justify-center border-b-2 border-solid border-b-background-base pb-4'>
        <Image width={170} height={50} alt='Imagem do logo do site' src={FullLogo} />
      </div>
    );
  }

  function renderFooter() {
    return (
      <div className='p-sidebar-padding flex w-full justify-start border-t-2 border-solid border-b-background-base pt-4'>
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

  function renderOptions() {
    return <div className='px-sidebar-padding flex w-full grow'></div>;
  }

  return (
    <div className='w-sidebar-width bg-sidebar-bg-color fixed flex h-full flex-col items-center'>
      {renderHeader()}
      {renderOptions()}
      {renderFooter()}
    </div>
  );
}
