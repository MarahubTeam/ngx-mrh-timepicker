# NgxMrhTimepicker

Angular timepicker.

## Demo

https://marahubteam.github.io/ngx-mrh-timepicker/

## Getting started

Install timepicker through npm:
```angular2html
npm i ngx-mrh-timepicker
```
Next import the timepicker module into your app's module:
```typescript
import {NgModule} from '@angular/core';
import { TimepickerModule } from 'ngx-mrh-timepicker';

@NgModule({
  imports: [TimepickerModule]
})
export class MyModule {}
```
Then connect the timepicker to an input via a template property:
```angular2html
<input mTimePicker>
```
The timepicker opens once you click on the input.