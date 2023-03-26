import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bookings: any[] = []

  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings() {
    this.bookingService.getAllBookings()
    .subscribe(data => {
      this.bookings = data;
      console.log(`all bookings >>>`, data);
    })
  }

}
