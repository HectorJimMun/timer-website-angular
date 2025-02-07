import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chronometer, ChronoStates } from '../../models/chronometer.model';

@Component({
    selector: 'app-chronometer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chronometer.component.html',
    styleUrl: './chronometer.component.css'
})
export class ChronometerComponent implements OnInit, OnDestroy {
    public chrono: Chronometer = new Chronometer();
    private _intervalTimeOut = 1;
    public interval?: any;

    ngOnInit(): void {
        this.chrono = new Chronometer();
    }

    ngOnDestroy(): void {
        this.stopChrono();
    }

    updateChrono(): void {
        this.chrono.milliseconds++;

        if (this.chrono.milliseconds > 99) {
            this.chrono.milliseconds = 0;
            this.chrono.seconds++;
        }
        /*
        if (this.chrono.seconds > 59) {
            this.chrono.seconds = 0;
            this.chrono.minutes++;
        }

        if (this.chrono.minutes > 59) {
            this.chrono.minutes = 0;
            this.chrono.hours++;
        }
        */
    }

    startChrono(): void {
        this.chrono.status = ChronoStates.ACTIVE;

        this.interval = setInterval(() => {this.updateChrono();}, this._intervalTimeOut);
    }

    pauseChrono(): void {
        if (this.chrono.status == ChronoStates.PAUSED) {
            this.chrono.status = ChronoStates.ACTIVE;

            this.interval = setInterval(() => {this.updateChrono();}, this._intervalTimeOut);
        }
        else if (this.chrono.status == ChronoStates.ACTIVE){
            this.chrono.status = ChronoStates.PAUSED;

            if (this.interval) {
                clearInterval(this.interval);
                this.interval = undefined;
            }
        }
    }

    stopChrono(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }

        this.resetChrono();
    }

    resetChrono(): void {
        this.chrono.hours = 0;
        this.chrono.minutes = 0;
        this.chrono.seconds = 0;
        this.chrono.milliseconds = 0;
        this.chrono.status = ChronoStates.STOPPED;
        this.chrono.laps = []; 
    }

}
