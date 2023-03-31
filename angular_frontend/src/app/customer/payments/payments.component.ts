import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../services/booking.service";
import {Booking, User} from "../../shared/models/models";
import * as htmlToImage from 'html-to-image';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  public hasMadePayment: boolean = false;
  public appointmentId: string;
  public booking: Booking;
  public user: User;
  public paymentStatus: string = 'pending';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.appointmentId = params.get('bookingId');
      this.getBooking(this.appointmentId);
      console.log(`bookingID >>>`, params, this.appointmentId);
    });
  }

  makePayment(): void {
    this.hasMadePayment = true;
    this.bookingService.getBooking(this.appointmentId)
      .subscribe(booking => {
        const bookingToUpdate = booking[0];
        bookingToUpdate.paymentStatus = 'paid';
        this.updatePaymentStatus(bookingToUpdate);
        // this.downloadBookingDetails();
      });
  }

  updatePaymentStatus(booking: Booking): void {
    this.bookingService.updateBooking(booking)
      .subscribe(res => {
        this.paymentStatus = res.paymentStatus;
        this.openModal();
        console.log(`payment status successfully updated >>>`, res.paymentStatus);
      })
  }

  openModal() {
    const modalButton = document.getElementById('paymentModal');
    modalButton.click();
  }

  backToPrevious() {
    this.router.navigate(['/appointment'],
      {queryParams:
          {
            appointmentId: this.appointmentId,
            userId: this.user.userId,
            editBooking: true
          }
      }
    );
  }

  getBooking(id: string) {
    this.bookingService.getBooking(id)
      .subscribe(booking => {
        console.log(`booking >>>`, booking)
        this.booking = booking;
        this.hasMadePayment = this.booking.paymentStatus === 'paid';
        this.paymentStatus = this.booking.paymentStatus;
        console.log(this.booking, this.hasMadePayment, `>>>`);
        this.getUser(this.booking.userId); //todo: getUserByEmail
      });
  }

  getUser(userId: string) {
    this.bookingService.getUser(userId)
      .subscribe(user => {
        this.user = user;
        console.log(`user >>> `, user)
      })
  }

  downloadBookingDetails() { // save blob
    let DATA: any = document.getElementById('bookingDetails');
    const fileName = this.user.firstName + '_' + this.user.lastName + 'png'
    htmlToImage.toBlob(DATA)
      .then(function(blob) {
        if (window.saveAs) {
          window.saveAs(blob, fileName);
        } else {
          FileSaver.saveAs(blob, fileName)
        }
      })
  }

}
