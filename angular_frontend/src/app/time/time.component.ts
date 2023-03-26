import { Component, OnInit } from '@angular/core';
import {Booking} from "../shared/models/models";
import {BookingService} from "../services/booking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Calendar} from "primeng/calendar";

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  public fullDay: any[] = [];
  public step: number = 1;
  public booking: Booking;
  public selectedTime: any;
  private bookingId: number;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sliceDay(this.step);

    this.activatedRoute.queryParamMap.subscribe(params => {
      const id = params.get('bookingId');
      this.getBooking(id);
    })

  }

  sliceDay(step: number) {
    for (let i = 0; i < 24; i += step) {
      this.fullDay.push({isSelected: false, time: i});
    }
  }

  selectTime(timeSlice: any) {
    const time = this.fullDay.find(el => el.time === timeSlice.time);
    const index = this.fullDay.indexOf(time);
    this.fullDay[index].isSelected = !this.fullDay[index].isSelected;
    this.selectedTime = timeSlice;
    console.log(`Booking with time >>> ${timeSlice.time} - ${timeSlice.time + this.step}`);
  }

  getBooking(id: string)  {
    this.bookingService.getBooking(id)
      .subscribe(data => {
        this.booking = data[0];
        console.log(`booking >>> `, this.booking);
        if (this.booking.time) {
          const timeSlice = { isSelected: true, time: this.booking.time };
          this.selectTime(timeSlice)
        }
      });
  }

  continueToUserDetails() {

    const booking: Booking = {
      date: this.booking.date,
      id: this.booking.id,
      bookingId: this.booking.bookingId,
      paymentStatus: this.booking.paymentStatus,
      time: this.selectedTime.time,
      userId: ''
    }
    console.log(booking);

    this.bookingService.updateBooking(booking).subscribe(res => {
      this.router.navigate([`/user-details`], { queryParams: { bookingId: res.bookingId } });
    })
  }

  goToPrevious() {
    this.router.navigate(['/date'], { queryParams: { bookingId: this.booking.bookingId }})
  }
}
