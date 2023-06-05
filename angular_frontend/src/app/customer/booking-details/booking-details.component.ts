import {Component, Input, OnInit} from '@angular/core';
import {Booking, User} from "../../shared/models/models";
import {Appointment} from "../../shared/models/appointment";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  @Input() appointment: Appointment;
  // @Input() user: User;
  @Input() paymentStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
