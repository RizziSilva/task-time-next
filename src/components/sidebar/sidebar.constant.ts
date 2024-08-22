import { TrackSidebar } from '@statics';
import { ROUTES } from '../../constants/routes.constants';
import { SidebarOptionType } from './types';

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
