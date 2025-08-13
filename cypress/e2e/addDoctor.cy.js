// describe('Add Doctor Page', () => {
//   it('adds a new doctor successfully', () => {
//     const randomEmail = `doctor${Date.now()}@test.com`;

//     cy.visit('http://localhost:5173/admin/doctors/add');

//     cy.get('input[name=first_name]').type('John');
//     cy.get('input[name=last_name]').type('Doe');
//     cy.get('input[name=email]').type(randomEmail);
//     cy.get('input[name=password]').type('password123');
//     cy.get('input[name=contact_phone]').type('0712345678');
//     cy.get('input[name=specialization]').type('Cardiology');

//     cy.contains('Monday').click();
//     cy.contains('Wednesday').click();
//     cy.contains('Friday').click();

//     cy.get('button[type=submit]').click();

//     cy.url().should('include', '/admin/doctors');
//     cy.contains('Doctors').should('exist');
//   });
// });