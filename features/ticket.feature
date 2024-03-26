Feature: Ticket booking tests
    Scenario: One ticket reservation
        Given user is on page "/index.php"
        When user selects a date 
        When user selects a time
        When user selects a seat1
        When user click the register button
        Then user goes to the page "/payment.php"

    Scenario:
        Given user is on page "/index.php"
        When user selects a date
        When user selects a time
        When user selects a seat1
        When user selects a seat2
        When user click the register button
        Then user goes to the page "/payment.php"

    Scenario:
        Given user is on page "/index.php"
        When user selects a date
        When user selects a time
        When user click on the reserved seat
        Then user sees the register button disabled
