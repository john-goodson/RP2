import { MenuItem } from '../fw/services/menu.service';

export let initialMenuItems: Array<MenuItem> = [
    {
        text: 'Dashboard',
        icon: 'glyphicon-dashboard',
        route: 'jumbotron',
        submenu: null
    },
    {
        text: 'JumboTron',
        icon: 'glyphicon-dashboard',
        route: 'jumbotron',
        submenu: null
    },

    {
        text: 'Date Range',
        icon: '	glyphicon-calendar',
        route: null,
        submenu: [
            {
                text: 'This Year',
                icon: 'glyphicon-calendar',
                route: 'jumbotron',
                submenu: null
            },
            {
                text: 'Next 13 Months',
                icon: 'glyphicon-calendar',
                route: 'jumbotron',
                submenu: null
            },
            {
                text: 'Next Year',
                icon: 'glyphicon-calendar',
                route: 'jumbotron',
                submenu: null
            },
            {
                text: 'Custom Date',
                icon: 'glyphicon-calendar',
                route: 'customDate',
                submenu: null
            }
        ],
    },
    {
        text: 'Maintenance',
        icon: 'glyphicon-wrench',
        route: null,
        submenu: [
            {
                text: 'Country Maint',
                icon: 'glyphicon-th-list',
                route: 'authenticated/country-maint',
                submenu: null
            },
            {
                text: 'Settings',
                icon: 'glyphicon-cog',
                route: 'authenticated/settings',
                submenu: null
            }
        ]
    }
];