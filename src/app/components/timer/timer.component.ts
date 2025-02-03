import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Timer } from '../../models/timer.model';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy {
    private _onEdit: boolean = false;
    private _intervalTimeOut = 1000;
    public timer: Timer = new Timer();
    
    @Input({ required: true }) timerData!: Timer;
    public audio = new Audio();
    public interval?: any;
    timerForm!: FormGroup;
    totalSecondsElapsed!: number;
    totalSeconds!: number;

    constructor(private formBuilder: FormBuilder) {
        this.timerForm = this.formBuilder.group({
            name:     ['', Validators.required],
            hours:    [0, Validators.required],
            minutes:  [0, Validators.required],
            seconds:  [0, Validators.required]
        });
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

        // Update the form to show the stored values
        if (edit) {
            this.timerForm.controls['name'].setValue(this.timer.title);
            this.timerForm.controls['hours'].setValue(this.timer.originalHours);
            this.timerForm.controls['minutes'].setValue(this.timer.originalMinutes);
            this.timerForm.controls['seconds'].setValue(this.timer.originalSeconds);
        }
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

        // Get values from user input
        let allCorrect = true;
        let inputTitle =  this.timerForm.value['name'] as string;
        let inputHours =  this.timerForm.value['hours'] as number;
        let inputMinutes =  this.timerForm.value['minutes'] as number;
        let inputSeconds =  this.timerForm.value['seconds'] as number;

        // Check range of values
        if (inputHours < 0 || inputHours > 24) {
            allCorrect = false;
        }
        if (inputMinutes < 0 || inputMinutes > 59) {
            allCorrect = false;
        }
        if (inputSeconds < 0 || inputSeconds > 59) {
            allCorrect = false;
        }

        // Check for valid data
        if (inputTitle == '') {
            allCorrect = false;
        }
        if (inputHours == null || inputMinutes == null || inputSeconds == null) {
            allCorrect = false;
        }

        if (isNaN(inputHours) || isNaN(inputMinutes) || isNaN(inputSeconds)) {
            allCorrect = false;
        }

        if (!allCorrect) {
            return;
        }

        // Set the input values
        this.timer.title = this.timerForm.value['name'] as string;
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

    /**
    * Checks if the given field has range error or invalid data.
    * @param {string} field Name of the field to check.
    * @returns {boolean} True if the given field has the given error type. Otherwise, False.
    */
    hasErrors(field: string) {
        let allCorrect: boolean = true;
        let inputValue:any = (field == 'name')? this.timerForm.get(field)?.value as string : this.timerForm.get(field)?.value as number;

        // Check title not empty
        if (field == 'name' && inputValue == '') {
            allCorrect = false;
        }

        // Check range of values
        if (field == 'hours') {
            if (inputValue < 0 || inputValue > 24) {
                allCorrect = false;
            }
        }

        if (field == 'minutes' || field == 'seconds') {
            if (inputValue < 0 || inputValue > 59) {
                allCorrect = false;
            }
        }

        // Check valid data
        if (field != 'name') {
            if (inputValue == null || isNaN(inputValue)) {
                allCorrect = false;
            }
        }

        return this.timerForm.get(field)?.touched && !allCorrect;
    }
}
