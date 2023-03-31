import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Booking, User} from "../../shared/models/models";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public userForm: FormGroup;
  public booking: Booking;
  private bookingId: string;

  constructor(
    private bookingService: BookingService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.bookingId = params.get('bookingId');
      this.getBooking(this.bookingId);
    });

  }

  createForm() {
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
      message: ['']
    })
  }

  getBooking(id: string)  {
    this.bookingService.getBooking(id)
      .subscribe(data => {
        this.booking = data[0];
        console.log(`booking >>> `, this.booking)
      })
  }

  submitForm(): void {
    const formValues = this.userForm.getRawValue();
    const bookingMessage = formValues.message;

    this.bookingService.getUserByEmail(formValues.email)
      .subscribe(data => {
        let userToSave = data[0];
        if (!userToSave) {
          userToSave = {
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            email: formValues.email,
            mobile: formValues.mobile,
          }
          this.bookingService.saveUser(userToSave)
            .subscribe(savedUser => {
              const id = savedUser.id;

              this.updateBookingWithUserId(id, bookingMessage);
            })
        } else {
          const id = userToSave.id;
          this.updateBookingWithUserId(id, bookingMessage);
        }

      });

  }

  updateBookingWithUserId(id: number, message: string): void {

    const booking: Booking = {
      date: this.booking.date,
      id: this.booking.id,
      appointmentId: this.booking.appointmentId,
      paymentStatus: "pending",
      time: this.booking.time,
      userId: this.booking?.userId,
      message: message
    }

    this.bookingService.updateBooking(booking).subscribe(updatedBooking => {
      console.log(`successfully updated booking with user ID`, updatedBooking);
      this.router.navigate([`/make-payment`], { queryParams: { bookingId: booking.appointmentId } });
    })
  }

  goToPrevious() {
    this.router.navigate([`/time`], { queryParams: { bookingId: this.bookingId } })
  }
}
