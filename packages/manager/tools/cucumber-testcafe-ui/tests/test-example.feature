@fast @example-tests

Feature: Running Cucumber with TestCafe - test feature example
  As a user of Google
  I should be able to see the Products page
  to learn more about Google


  Scenario: Google's Products page title should contain "Google"
    Given user goes to URL "https://www.google.com/"
    When user clicks linkAbout from test-page-example
    And user clicks "test-page-example"."linkOurProducts"
    Then the title should contain "Google"