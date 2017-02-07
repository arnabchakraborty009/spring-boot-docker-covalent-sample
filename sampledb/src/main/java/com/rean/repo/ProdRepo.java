package com.rean.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rean.entity.Prod;

@Repository
public interface ProdRepo extends JpaRepository<Prod, Long> {
    List<Prod> findAll();
    
}