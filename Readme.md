# Automation Testing Assessment

## Project Overview

This repository contains an automation framework developed as part of the Automation Testing Assessment. The framework includes UI Automation using Playwright with TypeScript and API Automation using Rest Assured with Java. It is designed using reusable components, follows industry-standard best practices, and is integrated with GitHub Actions for Continuous Integration (CI).

**Name:** Saiteja Kodi  
**UST ID:** 299172

---

## Technology Stack

### UI Automation
- Playwright
- TypeScript
- Page Object Model (POM)
- Node.js
- dotenv

### API Automation
- Java 21
- Maven
- Rest Assured
- JUnit 5
- Jackson
- dotenv
- Log4j2
- Allure Report
- JSON Schema Validation

---

## Implemented Test Scenarios

### UI Automation
- Free Shipping Threshold Validation
- Payment Processing Error Validation

### API Automation
- Create User
- Generate Authentication Token
- Retrieve Books
- Status Code Validation
- Response Body Validation
- JSON Schema Validation
- Bearer Token Authentication

---

## Key Features

- Reusable Automation Framework
- Page Object Model (POM)
- Reusable Request & Response Specifications
- Environment Configuration using `.env` and GitHub Secrets
- Bearer Token Authentication
- Logging using Log4j2
- Allure Reporting
- JSON Schema Validation
- GitHub Actions CI Pipeline

---

## Project Structure

```text
Repository
├── UI_Final_Assessment
├── API_Final_Assessment
├── .github
│   └── workflows
└── README.md
```


---

## Execution

### UI Automation

```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

### API Automation

```bash
mvn clean test
mvn allure:serve
```

---

## CI/CD

GitHub Actions automatically:

- Builds the API Automation project
- Executes API Automation Tests
- Executes UI Automation Tests
- Uploads Allure Results
- Uploads Playwright Report

---

## Supporting Documents

- Project Documentation
- Allure Report
- Playwright HTML Report
- GitHub Actions Pipeline Screenshot

---

## Author

**Saiteja Kodi**  
**UST ID:** 299172