package com.lucentafrica.bookingapp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employee")
@Data
public class Employee {

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

    @Column(name="password")
    private String password;

    @Column(name="user_id")
    private String userId;

    @Column(name="role")
    private String role;

    @Column(name="date_created")
    private String dateCreated;

    @Column(name = "last_logged_in")
    private String lastLoggedIn;
}
