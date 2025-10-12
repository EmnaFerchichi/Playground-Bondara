/// <reference types="cypress" />

const { onDatePickerPage } = require("../page-objects/datePickerPage")
const { onFormLyoutsPage } = require("../page-objects/formLayoutsPage")
const { navigateTo } = require("../page-objects/navigationPage")

beforeEach('Open application', () => {
    cy.visit('/')
})

it('navigation test',()=>{
    navigateTo.formLayoutPage()
    navigateTo.datePickerPage()
    navigateTo.toolipPage()
    navigateTo.toastrPage()
})

it.only('test with page object',()=>{
    navigateTo.formLayoutPage()
    onFormLyoutsPage.submitUsingTheGridForm('test@test.com','welcome',1)
    onFormLyoutsPage.submitBasicForm('test@test.com','welcome',true)
    navigateTo.datePickerPage()
    onDatePickerPage.selectCommonDatepickerDateFromToday(5)
    onDatePickerPage.selectRangePickerFromToday(10,50)
    


})