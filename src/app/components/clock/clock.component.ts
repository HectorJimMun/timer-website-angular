import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Clock } from '../../models/clock.model';

@Component({
    selector: 'app-clock',
    standalone: true,
    imports: [CommonModule],
    providers: [DatePipe],
    templateUrl: './clock.component.html',
    styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit, OnDestroy{
    private _intervalTimeOut = 1000;
    public clock: Clock = new Clock();
    public interval?: any;
    private _datePipe = inject(DatePipe);

    // Initialise the correct values for the clock
    ngOnInit(): void {
        // Create clock ID
        let clockId = Math.trunc(Math.random() * 100);

        // Get the current date
        let currentDateTime = this._datePipe.transform((new Date), 'dd/MM/yyyy h:mm:ss');
        let dateSplitted = currentDateTime!.split(" ");
        let date = dateSplitted[0];
        let time = dateSplitted[1];
        dateSplitted = date.split("/");
        let timeSplitted = time.split(":");
    
        // Create clock
        this.clock = {
            id:         clockId,
            day:        Number(dateSplitted[0]),
            month:      Number(dateSplitted[1]),
            year:       Number(dateSplitted[2]),
            hours:      Number(timeSplitted[0]),
            minutes:    Number(timeSplitted[1]),
            seconds:    Number(timeSplitted[2])
        }

        // Start the interval
        this.interval = setInterval(() => {this.updateClock();}, this._intervalTimeOut);
    }

    // Method triggered when the component is destroyed
    ngOnDestroy(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    // Method to refresh the date data during the interval
    updateClock(): void {
        // Get the current date
        let currentDateTime = this._datePipe.transform((new Date), 'dd/MM/yyyy h:mm:ss');
        let dateSplitted = currentDateTime!.split(" ");
        let date = dateSplitted[0];
        let time = dateSplitted[1];
        dateSplitted = date.split("/");
        let timeSplitted = time.split(":");
    
        // Update clock
        this.clock = {
            id:         this.clock.id,
            day:        Number(dateSplitted[0]),
            month:      Number(dateSplitted[1]),
            year:       Number(dateSplitted[2]),
            hours:      Number(timeSplitted[0]),
            minutes:    Number(timeSplitted[1]),
            seconds:    Number(timeSplitted[2])
        }
    }
}
