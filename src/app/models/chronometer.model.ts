export class Chronometer {
    hours:          number = 0;
    minutes:        number = 0;
    seconds:        number = 0;
    milliseconds:   number = 0;
    status:         number = ChronoStates.STOPPED;
    laps:           string[] = [];
}

export enum ChronoStates {
    STOPPED = 0,
    ACTIVE =  1,
    PAUSED =  2
}
