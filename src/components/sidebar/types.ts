export interface SidebarItemsType {
  text: string;
  page: string;
  icon: any;
  iconAlt: string;
}

export interface SidebarOptionType {
  title: string;
  items: Array<SidebarItemsType>;
}
