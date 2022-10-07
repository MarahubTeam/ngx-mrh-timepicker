import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TimepickerModule } from 'ngx-mrh-timepicker';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TimepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
