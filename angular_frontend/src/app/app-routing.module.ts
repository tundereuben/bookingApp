import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import { UserDetailsComponent } from './customer/user-details/user-details.component';
import {PaymentsComponent} from "./customer/payments/payments.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import { BookingComponent } from './booking/booking.component';
import {CheckBookingComponent} from "./customer/check-booking/check-booking.component";
import {AppointmentComponent} from "./customer/appointment/appointment.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'make-payment', component: PaymentsComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'check-booking', component: CheckBookingComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
