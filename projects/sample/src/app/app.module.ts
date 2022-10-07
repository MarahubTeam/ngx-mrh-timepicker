import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimepickerModule } from 'ngx-mrh-timepicker';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TimepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
