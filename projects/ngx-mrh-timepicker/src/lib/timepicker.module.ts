import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { TimePickerComponent } from './timepicker.component';

@NgModule({
    imports: [
        CommonModule,
        NgbPopoverModule
    ],
    exports: [TimePickerComponent],
    declarations: [TimePickerComponent],
    providers: [],
})
export class TimepickerModule { }
