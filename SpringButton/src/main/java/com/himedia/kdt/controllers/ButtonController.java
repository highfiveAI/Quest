package com.himedia.kdt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.himedia.kdt.services.ButtonService;
import com.himedia.kdt.vo.ButtonVo;

@RestController
@RequestMapping("/api/button")
public class ButtonController {
	
	@Autowired
	private ButtonService buttonService;
	
	@GetMapping
	public ResponseEntity<?> selectAllButtons() {
		List<ButtonVo> buttonVos = buttonService.selectAllButtons();
		return ResponseEntity.ok(buttonVos);
	}
	
	@PostMapping
	public ResponseEntity<?> insertPhone(@RequestBody ButtonVo buttonVo) {
		int result = buttonService.insertButton(buttonVo);
		return ResponseEntity.ok(result);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updatePhone(@PathVariable Integer id) {
		int result = buttonService.updateButton(id);
		return ResponseEntity.ok(result);
	}
}
