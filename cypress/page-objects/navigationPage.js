//To check if   when we click on one of the menu items, that the item is expended or not, if its not expended we click on it 
function selectGroupMenuItem(groupItemName){
    cy.contains('a',groupItemName).invoke('attr','aria-expanded').then(attr=>{
        if(attr.includes('false')){
            cy.contains('a',groupItemName).click()

        }
    })
}


class NavigationPage{

    formLayoutPage(){
        selectGroupMenuItem('Forms')
        cy.contains('Form Layouts').click()
    }

    datePickerPage(){
         selectGroupMenuItem('Forms')
         cy.contains('Datepicker').click()
    }

    toastrPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }
    toolipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }
      
}
export const navigateTo = new NavigationPage()
