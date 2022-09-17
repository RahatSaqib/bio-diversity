// assets
import { IconDashboard } from '@tabler/icons';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'collapse',
            url: '/admin-dashboard',
            // icon: icons.IconDashboard,
            icon:<DashboardIcon sx={{ fontSize: 20 }}/>,
            breadcrumbs: false
        },
        {
            id: 'species',
            title: 'Manage Species',
            type: 'collapse',
            url: '/manage-species',
            target: true,
            icon:<ManageSearchIcon  sx={{ fontSize: 20 }}/>
          
        },
        {
            id: 'register3',
            title: 'Requested Species List',
            type: 'collapse',
            url: '/manage-requested-species',
            icon:<ListAltIcon  sx={{ fontSize: 20 }}/>,
            target: true
        },
        {
            id: 'zoning',
            title: 'Zoning',
            type: 'collapse',
            url: '/admin-zoning',
            target: true,
            icon:<CenterFocusWeakIcon  sx={{ fontSize: 20 }}/>
        },
        {
            id: 'distribution',
            title: 'Distribution',
            type: 'collapse',
            url: '/distribution',
            target: true,
            icon:<AddLocationAltIcon  sx={{ fontSize: 20 }}/>
        }
    ]
};

export default dashboard;
