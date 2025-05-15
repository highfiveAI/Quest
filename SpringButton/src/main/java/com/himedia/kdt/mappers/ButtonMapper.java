package com.himedia.kdt.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.himedia.kdt.vo.ButtonVo;

@Mapper
public interface ButtonMapper {
	
	List<ButtonVo> selectAllPhone();
	
	int insertPhone(ButtonVo buttonVo);
	
	int updatePhone(Integer id);
}
