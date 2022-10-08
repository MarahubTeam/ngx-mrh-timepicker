import { 
  ViewChild, 
  Component, 
  forwardRef, 
  Input, 
  OnInit, 
  HostListener, 
  ElementRef, 
  ViewContainerRef, 
  TemplateRef, 
  EmbeddedViewRef, 
  NgZone } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { createPopper } from '@popperjs/core';

@Component({
  selector: '[mTimePicker]',
  templateUrl: './timepicker.html',
  styleUrls: ['./timepicker.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true
    }
  ]
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {
  @Input() timeIntervals = 15;

  @ViewChild('timesSelector', { static: true }) private timesSelectorTemplate!: TemplateRef<{ times: any[], filterTimes: any[] }>;

  times: any[] = [];
  filterTimes: any[] = [];
  value = '';

  timesSelectorRef!: EmbeddedViewRef<any>;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private viewContainer: ViewContainerRef,
    private ngZone: NgZone) {
  }

  ngOnInit(): void {
    // Generate time list
    let i = 0;
    while (i < 24 * 60) {
      this.times.push(this.convertNumberToTime(i));
      i += this.timeIntervals;
    }
  }

  writeValue(value: string): void {
    this.value = this.convertInputTextToValue(value);
    this.updateInputText();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  convertNumberToTime(value: number) {
    const h = Math.floor(value / 60);
    const m = value % 60;
    return {
      h,
      m,
      text: this.transform(`${h}:${m}`),
      isAfternoon: h > 12
    }
  }

  selectTime(time: any) {
    this.value = `${time.h}:${time.m < 10 ? '0' + time.m : time.m}:00`;
    this.updateInputText();
    this.onChange(this.value);
    this.hideTimesSelector();
  }

  transform(value: string): string {
    if (!value) return '';
    let [h, m, s] = value.split(':');
    let a = 'AM';
    let hi = parseInt(h, 10);
    let mi = parseInt(m, 10);
    if (hi >= 12) {
      a = 'PM';
      if (hi > 12) hi -= 12;
    }

    if (hi === 0) hi = 12;

    return `${hi}:${mi < 10 ? '0' + mi : mi} ${a}`;
  }

  convertInputTextToValue(text: string): string {
    if (!text) return '';
    text = text.toUpperCase().trim().replace(/  /g, ' ');
    let result = '';
    try {
      let [time, a] = text.split(' ');
      let [h, m] = time.split(':');
      let hi = parseInt(h, 10);
      let mi = parseInt(m, 10);
      if (isNaN(hi) || isNaN(mi) || hi > 24 || mi > 60) {
        result = '';
      } else {
        if (a === 'PM') {
          if (hi < 12) hi += 12;
        }
        if (a === 'AM') {
          if (hi === 12) hi = 0;
        }
        result = `${hi < 10 ? '0' + hi : hi}:${mi < 10 ? '0' + mi : mi}:00`;
      }
    } catch (err) {
      result = '';
    }
    return result;
  }

  updateValueFromTyping(value: string) {
    this.value = this.convertInputTextToValue(value);
    this.updateInputText();
    this.onChange(this.value);
  }

  updateInputText() {
    this.el.nativeElement.value = this.transform(this.value);
  }

  scrollToValue(value: string) {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log(this.timesSelectorRef);
        if (!this.timesSelectorRef!.destroyed) {
          const timeSelectElm = this.timesSelectorRef.rootNodes[0].querySelector('.timepicker-time-list');
          if (timeSelectElm) {
            let [h, m] = value.split(':');
            let addHour = 0;
            if (value.toLocaleLowerCase().includes('pm')) addHour = 12;
            let n = (parseInt(h, 10) + addHour) * 60;
            if (m) n += + parseInt(m, 10);
            let scrollPercent = n / (24 * 60);
            timeSelectElm.scrollTop = timeSelectElm.scrollHeight * scrollPercent;
          }
        }
      }, 100)
    })
  }

  showTimesSelector() {
    this.timesSelectorRef = this.viewContainer.createEmbeddedView(this.timesSelectorTemplate, { times: this.times, filterTimes: this.filterTimes });
    createPopper(this.el.nativeElement, this.timesSelectorRef.rootNodes[0], {
      placement: 'auto-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
      onFirstUpdate: () => {
        if (this.value) {
          this.scrollToValue(this.value);
        } else {
          this.scrollToValue(this.el.nativeElement.value);
        }
      }
    });

    document.addEventListener('mousedown', this.onWindowClick);
    document.addEventListener('touchstart', this.onWindowClick);
  }

  hideTimesSelector() {
    this.viewContainer.clear();
    this.timesSelectorRef.destroy();
    document.removeEventListener('mousedown', this.onWindowClick);
    document.removeEventListener('touchstart', this.onWindowClick);
  }

  @HostListener('focus')
  onFocus() {
    this.showTimesSelector();
  }

  @HostListener('keydown.enter', ['$event.target.value'])
  onEnter(value: string) {
    this.updateValueFromTyping(value);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    this.hideTimesSelector();
    this.updateValueFromTyping(value);
    this.onTouched();
  }

  @HostListener('keyup', ['$event.target.value'])
  onKeyup(value: string) {
    this.scrollToValue(value);
    this.filterTimes = this.times.filter(itme => itme.text.startsWith(value));
  }

  onWindowClick = (event: MouseEvent | TouchEvent) => {
    if (!event.target) return;
    const target = event.target as HTMLElement;
    if (target.classList.contains('timepicker-time-list')) return;
    if (target.classList.contains('timepicker-time-list-item')) return;
    if (target !== this.el.nativeElement) {
      this.hideTimesSelector();
    }
  }

}
