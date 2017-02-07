package com.rean.service;

import java.util.List;

import com.rean.entity.Prod;

public interface ProdService {
	public List<Prod> findAll();
	public void delete(Long id);
	public void save(Prod prod);
}
