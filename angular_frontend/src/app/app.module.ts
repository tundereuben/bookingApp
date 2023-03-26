import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { TimeComponent } from './time/time.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import { PaymentsComponent } from './payments/payments.component';
import {CalendarModule} from "primeng/calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DateComponent } from './date/date.component';
import {AdminModule} from "./admin/admin.module";
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { CheckBookingComponent } from './check-booking/check-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookingComponent,
    TimeComponent,
    UserDetailsComponent,
    PaymentsComponent,
    DateComponent,
    BookingDetailsComponent,
    CheckBookingComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      CalendarModule,
      BrowserAnimationsModule,
      AdminModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
