import { UserService } from '@/services';
import { SidebarContent } from './sidebar.component';

export async function Sidebar() {
  const userService: UserService = new UserService();
  const user = await userService.getUser();

  return <SidebarContent user={user} />;
}
