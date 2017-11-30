import { MenuItem } from '../fw/services/menu.service';

export let initialMenuItems: Array<MenuItem> = [
    {
        text: 'Dashboard',
        icon: 'glyphicon-dashboard',
        route: 'jumbotron',
        submenu: null
    },
    {
        text: 'Date Range',
        icon: 'glyphicon-dashboard',
        route: 'jumbotron',
        submenu: null
    },
    {
        text: 'Work Scale',
        icon: 'glyphicon-dashboard',
        route: 'jumbotron',
        submenu: null
    },

    {
        text: 'Placeholder',
        icon: 'glyphicon-flag',
        route: null,
        submenu: [
            {
                text: 'Item 1',
                icon: 'glyphicon-flag',
                route: 'authenticated/country-list/3',
                submenu: null
            },
            {
                text: 'Item 2',
                icon: 'glyphicon-flag',
                route: 'authenticated/country-list/5',
                submenu: null
            },
            {
                text: 'All',
                icon: 'glyphicon-flag',
                route: 'authenticated/country-list/0',
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