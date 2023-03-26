package com.lucentafrica.bookingapp.controllers;

import com.lucentafrica.bookingapp.entity.Appointment;
import com.lucentafrica.bookingapp.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/appointments")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @GetMapping()
    public List<Appointment> getAppointments() {
        return appointmentService.findAll();
    }

    @GetMapping("/{id}")
    public Appointment getAppointment(@PathVariable Long id) {
        return appointmentService.findById(id);
    }

    @GetMapping("/s/{bookingId}")
    public Appointment getAppointmentByBookingId(@PathVariable String bookingId) {
        Appointment result = appointmentService.findByBookingId(bookingId);
        return result;
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        appointment.setId(0L);
        Appointment dbAppointment = appointmentService.save(appointment);
        return dbAppointment;
    }

    @PutMapping
    public Appointment updateAppointment(@RequestBody Appointment appointment) {
        Appointment dbAppointment = appointmentService.save(appointment);
        return dbAppointment;
    }

    @DeleteMapping("/{id}")
    public String deleteAppointment(@PathVariable Long id) {
        Appointment tempAppointment = appointmentService.findById(id);

        if (tempAppointment == null) {
            throw new RuntimeException("Appointment not found. ID: " + id);
        }

        return "Deleted appointment. ID: " + id;
    }

}
