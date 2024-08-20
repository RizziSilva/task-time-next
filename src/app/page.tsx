import { ROUTES } from '@constants';
import { redirect } from 'next/navigation';

export default function handleRedirect() {
  redirect(ROUTES.TIMER);
}
