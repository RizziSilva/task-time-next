import { TrackSidebar } from '@/statics';
import { ROUTES } from '../../constants/routes.constants';
import { SidebarCloseIcon, SidebarMenuIcon } from '@statics';

export const SIDEBAR_OPTIONS = [
  {
    title: 'Acompanhar',
    items: [
      {
        text: 'Cronômetro',
        page: ROUTES.TIMER,
        icon: TrackSidebar,
        iconAlt: 'Ícone de um cronômetro',
      },
    ],
  },
];
