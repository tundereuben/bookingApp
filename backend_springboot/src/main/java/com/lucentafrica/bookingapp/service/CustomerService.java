package com.lucentafrica.bookingapp.service;


import com.lucentafrica.bookingapp.entity.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> findAll();

    Customer findById(Long id);

    Customer save(Customer customer);

    void deleteById(Long id);

    Customer findCustomerByUserId(String userId);
}
