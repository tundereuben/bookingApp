import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { UserDetailsComponent } from './customer/user-details/user-details.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import { PaymentsComponent } from './customer/payments/payments.component';
import {CalendarModule} from "primeng/calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AdminModule} from "./admin/admin.module";
import { BookingDetailsComponent } from './customer/booking-details/booking-details.component';
import { CheckBookingComponent } from './customer/check-booking/check-booking.component';
import { AppointmentComponent } from './customer/appointment/appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookingComponent,
    UserDetailsComponent,
    PaymentsComponent,
    BookingDetailsComponent,
    CheckBookingComponent,
    AppointmentComponent
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
