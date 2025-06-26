import { UserInfo } from './components';

export function ProfilePage() {
  const mockUser = {
    name: 'William',
    surname: 'Rizzi',
    email: 'william.rizzi.silva@gmail.com',
    timezone: '(UTC-03:00) America/Sao_Paulo',
  } as const;

  return (
    <div>
      <UserInfo {...mockUser} />
    </div>
  );
}
