package com.lucentafrica.bookingapp.service;

import com.lucentafrica.bookingapp.entity.Appointment;
import com.lucentafrica.bookingapp.entity.Customer;

import java.util.List;

public interface AppointmentService {

    List<Appointment> findAll();

    Appointment findById(Long appointmentId);

    Appointment save(Appointment appointment);

    void deleteById(Long appointmentId);

    Appointment findByAppointmentId(String appointmentId);

}
