import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../services/booking.service";
import {Booking, User} from "../../shared/models/models";
import {Appointment} from "../../shared/models/appointment";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  public appointmentForm: FormGroup;
  private isEditBooking: boolean = false;
  public booking: Booking;
  public appointment: Appointment;
  public bookingId: string;
  public highlightedDate: Date;
  public user: User;
  private formValues: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookingService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.createAppointmentForm();

    this.activatedRoute.queryParamMap.subscribe(params => {
      const appointmentId = params.get('appointmentId');
      if (appointmentId) {
        this.getBooking(appointmentId);
        this.isEditBooking = true;
      }
      console.log(appointmentId);
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

  private getBooking(bookingId: string) {
    this.bookService.getBooking(bookingId)
      .subscribe(res => {
        // this.booking = res;
        this.appointment = res;
        this.bookingId = bookingId;
        this.highlightedDate = new Date(this.booking.date);
        console.log(res);
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
    // this.getUser();
  }

  /*private getUser() {
    this.bookService.getUser(this.booking.userId)
      .subscribe(data => {
        this.user = data;
        console.log(`user >>> `, this.user);
        this.patchUserValues();
      });
  }*/

  /*private patchUserValues() {
    this.appointmentForm.patchValue({
      firstname: this.user.firstName,
      lastname: this.user.lastName,
      gender: this.user.gender,
      mobile: this.user.mobile,
      email: this.user.email,
    });
  }*/

  saveAppointment() {
    const formValues = this.appointmentForm.getRawValue();
    console.log(`appointment details >>> `, formValues);
    const appointment: Appointment = {
      appointmentId: this.bookService.generateId(16),
      date: formValues.appointmentDate,
      dateCreated: String(new Date()),
      email: formValues.email,
      firstName: formValues.firstname,
      gender: formValues.gender,
      id: 0,
      lastEdited: String(new Date()),
      lastName: formValues.lastname,
      message: formValues.message,
      mobile: formValues.mobile,
      paymentStatus: 'pending',
      purposeOfVisit: formValues.purposeOfVisit,
      tenantId: 'from_url_source',
      time: formValues.fromTime
    }

    console.log(`booking to save >>>`, appointment);

    this.bookService.saveBooking(appointment)
      .subscribe(res => {
        console.log(`Saved appointment >>>`, res);

        this.router.navigate([`/make-payment`],
          {queryParams: { appointmentId: res.appointmentId }}
        );
      });
  }

  /*proceedToPayment() {
    this.formValues = this.appointmentForm.getRawValue();
    if (this.isEditBooking) {
      const booking: Booking = {
        id: this.booking.id,
        appointmentId: this.booking.appointmentId,
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
        id: this.user.id,
        firstName: this.formValues.firstname,
        lastName: this.formValues.lastname,
        email: this.formValues.email,
        gender: this.formValues.gender,
        mobile: this.formValues.mobile,
        tenantId: this.user.tenantId,
        userId: this.user.userId,
        dateCreated: this.user.dateCreated,
        password: this.user.password,
        role: this.user.role
      }

      this.updateUser(user);
      this.updateBooking(appointment);
    } else {
      this.saveUser()
    }
  }*/

  /*saveUser() {

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
          appointmentId: this.bookService.generateId(16),
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
        // this.saveBooking(booking);

      })
  }*/

  /*saveBooking(booking: Booking) {
    this.bookService.saveBooking(booking).subscribe(data => {
      console.log(`created booking >>>`, data);
      this.router.navigate([`/make-payment`],
        { queryParams:
            {
              bookingId: data.appointmentId,
              userId: this.user.userId
            },
        }
      );
    });
  }*/

  updateBooking(appointment: Appointment) {
    this.bookService.updateBooking(appointment).subscribe(data => {
      this.router.navigate([`/make-payment`], { queryParams: { bookingId: data.appointmentId }})
    })
  }

  /*private updateUser(user: User) {
    this.bookService.updateUser(user)
      .subscribe(data => {
        console.log(`updated user details >>>`, user);
      })
  }*/

}
