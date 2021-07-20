Feature: TODO's
  In order to achieve my goals
  As a persona
  I want to list all my tasks in TODO's

  Scenario: Creating a todo
    Given I go to pageMain from basic
    When I type "testTodo" in inputTodo from basic
    And I press "enter"
    Then newTodo from basic should be present
