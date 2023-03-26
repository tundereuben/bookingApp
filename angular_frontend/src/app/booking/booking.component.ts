import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BookingService} from "../services/booking.service";
import {Booking, CalendarDay} from "../shared/models/models";
import { CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  public currentDate = '';
  // public daysTag;
  // public prevNextIcons;
  public liTag = '';
  public daysToDisplay: CalendarDay[] = [];
  public selectedDay: CalendarDay = {};

  // Getting new date, current year and month
  public date = new Date();
  public currYear = this.date.getFullYear();
  public currMonth = this.date.getMonth();

  public months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  public booking: Booking;

  constructor(
    private router: Router,
    private bookService: BookingService
  ) { }

  ngOnInit(): void {
    this.renderCalendar();
  }

  renderCalendar(): void {

    let firstDayOfMonth = new Date(this.currYear, this.currMonth, 1).getDay();
    let lastDateOfMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
    let lastDayOfMonth = new Date(this.currYear, this.currMonth, lastDateOfMonth).getDay();
    let lastDateOfLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();

    for (let i = firstDayOfMonth; i > 0; i--) {
      this.liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
      const dayToAdd: CalendarDay = {
        date: lastDateOfLastMonth - i + 1,
        month: this.currMonth-1,
        year: this.currYear,
        overflow: true,
        isSelected: false,
        active: false
      }
      this.daysToDisplay.push(dayToAdd)
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      let isToday = i === this.date.getDate()
        && this.currMonth === new Date().getMonth()
        && this.currYear === new Date().getFullYear();

      this.liTag += `<li class="${isToday}">${i}</li>`;
      const dayToAdd: CalendarDay = {
        date: i,
        month: this.currMonth,
        year: this.currYear,
        active: isToday,
        overflow: false,
        isSelected: false,
      }
      this.daysToDisplay.push(dayToAdd)
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      this.liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
      const dayToAdd: CalendarDay = {
        date: i - lastDayOfMonth + 1,
        month: this.currMonth+1,
        year: this.currYear,
        overflow: true,
        isSelected: false,
        active: false
      }
      this.daysToDisplay.push(dayToAdd)
    }

    this.currentDate = `${this.months[this.currMonth]} ${this.currYear}`;
  }

  selectDate(day: CalendarDay) {
    this.daysToDisplay.forEach(day => day.isSelected = false);

    const selectedDate: CalendarDay = this.daysToDisplay.filter(x =>
      x.year === day.year && x.month === day.month && x.date === day.date)[0];

    const index = this.daysToDisplay.indexOf(selectedDate);
    this.daysToDisplay[index].isSelected = !this.daysToDisplay[index].isSelected;
    console.log(`selected day >>>`, this.daysToDisplay[index]);
  }

  continueToTime() {
    this.bookService.saveBooking(this.booking).subscribe(data => {
      const extras = {
        booking: data
      };
      sessionStorage.setItem('extras', JSON.stringify(extras));
    })

    this.router.navigate(['/time']);
  }

  gotoPrevNext(prevNext: string) {
    this.currMonth = prevNext === 'prev' ? this.currMonth - 1 : this.currMonth + 1;

    if (this.currMonth < 0 || this.currMonth > 11) {
      this.date = new Date(this.currYear, this.currMonth);
      this.currYear = this.date.getFullYear();
      this.currMonth = this.date.getMonth();
    } else {
      this.date = new Date();
    }
    this.daysToDisplay = [];
    this.renderCalendar();
  }

}

