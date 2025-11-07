package com.example.demo.repository;

import com.example.demo.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataJpaCarRepository extends JpaRepository<Car, Long>, CarRepository {
}
