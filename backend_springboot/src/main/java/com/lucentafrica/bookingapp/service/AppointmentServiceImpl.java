package com.lucentafrica.bookingapp.service;

import com.lucentafrica.bookingapp.entity.Appointment;
import com.lucentafrica.bookingapp.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Override
    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment findById(Long appointmentId) {
        Optional<Appointment> result = appointmentRepository.findById(appointmentId);
        Appointment appointment = null;

        if (result.isPresent()) {
            appointment = result.get();
        } else {
            throw new RuntimeException("Appointment not found. ID: " + appointmentId);
        }

        return appointment;
    }

    @Override
    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public void deleteById(Long appointmentId) {
        appointmentRepository.deleteById(appointmentId);
    }

    @Override
    public Appointment findByBookingId(String appointmentId) {

        Appointment result = appointmentRepository.findByBookingId(appointmentId);

        Appointment appointment = null;

        if (result != null) {
            appointment = result;
        } else {
            throw new RuntimeException("Appointment not found. ID: " + appointmentId);
        }

        return appointment;
    }


}
