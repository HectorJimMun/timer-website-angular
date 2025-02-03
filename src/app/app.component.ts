import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Timer } from './models/timer.model';
import { TimerListComponent } from "./components/timer-list/timer-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TimerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    timerList: Timer[] = [];

    ngOnInit(): void {
    }

    createTimer() {
        // Create timer
        let timerId = Math.trunc(Math.random() * 100);
        let hours =   Math.trunc(Math.random() * (24 - 0) + 0);
        let minutes = Math.trunc(Math.random() * (59 - 0) + 0);
        let seconds = Math.trunc(Math.random() * (59 - 0) + 0);
    
        var timer: Timer = {
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
    
        this.timerList.push(timer);
    }
}
