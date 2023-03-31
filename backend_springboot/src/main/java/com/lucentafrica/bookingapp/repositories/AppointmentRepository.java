package com.lucentafrica.bookingapp.repositories;

import com.lucentafrica.bookingapp.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Appointment findByAppointmentId(String bookingId);
}
