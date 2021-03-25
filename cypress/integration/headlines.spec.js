describe('Renders website elements properly', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('headlines.json').as('headlines');
    cy.route('GET', '**/v2/top-headlines*', '@headlines').as('fetchHeadlines');
    cy.visit('http://localhost:3000/');
  });

  it('Selects "headlines" as a type of news to fetch,clicks on "get news" btn and sends request', () => {
    cy.get('[data-testid="news-type-selection"]').select('headlines');
    cy.get('[data-testid="get-news"]').click();
    cy.wait('@fetchHeadlines');
  });
});
