import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimePickerComponent } from './timepicker';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [TimePickerComponent],
    declarations: [TimePickerComponent],
    providers: [],
})
export class TimepickerModule { }
