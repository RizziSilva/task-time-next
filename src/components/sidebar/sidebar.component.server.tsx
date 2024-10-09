import { getUser } from '@/services';
import { SidebarContent } from './sidebar.component';

export async function Sidebar() {
  const user = await getUser();

  return <SidebarContent user={user} />;
}
