package com.lucentafrica.bookingapp.repositories;

import com.lucentafrica.bookingapp.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findCustomerByUserId(String userId);
}
