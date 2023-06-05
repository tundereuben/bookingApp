import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../services/booking.service";
import {Booking, User} from "../../shared/models/models";
import * as htmlToImage from 'html-to-image';
import * as FileSaver from 'file-saver';
import {Appointment} from "../../shared/models/appointment";
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  public hasMadePayment: boolean = false;
  public appointmentId: string;
  public booking: Booking;
  public appointment: Appointment;
  public user: User;
  public paymentStatus: string = 'pending';

  /*** FlutterWave Properties ***/
  publicKey = "FLWPUBK_TEST-e05b305c48c395af32844477606c105a-X";

  customerDetails = {
    name: "",
    email: "",
    phone_number: "",
  };

  testCard = {
    cardNumber: 5531886652142950,
    cvv: 564,
    expiry: '09/32',
    pin: 3310,
    otp: 12345
  };

  customizations = {
    title: "Make Payment",
    description: "Customization Description",
    // logo: "https://flutterwave.com/images/logo-colored.svg",
  };

  meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };

  paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: "NGN",
    payment_options: "card,ussd",
    redirect_url: "",
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this,
  };
  /*** FlutterWave Properties ends ***/


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private flutterwave: Flutterwave
  ) { }

  /**** FlutterWave Methods*/
  makePayment() {

    this.paymentData.customer = {
      name: `${this.appointment.firstName} ${this.appointment.lastName}`,
      email: this.appointment.email,
      phone_number: this.appointment.mobile,
    };

    this.flutterwave.inlinePay(this.paymentData);
  }
  makePaymentCallback(response: PaymentSuccessResponse): void {
    this.getBookingAndUpdate();
    console.log("Payment callback", response);
  }
  closedPaymentModal(): void {
    console.log("payment is closed");
  }

  generateReference(): string {
    const date = new Date();
    return date.getTime().toString();
  }
  /*** FlutterWave methods end */

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.appointmentId = params.get('appointmentId');
      this.getBooking(this.appointmentId);
      console.log(`appointmentId >>>`, params, this.appointmentId);
    });

  }

  getBookingAndUpdate(): void {
    this.hasMadePayment = true;
    this.bookingService.getBooking(this.appointmentId)
      .subscribe((booking) => {
        console.log(booking)
        const bookingToUpdate = booking/*[0]*/;
        bookingToUpdate.paymentStatus = 'paid';
        this.updatePaymentStatus(bookingToUpdate);
        // this.downloadBookingDetails();
      });
  }

  updatePaymentStatus(appointment: Appointment): void {
    this.bookingService.updateBooking(appointment)
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
      .subscribe(appointment => {
        console.log(`appointment >>>`, appointment)
        this.appointment = appointment;
        this.hasMadePayment = this.appointment.paymentStatus === 'paid';
        this.paymentStatus = this.appointment.paymentStatus;
        console.log(this.appointment, this.hasMadePayment);
      });
  }

  /*getUser(userId: string) {
    this.bookingService.getUser(userId)
      .subscribe(user => {
        this.user = user;
        console.log(`user >>> `, user)
      })
  }*/

  downloadBookingDetails() { // save blob
    let DATA: any = document.getElementById('bookingDetails');
    const fileName = this.appointment.lastName + '_payment_receipt'
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
