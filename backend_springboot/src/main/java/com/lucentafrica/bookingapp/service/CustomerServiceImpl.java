package com.lucentafrica.bookingapp.service;

import com.lucentafrica.bookingapp.entity.Customer;
import com.lucentafrica.bookingapp.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer findById(Long id) {

        Optional<Customer> result = customerRepository.findById(id);

        Customer customer = null;

        if (result.isPresent()) {
            customer = result.get();
        } else {
            throw new RuntimeException("Customer not found. ID:" + id);
        }

        return customer;
    }

    @Override
    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public void deleteById(Long id) {
        customerRepository.deleteById(id);
    }

    @Override
    public Customer findCustomerByUserId(String userId) {

        Customer result = customerRepository.findCustomerByUserId(userId);

        Customer customer = null;

        if (result != null) {
            customer = result;
        } else {
            throw new RuntimeException("Customer not found. ID: " + userId);
        }

        return customer;
    }
}
