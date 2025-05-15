package com.himedia.kdt;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan(basePackages = "com.himedia.kdt.mappers")
public class SpringButtonApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringButtonApplication.class, args);
	}

}
