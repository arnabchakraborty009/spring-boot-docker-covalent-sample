package com.rean.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.rean.repo.ProdRepo;
import com.rean.service.ProdService;
import com.rean.entity.*;
import com.rean.helper.ProdControllerHelper;
import com.google.gson.Gson;

@CrossOrigin
@Controller
@ComponentScan(basePackages = { "com.rean" })
@EnableJpaRepositories(basePackages = "com.rean.repo")
@EntityScan(basePackages = "com.rean.entity")
public class ProdController {
	private static final Logger logger = LoggerFactory
			.getLogger(ProdController.class);
	@Autowired
	ProdService prodService;
	@Autowired
	ProdControllerHelper prodControllerHelper;

	@CrossOrigin
	@RequestMapping("/getAll")
	public @ResponseBody String welcome(Map<String, Object> model) {
		logger.info("In Welcome controller");
		List<Prod> prods = prodService.findAll();
		String json = new Gson().toJson(prods);
		return json;
	}

	@CrossOrigin
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public @ResponseBody String update(@RequestBody Prod prodRequest) {
		logger.info("In update .");
		try {
			prodService.save(prodRequest);
			logger.info("Saved ");

		} catch (Exception e) {
			// return 0;
		}
		return "Updated !";

	}

	// http://localhost:8080/delete/?id=1
	@CrossOrigin
	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public @ResponseBody String delete(@RequestParam String id) {
		try {
			prodService.delete(Long.valueOf(id));
			// return 1;
		} catch (Exception e) {
			System.out.println("Exception in deletion =" + e);
		}
		// response.setHeader("Access-Control-Allow-Headers",
		// "x-requested-with x-uw-act-as");
		return "Deleted";
	}

}
