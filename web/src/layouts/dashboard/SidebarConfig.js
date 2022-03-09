// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'events',
    path: '/dashboard/events',
    icon: getIcon('eva:swap-outline')
  }
];

export default sidebarConfig;
