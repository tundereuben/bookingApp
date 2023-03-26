import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {BookingService} from "../services/booking.service";
import {Booking, User} from "../shared/models/models";

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  public appointmentForm: FormGroup;
  public selectedDate: string;
  public highlightedDate: Date;
  public booking: Booking;
  public bookingId: string;
  private formValues: any;
  public user: User;
  private isEditBooking: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookingService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.createAppointmentForm();

    this.activatedRoute.queryParamMap.subscribe(params => {
      const bookingId = params.get('bookingId');
      if (bookingId) {
        this.getBooking(bookingId);
        this.isEditBooking = true;
      }
    });

  }

  createAppointmentForm() {
    this.appointmentForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      gender: [''],
      mobile: [''],
      email: [''],
      appointmentDate: [''],
      fromTime: [''],
      toTime: [''],
      purposeOfVisit: [''],
      message: [''],
    });
  }

  /*pickDate() {
    const rawValue = this.dateForm.getRawValue().date;
    this.selectedDate = new Date(rawValue).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ;
    console.log(`selectedDate`, this.selectedDate)
  }*/

  gotoNextPage() {
    let booking;
    console.log(!this.bookingId)
    if (this.bookingId === undefined) {
      booking = {
        date: this.selectedDate,
        id: 0,
        bookingId: this.bookService.generateId(16),
        paymentStatus: "",
        time: "",
        userId: 0
      }
      this.saveBooking(booking);
    } else {
      booking = this.booking;
      booking.date = this.selectedDate ? this.selectedDate : this.booking.date;
      this.updateBooking(booking);
    }
  }

  updateBooking(booking: Booking) {
    this.bookService.updateBooking(booking).subscribe(data => {
      this.router.navigate([`/make-payment`], { queryParams: { bookingId: data.bookingId }})
    })
  }

  private updateUser(user: User) {
    this.bookService.updateUser(user)
      .subscribe(data => {
        console.log(`updated user details >>>`, user);
      })
  }

  saveBooking(booking: Booking) {
    this.bookService.saveBooking(booking).subscribe(data => {
      console.log(`created booking >>>`, data);
      this.router.navigate([`/make-payment`],
        { queryParams:
            {
              bookingId: data.bookingId,
              userId: this.user.userId
            },
        }
      );
    });
  }

  private getBooking(bookingId: string) {
    this.bookService.getBooking(bookingId)
      .subscribe(res => {
        this.booking = res[0]
        this.bookingId = bookingId;
        this.highlightedDate = new Date(this.booking.date);
        this.patchBookingValues();
      })
  }

  private patchBookingValues() {
    this.appointmentForm.patchValue({
      appointmentDate: this.booking.date,
      fromTime: this.booking.time,
      toTime: this.booking.time,
      purposeOfVisit: this.booking.purposeOfVisit,
      message: this.booking.message,
    });
    this.getUser();
  }

  private patchUserValues() {
    this.appointmentForm.patchValue({
      firstname: this.user.firstName,
      lastname: this.user.lastName,
      gender: this.user.gender,
      mobile: this.user.mobile,
      email: this.user.email,
    })
  }

  private getUser() {
    this.bookService.getUser(this.booking.userId)
      .subscribe(data => {
        this.user = data;
        console.log(`user >>> `, this.user);
        this.patchUserValues();
      });
  }


  proceedToPayment() {
    this.formValues = this.appointmentForm.getRawValue();
    if (this.isEditBooking) {
      const booking: Booking = {
        id: this.booking.id,
        bookingId: this.booking.bookingId,
        date: this.formValues.appointmentDate,
        message: this.formValues.message,
        paymentStatus: this.booking.paymentStatus,
        purposeOfVisit: this.formValues.purposeOfVisit,
        time: this.formValues.fromTime,
        userId: this.user.userId,
        tenantId: "a",
        dateCreated: "a",
        lastEdited: "a"
      }

      const user: User = {
        email: this.formValues.email,
        firstName: this.formValues.firstname,
        gender: this.formValues.gender,
        id: this.user.id,
        lastName: this.formValues.lastname,
        mobile: this.formValues.mobile,
        userId: this.user.userId
      }

      this.updateUser(user);
      this.updateBooking(booking);
    } else {
      this.saveUser()
    }
  }

  saveUser() {

    let userToSave: User = {
      email: this.formValues.email,
      firstName: this.formValues.firstname,
      lastName: this.formValues.lastname,
      mobile: this.formValues.mobile,
      gender: this.formValues.gender,
      userId: this.bookService.generateId(16),
      tenantId: this.bookService.generateId(16),
      dateCreated: 'string',
    }

    this.bookService.saveUser(userToSave)
      .subscribe(user => {
        console.log(`saved user >>>`, user)

        this.user = user;
        const booking: Booking = {
          bookingId: this.bookService.generateId(16),
          date: this.formValues.appointmentDate,
          message: this.formValues.message,
          paymentStatus: 'pending',
          purposeOfVisit: this.formValues.purposeOfVisit,
          time: this.formValues.fromTime,
          userId: user.userId,
          tenantId: "a",
          dateCreated: "a",
          lastEdited: "a"
        }
        this.saveBooking(booking);

      })
  }

}
