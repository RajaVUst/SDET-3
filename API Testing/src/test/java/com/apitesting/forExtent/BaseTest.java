package com.apitesting.forExtent;

import io.restassured.RestAssured;
import org.testng.annotations.Listeners;

@Listeners(ExtentTestWatcher.class)
public class BaseTest {
    static {
        RestAssured.baseURI = "https://demoqa.com";
    }
}