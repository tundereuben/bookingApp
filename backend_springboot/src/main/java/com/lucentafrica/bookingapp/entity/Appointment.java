package com.lucentafrica.bookingapp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "appointment")
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "date")
    private String date;

    @Column(name = "time")
    private String time;

    @Column(name = "booking_id")
    private String bookingId;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "purpose_of_visit")
    private String purposeOfVisit;

    @Column(name = "message")
    private String message;

    @Column(name = "tenant_id")
    private String tenantId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "date_created")
    private String dateCreated;

    @Column(name = "last_edited")
    private String lastEdited;
}
