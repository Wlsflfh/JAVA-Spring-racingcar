package com.example.demo.repository;

import com.example.demo.domain.Winners;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WinnerRepository extends JpaRepository<Winners, Long> {
}
