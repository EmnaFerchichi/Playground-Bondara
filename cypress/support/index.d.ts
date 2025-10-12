declare namespace Cypress {
    interface Chainable{
        /**
         * Command to open Home Page of application
         */
        openHomePage(): Chainable<void>
    }
}