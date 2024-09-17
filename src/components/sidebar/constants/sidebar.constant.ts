import { TrackSidebar } from '@statics';
import { ROUTES } from '../../../constants/routes.constants';
import { SidebarOptionType } from '../types/types';

export const SIDEBAR_OPTIONS: Array<SidebarOptionType> = [
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

export const TEST_IDS = {
  USER_NAME: 'user-name',
  USER_EMAIL: 'user-email',
  SIDEBAR_LOGO_IMAGE: 'sidebar-logo-image',
  HEADER_LOGO_IMAGE: 'header-logo-image',
  SIDEBAR: 'sidebar',
  OPEN_MOBILE_SIDEBAR: 'open-mobile-sidebar',
  CLOSE_MOBILE_SIDEBAR: 'close-mobile-sidebar',
};
