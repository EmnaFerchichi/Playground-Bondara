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
    //How to combine several attributes as a locator of a specific element
    cy.get('[placeholder="Email"][fullwidth]')
    cy.get('input[placeholder="Email"]')
    //find by data-cy attribute
    cy.get('[data-cy="inputEmail1"]')
})

it("Cypress Locator Method", () => {
    // get() - to to find the elements on the page
    // find() - to find only child elements
    // contains - to find web elements by text
    //cy.contains('sign in', {matchCase: false}) // matchcase : false => to disable the exact match
    cy.contains('[status="warning"]', "Sign in") //locating a button inside a form with contains
    cy.contains('nb-card', "Horizontal form").find('button') //locating a button inside a form with contains+find
    cy.contains('nb-card', 'Horizontal form').get('button')//locating a button inside a form with contains+get


})
it('Child Elements', () => {
    cy.contains('nb-card', 'Using the Grid').find('button')// we find the nb-card where there is "using the grid" and then we find the button
    //OR
    cy.contains('nb-card', 'Using the Grid').find('.row').find('button')// same but more detailed  (.row is the name of the class where the button exixts under a div )
    cy.get('nb-card') //to search for elements under nb-card in the whole page


})

it('Child Elements', () => {
    cy.get('nb-card').find('nb-radio-group').contains('Option 1')
    cy.get('nb-card nb-radio-group').contains('Option 1') //   we can use the parent and the child using space
    // finding child element direct related to parent 
    cy.get('nb-card > nb-card-body')
    
})

//Finding Email : 
it('Finding Email',()=>{
    cy.get('nb-card > nb-card-body [placeholder="Email"]')
})

it('Parent elements',()=>{
  // cy.get('#inputEmail1').parents('form').find('button')//OR
   //cy.contains('Using the Grid').parent().find('button')//OR
  // cy.get('#inputEmail1').parentsUntil('form').find('button') // Error because it stopped before form
   //cy.get('#inputEmail1').parentsUntil('nb-card-body').find('button')
   
})

it('Cypress Chains', ()=>{
cy.get('#inputEmail1')
.parents('form')
.find('button')
.click()
cy.get('#inputEmail1') // we did it again because sometimes when we click on a button it takes us to another page  and DOM changes
.parents('form')
.find('nb-radio')
.first()
.should('have.text','Option 1') 
// => So we started with input field and we traveled up.
//   -Then we found the button.

//    -Then we made a click on this button.

//    -Then we traveled up to the form again.

//    -Then we found all three radio buttons.

//    -We found the first one and made a validation that the first radio button has the option one.
})

it('Reusing Locators',()=>{
    //1. Cypress Alias :
   // cy.get('#inputEmail1').as('inputEmail1')  // save cy.get('#inputEmail1') as 'inputEmail1'
   // cy.get('@inputEmail1').parents('form').find('button') // cy.get('@inputEmail1') : retrieve it
    //cy.get('@inputEmail1').parents('form').find('nb-radio') // retrive again 

    //2. Cypress Then Method  : 

    cy.get('#inputEmail1').then( inputEmail => {
        cy.wrap(inputEmail).parents('form').find('button')
        cy.wrap(inputEmail).parents('form').find('nb-radio')
        cy.wrap('Hello').should('equal', 'Hello')
        cy.wrap(inputEmail).as('inputEmail2')// to retur inputEmail from  then() we use alias
        
    })
    cy.get('@inputEmail2').click()

})

it('Extracting Values', ()=>{
    //1. using a JQuery method
    cy.get('[for="exampleInputEmail1"]').then(label=>{
       const emailLabel = label.text() // extract a web element value
        console.log(emailLabel)
    })
    //2. Using invoke Command
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel=>{
        console.log(emailLabel)
    })
     cy.get('[for="exampleInputEmail1"]').invoke('text').as('emailLabel')
    
     //Invoke(extract) Attribute Value
     cy.get('#exampleInputEmail1').invoke('attr','class').then(classValue=>{ //extract the value of the attribute class of the web element with id "exampleInputEmail1"
        console.log(classValue)
     })//OR
     cy.get('#exampleInputEmail1').should('have.attr','class','input-full-width size-medium status-basic shape-rectangle nb-transition')

     //cy.get('#exampleInputEmail1').invoke('attr','placeholder').then(placeholderValue=>{ //extract the value of the attribute placeholder of the web element with id "exampleInputEmail1"
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

