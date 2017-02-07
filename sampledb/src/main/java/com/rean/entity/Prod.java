package com.rean.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity (name="PROD")
public class Prod {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long id;
	
	public String serviceName;
	public String serviceStatus;
	
	public void setId(Long id){
		this.id=id;
	}
	public Long getId(){
		return this.id;
	}
	public void setServiceName(String serviceName){
		this.serviceName=serviceName;
	}
	public String getServideName(){
		return this.serviceName;
	}
	
	public void setServiceStatus(String serviceStatus){
		this.serviceStatus=serviceStatus;
	}
	public String getServiceStatus(){
		return this.serviceStatus;
	}
}
