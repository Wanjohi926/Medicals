describe('Register Page', () => {
  it('registers a new user successfully', () => {
    const randomEmail = `user${Date.now()}@test.com`;

    cy.visit('http://localhost:5173/register');

    cy.get('input[name=first_name]').type('Test');
    cy.get('input[name=last_name]').type('User');
    cy.get('input[name=email]').type(randomEmail);
    cy.get('input[name=password]').type('testpass');

    cy.get('button[type=submit]').click();

  });

  it('shows validation errors for empty fields', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('button[type=submit]').click();

    cy.contains('First name is required').should('exist');
    cy.contains('Last name is required').should('exist');
    cy.contains('Email is required').should('exist');
    cy.contains('Password is required').should('exist');
  });

  it('shows validation error for short password', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('input[name=first_name]').type('Test');
    cy.get('input[name=last_name]').type('User');
    cy.get('input[name=email]').type('shortpass@test.com');
    cy.get('input[name=password]').type('123');

    cy.get('button[type=submit]').click();

    cy.contains('Password must be at least 6 characters').should('exist');
  });
});
