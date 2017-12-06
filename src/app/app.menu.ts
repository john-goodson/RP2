import { MenuItem } from '../fw/services/menu.service';
// import { AppStateService } from './services/app-state.service'

// export let foo: AppStateService
import { CurrentCalendarYear, CurrentFiscalYear, Next12Months, NextYear } from './common/utilities'

export let _currentCalYear = new CurrentCalendarYear()
export let _CurrentFiscalYer = new CurrentFiscalYear() 
export let _next12Months = new Next12Months()
export let _nextYear = new NextYear()


export let initialMenuItems: Array<MenuItem> = [
    {
        text: 'Dashboard',
        icon: 'glyphicon-dashboard',
        route: 'home/jumbotron',
        submenu: null
    },
    {
        text: 'Work Scale',
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
                text: 'Next 12 Months',
                icon: 'glyphicon-calendar',
                route: 'home/resPlans',
                params: { fromDate: _next12Months.startDate,
                            toDate: _next12Months.endDate,
                            timescale: 5,
                            workunits: 3 },
                submenu: null
            },
            {
                text: 'Next Year',
                icon: 'glyphicon-calendar',
                route: 'home/resPlans',
                params: { fromDate: _nextYear.startDate,
                            toDate: _nextYear.endDate,
                            timescale: 5,
                            workunits: 3 },
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