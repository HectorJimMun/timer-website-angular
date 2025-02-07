import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Timer } from './models/timer.model';
import { TimerListComponent } from "./components/timer-list/timer-list.component";
import { TimerServiceService } from './services/timer-service.service';
import { ClockComponent } from './components/clock/clock.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    //private _timerService = inject(TimerServiceService);
    //timerList: Timer[] = [];

    menuOption: string = 'home';

    /**
     * Updates the current active menu option on the navigation bar.
     * @param {string }menuOption Menu option activated.
     */
    onOption(menuOption: string) {
        this.menuOption = menuOption;
    }

    /*
    ngOnInit(): void {
        this.timerList = this._timerService.getTimers();
    }

    // Calls the service to create a new timer
    createTimer(): void {
        this._timerService.createTimer();
        this.timerList = this._timerService.getTimers();
    }
    */

    /**
     * Calls the service to remove the timer.
     * @param {number} timerId ID of the timer to be removed.

    removeTimer(timerId: number): void {
        this._timerService.removeTimer(timerId);
        this.ngOnInit();
    }
     */

    /*
    // Calls the service to remove all the timers
    removeAllTimers(): void {
        this._timerService.removeAllTimers();
        this.ngOnInit();
    }
    */
}
