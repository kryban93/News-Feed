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

  it('Renders downloaded news on the list', () => {
    cy.get('[data-testid="news-type-selection"]').select('headlines');
    cy.get('[data-testid="get-news"]').click();
    cy.wait('@fetchHeadlines');
    cy.get('[data-testid="news-element"]')
      .first()
      .find('h2')
      .contains(
        'Miley Cyrus Celebrates Hannah Montana Anniversary With Heartfelt Note to Her Character - E! NEWS'
      );
  });

  it('Renders error alert, if there was an error while fetching news', () => {
    cy.route({
      method: 'GET',
      url: '**/v2/top-headlines*',
      response: [],
      status: 404,
    }).as('fetchHeadlines');
    cy.get('[data-testid="news-type-selection"]').select('headlines');
    cy.get('[data-testid="get-news"]').click();
    cy.wait('@fetchHeadlines');
    cy.get('[data-testid="news-error-alert"]').contains("Couldn't fetch news data.");
  });

  it('Renders image placeholder if no image has been provided for the news', () => {
    cy.fixture('headlinesNoImage.json').as('headlinesNoImage');
    cy.route('GET', '**/v2/top-headlines*', '@headlinesNoImage').as('fetchHeadlines');
    cy.get('[data-testid="news-type-selection"]').select('headlines');
    cy.get('[data-testid="get-news"]').click();
    cy.wait('@fetchHeadlines');
    cy.get('[data-testid="news-img"]')
      .first()
      .should('have.attr', 'src')
      .and('match', /https:\/\/via.placeholder.com/);
  });
});
