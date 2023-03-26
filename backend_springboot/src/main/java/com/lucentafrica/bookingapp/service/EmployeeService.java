package com.lucentafrica.bookingapp.service;

import com.lucentafrica.bookingapp.entity.Employee;

import java.util.List;

public interface EmployeeService {

    List<Employee> findAll();

    Employee findById(Long employeeId);

    Employee save(Employee employee);

    void deleteById(Long employeeId);
}
