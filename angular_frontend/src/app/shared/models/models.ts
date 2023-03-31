export interface CalendarDay {
  date?: number,
  month?: number,
  year?: number;
  active?: boolean;
  overflow?: boolean; // check if it's days outside the month's calendar
  isSelected?: boolean
}

export interface Booking {
  id?: number;
  appointmentId?: string;
  date?: string;
  time?: string;
  userId: string;
  paymentStatus: string;
  message?: string;
  purposeOfVisit?: string;
  tenantId?: string;
  dateCreated?: string;
  lastEdited?: string;
}

export interface User {
  id?: number,
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender?: string;
  tenantId?: string;
  dateCreated?: string;
  password?: string // todo: remove this;
  role?: string
}
