import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private service: BookingService
  ) { }

  ngOnInit(): void {

    /*this.service.getCharts().subscribe(data => {
      console.log(data)
    })*/

  }

  gotoBookingPage() {
    this.router.navigate(['/appointment']);
  }

}
