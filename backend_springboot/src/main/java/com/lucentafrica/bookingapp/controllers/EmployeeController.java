package com.lucentafrica.bookingapp.controllers;

import com.lucentafrica.bookingapp.entity.Employee;
import com.lucentafrica.bookingapp.service.EmployeeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    
    @Autowired
    EmployeeService employeeService;

    @GetMapping
    public List<Employee> getEmployees() {
        return employeeService.findAll();
    }

    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable Long id) {
        Employee returnValue = new Employee();

        Employee employee = employeeService.findById(id);
        BeanUtils.copyProperties(employee, returnValue);

        return returnValue;
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        employee.setId(0L);
        Employee dbEmployee = employeeService.save(employee);
        return  dbEmployee;
    }

    @PutMapping
    public Employee updateEmployee(@RequestBody Employee customer) {
        Employee dbEmployee = employeeService.save(customer);
        return dbEmployee;
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        Employee tempEmployee = employeeService.findById(id);

        if (tempEmployee == null) {
            throw new RuntimeException("Employee not found. Id: " + id);
        }

        employeeService.deleteById(id);

        return "Deleted customer. Id: " + id;
    }

}
