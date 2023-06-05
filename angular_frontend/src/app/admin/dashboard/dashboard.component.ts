import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import {Appointment} from "../../shared/models/appointment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  appointments: Appointment[] = []

  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings() {
    this.bookingService.getAllBookings()
    .subscribe(data => {
      this.appointments = data;
      console.log(`all bookings >>>`, data);
    })
  }

}
