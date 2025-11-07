package com.example.demo.repository;

import com.example.demo.domain.Car;

import java.util.List;

public interface CarRepository {

    Car save(Car car);
    void deleteAll();
    List<Car> findAll();
}
