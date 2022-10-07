import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TimePickerDirective } from './timepicker';

import { TimePickerComponent } from './timepicker.component';

@NgModule({
    imports: [
        CommonModule,
        NgbPopoverModule
    ],
    exports: [TimePickerComponent, TimePickerDirective],
    declarations: [TimePickerComponent, TimePickerDirective],
    providers: [],
})
export class TimepickerModule { }
