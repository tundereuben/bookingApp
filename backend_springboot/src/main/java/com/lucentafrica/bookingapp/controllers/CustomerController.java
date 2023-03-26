package com.lucentafrica.bookingapp.controllers;

import com.lucentafrica.bookingapp.entity.Appointment;
import com.lucentafrica.bookingapp.entity.Customer;
import com.lucentafrica.bookingapp.service.CustomerService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping
    public List<Customer> getCustomers() {
        return customerService.findAll();
    }

    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable Long id) {
        Customer returnValue = new Customer();

        Customer customer = customerService.findById(id);
        BeanUtils.copyProperties(customer, returnValue);

        return returnValue;
    }

    @GetMapping("/s/{userId}")
    public Customer getCustomerByUserId(@PathVariable String userId) {
        Customer result = customerService.findCustomerByUserId(userId);
        return result;
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        customer.setId(0L);
        Customer dbCustomer = customerService.save(customer);
        return  dbCustomer;
    }

    @PutMapping
    public Customer updateCustomer(@RequestBody Customer customer) {
        Customer dbCustomer = customerService.save(customer);
        return dbCustomer;
    }

    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {
        Customer tempCustomer = customerService.findById(id);

        if (tempCustomer == null) {
            throw new RuntimeException("Customer not found. Id: " + id);
        }

        customerService.deleteById(id);

        return "Deleted customer. Id: " + id;
    }

}
