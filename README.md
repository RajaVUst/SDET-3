PROJECT OVERVIEW

304556-Kavyashree G

1. Project Overview
This project demonstrates Testing of the chess-agent website.
Base URL: https://chess-agent-83252463.figma.site/

 2.Tools and Technologies used
   VS code
   Playwrite
  Typescript

3.Project setup
*Created project of  Playwright test
*In that directory installed playright using command “npx install playwright@latest”

4.Project Structure
Using Opps concept Created pages and tests packages.
Shopper-stop
1.Pages – AddToCart.ts
             ---PaymentPage.ts
             ---HomePage.ts
            ---CartPage.ts
           ---CheckoutPage.ts
           ---PaymentPageObject.ts

2.Tests – addToCart.spec.ts
             --payment.spec.ts

3.Fixtures-base.ts
              --index.ts

4.Flows-ShoppingFlow.ts

5.src/utils--env.d.ts
               --env.ts
               --Logger.ts

5.OOP Implementation
Object-Oriented Programming concepts were used to improve maintainability.
Used the entire thing in the pages page and called that methods in the test file for the maintainability.

6.Commands used to run the Project
*npx playwright testto run the all test files
*npx playwright test tests/addToCart.spec.ts to run the specific test file
*npx playwright test –headed  to run the test in the headed mode
*npx playwright test –uito run the test in ui mode




