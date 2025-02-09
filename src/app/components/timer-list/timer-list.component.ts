import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from '../timer/timer.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { Timer } from '../../models/timer.model';

@Component({
  selector: 'app-timer-list',
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: './timer-list.component.html',
  styleUrl: './timer-list.component.css'
})
export class TimerListComponent implements OnInit {
    @Input({ required: true }) timerListData!: Timer[];
    @Output() removeTimerEvent = new EventEmitter<number>();
    timerList: Timer[] = [];

    private _localStorage = inject(LocalStorageService);
    private  _localStorageKey = 'storedAlarms';

    ngOnInit(): void {
        this.timerList = this.timerListData;
    }

    /**
     * Emits the timer ID to be removed from the parent.
     * @param {number} timerId Timer ID to be emitted.
     */
    removeTimer(timerId: number) {
        this.removeTimerEvent.emit(timerId as number);
    }
}
