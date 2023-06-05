package com.lucentafrica.bookingapp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "appointments")
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "user_first_name")
    private String firstName;

    @Column(name = "user_last_name")
    private String lastName;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_gender")
    private String gender;

    @Column(name = "user_mobile")
    private String mobile;

    @Column(name = "appointment_date")
    private String date;

    @Column(name = "appointment_time")
    private String time;

    @Column(name = "appointment_id")
    private String appointmentId;

    @Column(name = "appointment_completed")
    private String completed;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "purpose_of_visit")
    private String purposeOfVisit;

    @Column(name = "message")
    private String message;

    @Column(name = "tenant_id")
    private String tenantId;

    @Column(name = "date_created")
    private String dateCreated;

    @Column(name = "last_edited")
    private String lastEdited;
}
