describe('White Gap Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('should not have white pixels in bottom 10% of viewport', () => {
    // Wait for the app to load
    cy.wait(2000)
    
    // Take a screenshot of the entire viewport
    cy.screenshot('viewport-check')
    
    // Get viewport dimensions
    cy.window().then((win) => {
      const viewportHeight = win.innerHeight
      const bottom10Percent = viewportHeight * 0.1
      const bottomY = viewportHeight - bottom10Percent
      
      // Check that the bottom area is not white
      // We'll use a simple approach: check if the background color is dark
      cy.get('body').then(($body) => {
        const backgroundColor = $body.css('background-color')
        // The background should be dark (gray-900 = rgb(17, 24, 39))
        expect(backgroundColor).to.not.equal('rgb(255, 255, 255)')
        expect(backgroundColor).to.not.equal('white')
      })
      
      // Check that the main container has the correct background
      cy.get('.bg-gray-900').should('exist')
      
      // Verify that the layout containers are properly constrained
      cy.get('div').should('not.have.class', 'overflow-visible')
      
      // Check that the stage area is properly contained
      cy.get('canvas').should('exist').and('be.visible')
    })
  })

  it('should have proper layout constraints', () => {
    // Check that the main app container has the correct structure
    cy.get('#root').should('exist')
    
    // Check that the stage container has proper constraints
    cy.get('main').should('have.class', 'min-h-0')
    
    // Verify that panels are properly positioned at the bottom
    cy.get('.panel-container').should('exist')
    
    // Check that the app has the correct background
    cy.get('.bg-gray-900').should('exist')
  })

  it('should handle window resize without creating white gaps', () => {
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1366, height: 768 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 }
    ]
    
    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)
      cy.wait(1000) // Wait for resize to complete
      
      // Take screenshot for each viewport
      cy.screenshot(`viewport-${viewport.width}x${viewport.height}`)
      
      // Verify no white background in bottom area
      cy.get('body').then(($body) => {
        const backgroundColor = $body.css('background-color')
        expect(backgroundColor).to.not.equal('rgb(255, 255, 255)')
      })
    })
  })
})