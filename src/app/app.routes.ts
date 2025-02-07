import { Routes } from '@angular/router';
import { ClockComponent } from './components/clock/clock.component';
import { TimerListComponent } from './components/timer-list/timer-list.component';

export const routes: Routes = [
    {path: '', component: ClockComponent},
    {path: 'timers', component: TimerListComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
