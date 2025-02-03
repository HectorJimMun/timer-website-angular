export class Timer {
    id:                 number = 0;
    title:              string = "Timer";
    originalHours:      number = 0;
    currentHours:       number = 0;
    originalMinutes:    number = 0;
    currentMinutes:     number = 0;
    originalSeconds:    number = 0;
    currentSeconds:     number = 0;
    sound?:             string = '';
    active:             boolean = false;
}
