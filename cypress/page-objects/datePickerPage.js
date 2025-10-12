//Same methof of the DatePicker
function selectDateFromCurrentDay(day) { 
        let date = new Date()// Date courant
        date.setDate(date.getDate() + day)//modifier la date courante en l'ajoutant 5 jours
        let futureDay = date.getDate()//retrieve the day of the current date
        let futureMonthLong = date.toLocaleDateString('en-US', { month: 'long' })// returns the full month name in English
        let futureMonthShort = date.toLocaleDateString('en-US', { month: 'short' })//returns the short version of the  month name in English
        let futureYear = date.getFullYear()//returns the year
        let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}` 

        cy.get('nb-calendar-view-mode').invoke('text').then(calendarMonthAndYear => {
            if (!calendarMonthAndYear.includes(futureMonthLong) || !calendarMonthAndYear.includes(futureYear)) { //if the month in the datepicker or the year 
            // are not matching the updated date then we're gonna select the next month, otherwise  
                cy.get('[data-name="chevron-right"]').click()
                selectDateFromCurrentDay(day) //we call the same function to repeat again until we reach the corrrect month and year
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
            }
        })
        return dateToAssert
    }
class DatePickerPage{

    selectCommonDatepickerDateFromToday(numberOfDaysFromToday){
         cy.get('[placeholder="Form Picker"]').then(input => {
        cy.wrap(input).click()
        const dateToAssert = selectDateFromCurrentDay(numberOfDaysFromToday)
        cy.wrap(input).should('have.value', dateToAssert)
    })
    }

    //Select a range of dates (2 dates) from the second date Picker in the date picker page
    selectRangePickerFromToday(numberOfDaysFromTodayStart,numberOfDaysFromTodayEnd){
        cy.get('[placeholder="Range Picker"]').then(input => {
        cy.wrap(input).click()
        const dateToAssertStart = selectDateFromCurrentDay(numberOfDaysFromTodayStart)
        const dateToAssertEnd = selectDateFromCurrentDay(numberOfDaysFromTodayEnd)
        const finalDate = `${dateToAssertStart} - ${dateToAssertEnd}`
        cy.wrap(input).should('have.value', finalDate)
        

    })


    }
}
export const onDatePickerPage = new DatePickerPage()