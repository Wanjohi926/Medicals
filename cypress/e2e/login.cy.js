describe('Login Page', () => {
  it('logs in with valid credentials', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[name=email]').type('goodlife@gmail.com'); 
    cy.get('input[name=password]').type('12345678'); 
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/dashboard'); 
    cy.contains('Welcome').should('exist'); 
  });

  
  it('navigates to the user dashboard after login', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[name=email]').type('goodlife@gmail.com');
    cy.get('input[name=password]').type('12345678');
    cy.get('button[type=submit]').click();

    cy.contains('Welcome').should('exist');
  });

  it('shows validation errors when fields are empty', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('button[type=submit]').click();

    cy.contains('Email is required').should('exist');
    cy.contains('Password is required').should('exist');
  });

  it('shows error for invalid credentials', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[name=email]').type('wrong@example.com');
    cy.get('input[name=password]').type('wrongpassword');

    cy.get('button[type=submit]').click();

    cy.contains('User not found').should('exist');
  });
});
