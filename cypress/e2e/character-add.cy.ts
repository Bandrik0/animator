describe('Character Add Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(1000) // Wait for app to load
  })

  it('should add a character when clicking add button', () => {
    // Check initial state
    cy.get('[data-testid="add-character"]').should('exist')
    
    // Get initial character count in recorded tab
    cy.contains('🎵 Aufgenommen').click()
    cy.get('.text-center').should('contain', 'Keine Charaktere vorhanden')
    
    // Go back to characters tab and add a character
    cy.contains('🎭 Charaktere').click()
    cy.get('[data-testid="add-character"]').first().click()
    
    // Should auto-switch to recorded tab and show the new character
    cy.contains('🎵 Aufgenommen').should('have.class', 'bg-white/20')
    cy.get('.text-center').should('not.exist')
    
    // Should have at least one character in the list
    cy.get('[data-testid="sprite-line"]').should('have.length.at.least', 1)
    
    // Character should appear on canvas
    cy.get('canvas').should('exist')
  })

  it('should auto-select newly added character', () => {
    // Add a character
    cy.get('[data-testid="add-character"]').first().click()
    
    // Should switch to recorded tab
    cy.contains('🎵 Aufgenommen').should('have.class', 'bg-white/20')
    
    // The new character should be selected (highlighted)
    cy.get('.ring-2.ring-yellow-400').should('exist')
  })

  it('should show tooltip on character add buttons', () => {
    cy.get('[data-testid="add-character"]').first().should('have.attr', 'title')
    cy.get('[data-testid="add-character"]').first().trigger('mouseover')
  })

  it('should handle multiple character additions', () => {
    // Add first character
    cy.get('[data-testid="add-character"]').first().click()
    cy.wait(500)
    
    // Go back to characters tab
    cy.contains('🎭 Charaktere').click()
    
    // Add second character
    cy.get('[data-testid="add-character"]').eq(1).click()
    cy.wait(500)
    
    // Should have 2 characters in recorded tab
    cy.contains('🎵 Aufgenommen').click()
    cy.get('[data-testid="sprite-line"]').should('have.length', 2)
  })

  it('should work on different screen sizes', () => {
    // Test on mobile
    cy.viewport(375, 667)
    cy.get('[data-testid="add-character"]').first().click()
    cy.get('[data-testid="sprite-line"]').should('have.length.at.least', 1)
    
    // Test on tablet
    cy.viewport(768, 1024)
    cy.contains('🎭 Charaktere').click()
    cy.get('[data-testid="add-character"]').eq(1).click()
    cy.get('[data-testid="sprite-line"]').should('have.length.at.least', 2)
    
    // Test on desktop
    cy.viewport(1440, 900)
    cy.contains('🎭 Charaktere').click()
    cy.get('[data-testid="add-character"]').eq(2).click()
    cy.get('[data-testid="sprite-line"]').should('have.length.at.least', 3)
  })
})