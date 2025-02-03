import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Timer } from '../../models/timer.model';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy {
    private _onEdit: boolean = false;
    private _intervalTimeOut = 10;
    public timer: Timer = new Timer();
    
    @Input({ required: true }) timerData!: Timer;
    public audio = new Audio();
    public interval?: any;
    timerForm!: FormGroup;
    totalSecondsElapsed!: number;
    totalSeconds!: number;

    constructor(private formBuilder: FormBuilder) {
        this.timerForm = this.formBuilder.group({
            hours:    [0, Validators.required],
            minutes:  [0, Validators.required],
            seconds:  [0, Validators.required]
        });
        console.log(this.timerForm.controls);
    }
    

    // Initialise the default values for the alarm
    ngOnInit(): void {
        // Initialise the timer with the input data
        this.timer.id = this.timerData.id;
        this.timer.title = this.timerData.title;
        this.timer.originalHours = this.timerData.originalHours;
        this.timer.currentHours = this.timerData.originalHours;
        this.timer.originalMinutes = this.timerData.originalMinutes;
        this.timer.currentMinutes = this.timerData.originalMinutes;
        this.timer.originalSeconds = this.timerData.originalSeconds;
        this.timer.currentSeconds = this.timerData.originalSeconds;
        this.timer.sound = this.timerData.sound;
        this.timer.active = this.timerData.active;

        // Setup audio
        this.audio.src = this.timer.sound as string;
        this.audio.load();

        // Compute total seconds
        this.totalSeconds = (this.timer.originalHours * 60 * 60) + (this.timer.originalMinutes * 60) + (this.timer.originalSeconds);
        this.totalSecondsElapsed = 0;
    }

    ngOnDestroy() {
        this.audio.pause();
        this.stopTimer();
    }

    refreshData(){
        this.timer.currentSeconds -= 1;
        this.totalSecondsElapsed += 1;
    
        if (this.timer.currentSeconds < 0) {
            this.timer.currentMinutes -= 1;
            this.timer.currentSeconds = 59;
        }
        if (this.timer.currentMinutes < 0) {
            this.timer.currentHours -= 1;
            this.timer.currentMinutes = 59;
        }        

        if (this.totalSecondsElapsed == this.totalSeconds) {
            this.stopTimer();
            this.setActive(false);
            // Here we need to play the sound
            //this.playSound();
        }
    }

    isEditing(): boolean {
        return this._onEdit;
    }

    setEditing(edit: boolean) {
        this._onEdit = edit;
    }

    isActive() {
        return this.timer.active;
    }

    setActive(active: boolean) {
        this.timer.active = active;
    }

    resetTimer(): void {
        this.timer.currentHours = this.timer.originalHours;
        this.timer.currentMinutes = this.timer.originalMinutes;
        this.timer.currentSeconds = this.timer.originalSeconds;

        // Compute total seconds
        this.totalSeconds = (this.timer.originalHours * 60 * 60) + (this.timer.originalMinutes * 60) + (this.timer.originalSeconds);
        this.totalSecondsElapsed = 0;
    }

    startTimer() {
        // Restore original time
        this.resetTimer();

        this.interval = setInterval(() => {this.refreshData();}, this._intervalTimeOut);
        this.setActive(true);
    }

    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        // Restore original timer
        this.resetTimer();

        this.setActive(false);
    }

    saveTimer(event: Event): void {
        event.preventDefault();

        // TODO: Check the values from the user input

        //console.log(this.alarmForm.value);
        this.timer.originalHours = this.timerForm.value['hours'] as number;
        this.timer.originalMinutes = this.timerForm.value['minutes'] as number;
        this.timer.originalSeconds = this.timerForm.value['seconds'] as number;

        this.resetTimer();
        this.setEditing(false);
    }

    playSound() {
        this.audio.play();
    }

    createTimer(timer: Timer) : void {
        // Initialise the timer with the input data
        this.timer.id = timer.id;
        this.timer.title = timer.title;
        this.timer.originalHours = timer.originalHours;
        this.timer.currentHours = timer.originalHours;
        this.timer.originalMinutes = timer.originalMinutes;
        this.timer.currentMinutes = timer.originalMinutes;
        this.timer.originalSeconds = timer.originalSeconds;
        this.timer.currentSeconds = timer.originalSeconds;
        this.timer.sound = timer.sound;
        this.timer.active = timer.active;

        // Setup audio
        this.audio.src = this.timer.sound as string;
        this.audio.load();

        // Compute total seconds
        this.totalSeconds = (this.timer.originalHours * 60 * 60) + (this.timer.originalMinutes * 60) + (this.timer.originalSeconds);
        this.totalSecondsElapsed = 0;
    }
}
