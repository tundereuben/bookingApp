package com.lucentafrica.bookingapp.repositories;

import com.lucentafrica.bookingapp.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
