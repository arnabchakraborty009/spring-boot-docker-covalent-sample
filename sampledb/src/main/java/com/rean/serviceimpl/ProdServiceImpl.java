package com.rean.serviceimpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Service;

import com.rean.entity.Prod;
import com.rean.repo.ProdRepo;
import com.rean.service.ProdService;

@Service
public class ProdServiceImpl implements ProdService {
	@Autowired
	ProdRepo prodRepo;

	public List<Prod> findAll() {
		return prodRepo.findAll();
	}

	public void delete(Long id) {
		prodRepo.delete(id)	;
	}

	public void save(Prod prod) {
		prodRepo.save(prod);
		
	}



}
