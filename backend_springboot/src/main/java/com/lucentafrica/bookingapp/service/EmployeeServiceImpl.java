package com.lucentafrica.bookingapp.service;

import com.lucentafrica.bookingapp.entity.Employee;
import com.lucentafrica.bookingapp.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee findById(Long employeeId) {
        Optional<Employee> result = employeeRepository.findById(employeeId);

        Employee employee = null;

        if (result.isPresent()) {
            employee = result.get();
        } else {
            throw new RuntimeException("Employee not found. ID: " + employeeId);
        }

        return employee;
    }

    @Override
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public void deleteById(Long employeeId) {
        employeeRepository.deleteById(employeeId);
    }
}
