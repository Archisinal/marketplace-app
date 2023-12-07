describe('Landing page test', () => {
  it('Visit landing page', () => {
    cy.visit('/');
    cy.contains('Explore now').should('be.visible');
  });
});
