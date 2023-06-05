import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../shared/models/models";
import {Appointment} from "../../shared/models/appointment";

@Component({
  selector: 'app-check-booking',
  templateUrl: './check-booking.component.html',
  styleUrls: ['./check-booking.component.scss']
})
export class CheckBookingComponent implements OnInit {

  public searchBookingForm: FormGroup;
  public bookings: Appointment[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookingService,
  ) { }

  ngOnInit(): void {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchBookingForm = this.fb.group({
      invoiceNumber: [''],
      email: [''],
      bookingId: ['']
    })
  }

  findBooking() {
    const formValues = this.searchBookingForm.getRawValue();
    console.log(formValues);
    const bookingId = formValues.bookingId;
    this.bookService.getBooking(bookingId)
      .subscribe((res) => {
        this.bookings = [res];
        console.log(this.bookings)
      });
  }

  gotoBooking(booking: Appointment) {
    const OTP = this.bookService.generateOTP();
    this.router.navigate([`/make-payment`], { queryParams: { appointmentId: booking.appointmentId }})
  }

}
