package com.himedia.kdt.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.himedia.kdt.mappers.ButtonMapper;
import com.himedia.kdt.vo.ButtonVo;

@Service
public class ButtonService {
	
	@Autowired
	private ButtonMapper buttonMapper;
	
	public List<ButtonVo> selectAllButtons() {
		List<ButtonVo> buttonVos = buttonMapper.selectAllPhone();
		return buttonVos;
	}
	
	public int insertButton(ButtonVo buttonVo) {
		int result = buttonMapper.insertPhone(buttonVo);
		return result;
	}
	
	public int updateButton(Integer id) {
		int result = buttonMapper.updatePhone(id);
		return result;
	}
}
