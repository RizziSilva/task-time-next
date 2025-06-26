import { UserInfoProps, InfoRowProps } from '../../types';

export function UserInfo({ name, surname, email, timezone }: UserInfoProps) {
  function InfoRow({ label, value }: InfoRowProps) {
    return (
      <div className='flex items-center gap-4'>
        <p className='w-40 text-sm text-gray-400'>{label}</p>
        <p className='text-white'>{value}</p>
      </div>
    );
  }

  return (
    <div className='background-base rounded-lg'>
      <div className='mb-4 flex h-20 flex-col justify-center border-b-2 border-solid border-background-color-darken bg-sidebar-bg-color pl-3 '>
        <h2 className='text-xl text-white'>Personal details & preferences</h2>
        <p className='text-sm text-gray-400'>
          Change details, login methods and your password in Account settings.
        </p>
      </div>
      <div className='grid gap-4 pl-3'>
        <InfoRow label='FULL NAME' value={`${name} ${surname}`} />
        <InfoRow label='EMAIL' value={email} />
        <InfoRow label='REPORTS TIMEZONE' value={timezone} />
      </div>
      <button className='mb-3 ml-3 mt-6 rounded border border-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-800'>
        Account settings
      </button>
    </div>
  );
}
