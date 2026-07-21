 API Testing Project

This Maven/Java project automates DemoQA API checks using Rest Assured, JUnit 5, JSON Schema validation, and Allure reporting.


- Create user
- Generate token
- Retrieve books
- Negative cases for invalid credentials/token
- Schema validation for success and error responses

Prerequisites
- Java 21
- Maven

## Run locally
From the project directory:


mvn test


The generated report will be available at:

```text
target/site/allure-maven-plugin/index.html
```

Set these secrets/variables in your CI system:
- DEMOQA_BASE_URL
- DEMOQA_USERNAME_PREFIX
- DEMOQA_USERNAME
- DEMOQA_PASSWORD
