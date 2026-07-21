package com.ust.sdet.spec;

import io.qameta.allure.restassured.AllureRestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.builder.ResponseSpecBuilder;
import io.restassured.filter.log.LogDetail;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import io.restassured.specification.ResponseSpecification;

import static org.hamcrest.Matchers.lessThan;

public final class ReqSpec
{
        private ReqSpec() {
        }


        public static RequestSpecification requestSpec() {
            return new RequestSpecBuilder()
                    .setContentType(ContentType.JSON)
                    .addFilter(new AllureRestAssured())
                    .log(LogDetail.ALL)
                    .build();
        }


        public static ResponseSpecification successResponseSpec() {
            return new ResponseSpecBuilder()
                    .expectStatusCode(200)
                    .expectContentType(ContentType.JSON)
                    .expectResponseTime(lessThan(5000L))
                    .build();
        }
    public static ResponseSpecification successResponse() {
        return new ResponseSpecBuilder()
                .expectStatusCode(201)
                .expectContentType(ContentType.JSON)
                .expectResponseTime(lessThan(5000L))
                .build();
    }
    }
