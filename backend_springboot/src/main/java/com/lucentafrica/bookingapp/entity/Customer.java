package com.lucentafrica.bookingapp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "customers")
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="email")
    private String email;

    @Column(name="gender")
    private String gender;

    @Column(name="mobile")
    private String mobile;

    @Column(name="tenant_id")
    private String tenantId;

    @Column(name="user_id")
    private String userId;

    @Column(name="date_created")
    private String dateCreated;
}
