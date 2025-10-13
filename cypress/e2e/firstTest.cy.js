/// <reference types="cypress" />
require('cypress-xpath')


beforeEach('Open application', () => {
    cy.visit('/')
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()
})

it('Hello World 1', () => {
    //locating by tag 
    cy.get('input')
    //Locating By ID
    cy.get('#inputEmail1')
    //Locating by Class
    cy.get('.input-full-width')
    //Locating by attribute 
    cy.get('[fullwidth]')
    // Locating by attribute with value
    cy.get('[placeholder="Email"]')
    //Locating by Entire class value
    cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
    cy.get('[placeholder="Email"][fullwidth]')
    cy.get('input[placeholder="Email"]')
    //find by data-cy attribute
    cy.get('[data-cy="inputEmail1"]')
})

it("Cypress Locator Method", () => {
    // get() - to to find the elements on the page
    // find() - to find only child elements
    // contains - to find web elements by text
    //cy.contains('sign in', {matchCase: false})
    cy.contains('[status="warning"]', "Sign in")
    cy.contains('nb-card', "Horizontal form").find('button') 
    cy.contains('nb-card', 'Horizontal form').get('button')


})
it('Child Elements', () => {
    cy.contains('nb-card', 'Using the Grid').find('button')
    //OR
    cy.contains('nb-card', 'Using the Grid').find('.row').find('button')
    cy.get('nb-card')


})

it('Child Elements', () => {
    cy.get('nb-card').find('nb-radio-group').contains('Option 1')
    cy.get('nb-card nb-radio-group').contains('Option 1') 
    cy.get('nb-card > nb-card-body')
    
})

//Finding Email : 
it('Finding Email',()=>{
    cy.get('nb-card > nb-card-body [placeholder="Email"]')
})

it('Parent elements',()=>{
  // cy.get('#inputEmail1').parents('form').find('button')//OR
   //cy.contains('Using the Grid').parent().find('button')//OR
  // cy.get('#inputEmail1').parentsUntil('form').find('button')
   //cy.get('#inputEmail1').parentsUntil('nb-card-body').find('button')
   
})

it('Cypress Chains', ()=>{
cy.get('#inputEmail1')
.parents('form')
.find('button')
.click()
cy.get('#inputEmail1') 
.parents('form')
.find('nb-radio')
.first()
.should('have.text','Option 1') 

it('Reusing Locators',()=>{
    //1. Cypress Alias :
   // cy.get('#inputEmail1').as('inputEmail1')  // save cy.get('#inputEmail1') as 'inputEmail1'
   // cy.get('@inputEmail1').parents('form').find('button') 
    //cy.get('@inputEmail1').parents('form').find('nb-radio')

    //2. Cypress Then Method  : 

    cy.get('#inputEmail1').then( inputEmail => {
        cy.wrap(inputEmail).parents('form').find('button')
        cy.wrap(inputEmail).parents('form').find('nb-radio')
        cy.wrap('Hello').should('equal', 'Hello')
        cy.wrap(inputEmail).as('inputEmail2')
    })
    cy.get('@inputEmail2').click()

})

it('Extracting Values', ()=>{
    //1. using a JQuery method
    cy.get('[for="exampleInputEmail1"]').then(label=>{
       const emailLabel = label.text() 
        console.log(emailLabel)
    })
    //2. Using invoke Command
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel=>{
        console.log(emailLabel)
    })
     cy.get('[for="exampleInputEmail1"]').invoke('text').as('emailLabel')
    
     //Invoke(extract) Attribute Value
     cy.get('#exampleInputEmail1').invoke('attr','class').then(classValue=>{ 
        console.log(classValue)
     })//OR
     cy.get('#exampleInputEmail1').should('have.attr','class','input-full-width size-medium status-basic shape-rectangle nb-transition')

     //cy.get('#exampleInputEmail1').invoke('attr','placeholder').then(placeholderValue=>{ 
    //   console.log(placeholderValue)
     //})
     //Invoke(extract) input Field Value
     cy.get('#exampleInputEmail1').type('Emna@gmail.com')
     cy.get('#exampleInputEmail1').invoke('prop', 'value').then(value=>{
        console.log(value)
     })
     


})

it.only('Assertions',()=>{
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address') 
        //OR
        cy.get('[for="exampleInputEmail1"').then(label=>{
            expect(label).to.contain('Email address')
        })
        //For exact match not just "contain":
        cy.get('[for="exampleInputEmail1"]').should('have.text','Email address') 
        //OR
        cy.get('[for="exampleInputEmail1"').then(label=>{
            expect(label).to.have.text('Email address')
        })//OR
         cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel=>{
        expect(emailLabel).to.equal('Email address')
        cy.wrap(emailLabel).should('equal', 'Email address')
    })

     })
