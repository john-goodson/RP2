import { MenuItem } from '../fw/services/menu.service';
// import { AppStateService } from './services/app-state.service'

// export let foo: AppStateService
import { CurrentCalendarYear } from './common/utilities'

export let _currentCalYear = new CurrentCalendarYear()


export let initialMenuItems: Array<MenuItem> = [
    {
        text: 'Dashboard',
        icon: 'glyphicon-dashboard',
        route: 'home/jumbotron',
        submenu: null
    },
    {
        text: 'This Year',
        icon: 'glyphicon-dashboard',
        route: 'home/jumbotron',
        params: { fromDate: _currentCalYear.startDate,
                    toDate: _currentCalYear.endDate,
                    timescale: 5,
                    workunits: 3 },
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
                route: 'home/resPlans',
                params: { fromDate: _currentCalYear.startDate,
                            toDate: _currentCalYear.endDate,
                            timescale: 5,
                            workunits: 3 },
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