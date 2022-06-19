package com.record.the_record;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TheRecordApplication {

	static {
		System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
	}

	public static void main(String[] args) {
		SpringApplication.run(TheRecordApplication.class, args);
	}

}
