import { Injectable } from '@angular/core';
import { Timer } from '../models/timer.model';

@Injectable({
    providedIn: 'root'
})
export class TimerServiceService {
    private _timerList: Timer[] = [];

    /**
     * Returns the timers.
     * @returns {Timer[]} List containing the timers.
     */
    getTimers(): Timer[] {
        return this._timerList;
    }

    // Creates a timer and adds it to the list.
    createTimer(): void {
        // Create timer
        let timerId = Math.trunc(Math.random() * 100);
        let hours =   Math.trunc(Math.random() * (24 - 0) + 0);
        let minutes = Math.trunc(Math.random() * (59 - 0) + 0);
        let seconds = Math.trunc(Math.random() * (59 - 0) + 0);
    
        // Fill the class
        var newtimer: Timer = {
            id : timerId,
            title : "Timer " + timerId,
            originalHours: hours,
            currentHours : hours,
            originalMinutes: minutes,
            currentMinutes : minutes,
            originalSeconds: seconds,
            currentSeconds : seconds,
            active : false,
            sound : "assets/sounds/sound_01.wav"
        };

        // Add the new timer to the list
        this._timerList.push(newtimer);
    }

    /**
     * Retrieves the timer from the list given the timer ID.
     * @param {number} timerId ID of the timer to be retrieved.
     * @returns {Timer} Timer object.
     */
    getTimer(timerId: number): Timer {
        var timerFound: boolean = false;
        var idxToGet = 0;

        for (const timer of this._timerList) {
            if (!timerFound) {
                if (timer.id == timerId) {
                    timerFound = true;
                }
                else {
                    idxToGet++;
                }
            }
        }

        return this._timerList[idxToGet];
    }

    /**
     * Removes the timer from the list given the timer ID.
     * @param {number} timerId ID of the timer to be removed.
     */
    removeTimer(timerId: number): void {
        var timerFound: boolean = false;
        var idxToRemove: number = 0;

        for (const timer of this._timerList) {
            if (!timerFound) {
                if (timer.id == timerId) {
                    timerFound = true;
                }
                else {
                    idxToRemove++;
                }
            }
        }

        // Remove timer
        this._timerList.splice(idxToRemove, 1);
    }

    // Removes all the timers
    removeAllTimers(): void {
        var itemsCount: number = this._timerList.length;
        this._timerList.splice(0, itemsCount);
    }
}
