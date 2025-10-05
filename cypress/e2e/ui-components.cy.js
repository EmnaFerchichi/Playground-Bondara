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
it.only('radio buttons', ()=>{
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
it.only('checkboxes', ()=>{
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