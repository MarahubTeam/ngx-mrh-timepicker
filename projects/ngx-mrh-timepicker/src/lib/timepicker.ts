import { Directive, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[mTimePicker]',
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TimePickerDirective),
        multi: true
    }
  ]
})
export class TimePickerDirective implements ControlValueAccessor {
  @Input() timeIntervals = 15;
  @Input() label = 'Time';

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() { }

  writeValue(value: string): void {
    // this.value = this.convertInputTextToValue(value);
    // this.viewValue = this.transform(this.value);
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }
}
