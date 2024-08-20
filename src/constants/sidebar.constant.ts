import { TrackSidebar } from '@/statics';
import { ROUTES } from './routes.constants';

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
