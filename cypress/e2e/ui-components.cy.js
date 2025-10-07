/// <reference types="cypress" />
beforeEach('Open application', () => {
    cy.visit('/')
})

it('input fields',()=>{
cy.contains('Forms').click()
cy.contains('Form Layouts').click()

cy.get('#inputEmail1').type("emna@gmail.com",{delay : 200}).clear() // to type a email address slowly
cy.get('#inputEmail1').type("emna@gmail.com",{delay : 200}).type("Hello").clear() // same but to delete the email you wrote and then type Hello instead a,d then clear again
//cy.contains('nb-card', 'Using the Grid').contains("Email").type('Thouraya@gmail.Com') // incase i didnt find the id of the Email input

//using a cariable inside the email input
const name='Artem'
cy.contains('nb-card', 'Using the Grid').contains("Email").type(`${name}@gmail.com`)
//Sometimes there are values that already exixt in the field before you type in it so we need to make sure that its fully written 
// and then we delete it and type:

//  if i know the value already existing
cy.get('#inputEmail1').should('have.value',`${name}@gmail.com`).clear().type('Thouraya@gmail.Com')//i make sure that the input value is not empty 
// and then i type my value 

//  if i dont know the value already existing : 
cy.get('#inputEmail1').should('not.have.value','').clear().type('Thouraya@gmail.Com') //i make sure that the input value is not empty 
// and then i type my value 

})
//Clicking on enter button (keyboard) instead of login button:

it('Login with Enter Key',()=>{
cy.contains('Auth').click()
cy.contains('Login').click()
cy.get('#input-email').click().type('emna@gmail.com',{delay : 100})
// clicking on TAB (to go to the next input or element)  can help when u dont know the id of the next element:
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
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(allRadioButtons=>{// if the real button is hidden 
    // its classs says "visually hidden"(cypress cant access it so we need to : 
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
// IF the dropdown is a Native HTML Dropdown (with <select> in html code)
    cy.contains('Toastr').click()
    cy.contains('div','Toast type:').find('select').select('info').should('have.value', 'info')//=> find a <div> that has the text "Toast type:" (parent), 
    // .find('select') looks inside that div for a <select>,  select option with text : info
    // if it is Custom Dropdowns (other than select)
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
                cy.wrap(dropdown).click()// to open the list again because after selecting an option the list closes or collapse
        })

    })   

})
//TOOLTIPS : Its a text that appears only when you put the mouse on top of a button and then disappears once the mouse moves out of the button
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


it.only('Web Tables',()=>{
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
 //we can test on many 
 const ages =[20,30,40,200]
 cy.wrap(ages).each(age=>{
    cy.get('[placeholder="Age"]').clear().type(age)
    cy.wait(500)
    cy.get('tbody tr').each(tableRows=>{
         if (age == 200) {cy.wrap(tableRows).should('contain.text', 'No data found')} 
       else{cy.wrap(tableRows).find('td').last().should('have.text',age)} 
        })
    
 })

}) 




