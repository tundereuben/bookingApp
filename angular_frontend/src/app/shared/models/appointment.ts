export interface Appointment {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  date: string;
  time: string;
  appointmentId: string;
  paymentStatus: string;
  purposeOfVisit: string;
  message: string;
  tenantId: string;
  dateCreated: string;
  lastEdited: string;
  completed?: string;
}
