import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {TimeComponent} from "./time/time.component";
import { UserDetailsComponent } from './user-details/user-details.component';
import {PaymentsComponent} from "./payments/payments.component";
import {DateComponent} from "./date/date.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import { BookingComponent } from './booking/booking.component';
import {CheckBookingComponent} from "./check-booking/check-booking.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'date', component: DateComponent },
  { path: 'time', component: TimeComponent },
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
