/// <reference types="cypress" />
beforeEach('Open application', () => {
    cy.visit('/')
})

it('input fields',()=>{
cy.contains('Forms').click()
cy.contains('Form Layouts').click()

cy.get('#inputEmail1').type("emna@gmail.com",{delay : 200}).clear() 
cy.get('#inputEmail1').type("emna@gmail.com",{delay : 200}).type("Hello").clear() 

const name='Artem'
cy.contains('nb-card', 'Using the Grid').contains("Email").type(`${name}@gmail.com`)


cy.get('#inputEmail1').should('have.value',`${name}@gmail.com`).clear().type('Thouraya@gmail.Com')
cy.get('#inputEmail1').should('not.have.value','').clear().type('Thouraya@gmail.Com') 
})
//Clicking on enter button (keyboard) instead of login button:
it('Login with Enter Key',()=>{
cy.contains('Auth').click()
cy.contains('Login').click()
cy.get('#input-email').click().type('emna@gmail.com',{delay : 100})
.press(Cypress.Keyboard.Keys.TAB)
.press(Cypress.Keyboard.Keys.TAB)
cy.wait(1000)
.focused().type('Welcome{enter}',{delay : 100})
})

//RADIO BUTTONS :
it('radio buttons', ()=>{
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    //Selecting by radio button
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(allRadioButtons=>{
        cy.wrap(allRadioButtons).eq(0).check({force:true}).should('be.checked')
        cy.wrap(allRadioButtons).eq(1).check({force:true})
        cy.wrap(allRadioButtons).eq(0).should('not.be.checked')
        cy.wrap(allRadioButtons).eq(2).should('be.disabled')
    //Selecting by the name or label of the radio button:
    cy.contains('nb-card', 'Using the Grid').contains('Option 1').click({force:true})
    })
})

//CHECKBOXES :
it('checkboxes', ()=>{
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()
    cy.get('[type="checkbox"]').check({force:true}) // to ckeck all of the checkboxes
    cy.get('[type="checkbox"]').uncheck({force:true}) // to unckeck all of the checkboxes
    cy.get('[type="checkbox"]').should('be.checked')
})

//LISTS AND DROPDOWNS
it('checkboxes', ()=>{
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()
    cy.contains('div','Toast type:').find('select').select('info').should('have.value', 'info') 
    cy.contains('div','Position:').find('nb-select').click()
    cy.get('.option-list').contains('bottom-right').click()
    //cy.get('body > ngx-app > ngx-pages > ngx-one-column-layout > nb-layout > div.scrollable-container > div > div > div > div > nb-layout-column > ngx-modal-overlays > ngx-toastr > nb-card > nb-card-body > div > div:nth-child(1) > div:nth-child(1) > nb-select > button').click()
    cy.contains('div','Position:').find('nb-select').should('have.text','bottom-right')
//to select every single option of the list in one go
    cy.contains('div','Position:').find('nb-select').then(dropdown=>{
        cy.wrap(dropdown).click()// to open the list
        cy.get('.option-list nb-option').each((option, index, list) =>{
            cy.wrap(option).click()// to select option 
            if(index<list.length-1)
                cy.wrap(dropdown).click()
        })
    })   
})
//TOOLTIPS 
it('tooltips',()=>{
 cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()
    cy.contains('button','Top').trigger('mouseenter')
    cy.get('nb-tooltip').should('have.text','This is a tooltip')
})
//DIALOG BOXES
it('dialog boxes',()=>{
 cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //Browser confirm popup:
        cy.get('.nb-trash').first().click() 
        cy.on('window:confirm', confirm=>{    //Option 1 to confirm the delete
        expect(confirm).to.equal('Are you sure you want to delete?')})

    //OR
    //cy.window().then(win=>{
      //  cy.stub(win,'confirm').as('dialogBox').returns(true)
    //})
    //cy.get('.nb-trash').first().click()
    //cy.get('@dialogBox').should('be.calledWith','Are you sure you want to delete?')
    //})


    //Browser Cancel Popup : 
    cy.get('.nb-trash').first().click()  // Click the delete button

    cy.on('window:confirm', confirmText => {
    expect(confirmText).to.equal('Are you sure you want to delete?')
    return false})  // <- this clicks CANCEL
   
    //OR
    //cy.window().then(win=>{
      //  cy.stub(win,'confirm').as('dialogBox').returns(false)
    //})
    //cy.get('.nb-trash').first().click()
    //cy.get('@dialogBox').should('be.calledWith','Are you sure you want to delete?')
})

// TABLES
it('Web Tables',()=>{
 cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
    //1. Finding a specific Row by text
    cy.get('tbody').contains('tr','Larry').then(tableRow=>{
        cy.wrap(tableRow).find('.nb-edit').click()
         cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
         cy.wrap(tableRow).find('.nb-checkmark').click()
         //validation:
         cy.wrap(tableRow).find('td').last().should('have.text','35')
    })
    //2. Finding a specific Row by Index
    cy.get('.nb-plus').click()
    cy.get('thead tr').eq(2).then(tableRow=>{
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')
        cy.wrap(tableRow).find('.nb-checkmark').click()
    })
    //Validation :
    cy.get('tbody tr').first().find('td').then(tableColumns=>{
        cy.wrap(tableColumns).eq(2).should('have.text','John') //
        cy.wrap(tableColumns).eq(3).should('have.text','Smith')
    })

    //3. Looping through the rows
//cy.get('[placeholder="Age"]').type(20)
//cy.wait(500)
//cy.get('tbody tr').each(tableRows=>{
  //  cy.wrap(tableRows).find('td').last().should('have.text',20)
//})

 // instead of typing a specific number like 20
 //we can test on many values at once :
 const ages =[20,30,40,200]
 cy.wrap(ages).each(age=>{ // for each number of the table ages
    cy.get('[placeholder="Age"]').clear().type(age)// we need to clear before everytime we type 
    cy.wait(500)
    cy.get('tbody tr').each(tableRows=>{     //for each row 
       if (age == 200) {cy.wrap(tableRows).should('contain.text', 'No data found')} 
       else{cy.wrap(tableRows).find('td').last().should('have.text',age)} 
        })
    })
}) 


//DATE PICKER
it('datepickers',()=>{   

     cy.contains('Forms').click()
    cy.contains('Datepicker').click()



    function selectDateFromCurrentDay(day) {
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonthLong = date.toLocaleDateString('en-US', { month: 'long' })
        let futureMonthShort = date.toLocaleDateString('en-US', { month: 'short' })
        let futureYear = date.getFullYear()
        let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}` 

        cy.get('nb-calendar-view-mode').invoke('text').then(calendarMonthAndYear => {
            if (!calendarMonthAndYear.includes(futureMonthLong) || !calendarMonthAndYear.includes(futureYear)) {
                cy.get('[data-name="chevron-right"]').click()
                selectDateFromCurrentDay(day) 
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
            }
        })
        return dateToAssert
    }



    cy.get('[placeholder="Form Picker"]').then(input => {
        cy.wrap(input).click()
        const dateToAssert = selectDateFromCurrentDay(400)
        cy.wrap(input).should('have.value', dateToAssert)
    })
    
})


// Sliders : 
it.only('SLIDERS',()=>{
    cy.get('[tabtitle="Temperature"] circle')
    .invoke('attr', 'cy','42.34') 
    .invoke('attr', 'cx','52.64')
    .click()
    cy.get('[class="value temperature h1"]').should('contain.text','18')

})

//DRAG AND DROP :
it('DRAG AND DROP',()=>{
    cy.contains('Extra Components').click()
    cy.contains('Drag & Drop').click()
    cy.get('#todo-list div').first().trigger('dragstart') 
    cy.get('#drop-list').trigger('drop')
})


it('iFRAMES',()=>{

    cy.contains('Modal & Overlays').click()
    cy.contains('Dialog').click()
    cy.frameLoaded('[data-cy="esc-close-iframe"]') 
    //OPtion 1
    cy.iframe('[data-cy="esc-close-iframe"]').contains('Open Dialog with esc close').click()
    cy.contains('Dismiss Dialog').click()
    //OR
    cy.enter('[data-cy="esc-close-iframe"]').then( getBody => {
        getBody().contains('Open Dialog with esc close').click()
        cy.contains('Dismiss Dialog').click()
        getBody().contains('Open Dialog without esc close').click()
        cy.contains('OK').click()
    })

})
