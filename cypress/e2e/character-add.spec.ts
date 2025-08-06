describe('character add regression', () => {
  it('adds character to sidebar and stage', () => {
    cy.visit('/');
    cy.contains('🎵 Aufgenommen').click();
    cy.get('[data-testid="sprite-line"]').then(($list) => {
      const initial = $list.length;
      cy.contains('🎭 Charaktere').click();
      cy.get('button[data-testid="add-character"]').first().click();
      cy.contains('🎵 Aufgenommen').click();
      cy.get('[data-testid="sprite-line"]').should('have.length', initial + 1);
      cy.get('.avatarSprite').should('have.length', initial + 1);
    });
  });
});
