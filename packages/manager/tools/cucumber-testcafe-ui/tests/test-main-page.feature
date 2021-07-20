# tests/test-main-page.feature

Feature: My portal main page tests
  As a user of My portal
  I should be able to use main page
  to log in

  Scenario: Open the main page, page title should be present
    Given user goes to URL "http://myportal.test/login.html"
    Then the title should be "Test1 main page"

  Scenario: Products link should lead to Products page
    Given user goes to pageMain from main-page
    When user clicks linkProducts from main-page
    Then URL should contain "/products"
    And the title should contain "Test1 Products"

  Scenario: Log in, link with username and status should be present
    Given user goes to pageMain from main-page
    When user types "mytestuser" in inputLogin from main-page
    And user types "mytestpassword" in inputPassword from main-page
    And user clicks buttonLogin from main-page
    Then linkUsernameLoggedIn from main-page should be present
