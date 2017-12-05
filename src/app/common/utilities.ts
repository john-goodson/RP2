
import * as moment from 'moment'

export class CurrentCalendarYear {
    constructor(public startDate = moment().startOf('year').toDate()
        , public endDate = moment().endOf('year').add(3,'month').toDate()) {
    }
}

export class CurrentFiscalYear {
    constructor(public startDate = moment().startOf('year').toDate()
        , public endDate = moment().endOf('year').add(20,'days').toDate()) {
    }
}


