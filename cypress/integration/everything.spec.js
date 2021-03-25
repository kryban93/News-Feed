describe('Renders website elements properly', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('everything.json').as('everything');
    cy.route('GET', '**/v2/everything*', '@everything').as('fetchEverything');
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="news-type-selection"]').select('everything');
  });

  it('Renders "get news" button disabled if no query has been provided', () => {
    cy.get('[data-testid="get-news"]').should('be.disabled');
  });

  it('Selects "everything" as a type of news to fetch,clicks on "get news" btn and sends request', () => {
    cy.get('[data-testid="news-query"]').type('batman');
    cy.get('[data-testid="get-news"]').click();
    cy.wait('@fetchEverything');
  });

  it('Renders downloaded news on the list', () => {
    cy.get('[data-testid="news-query"]').type('batman');
    cy.get('[data-testid="get-news"]').click();
    cy.wait('@fetchEverything');
    cy.get('[data-testid="news-element"]')
      .first()
      .find('h2')
      .contains('Consumer Reports Worried Tesla Could Spy on Customers');
  });

  it('Renders error alert, if there was an error while fetching news', () => {
    cy.route({
      method: 'GET',
      url: '**/v2/everything*',
      response: [],
      status: 404,
    }).as('fetchEverything');
    cy.get('[data-testid="news-type-selection"]').select('everything');
    cy.get('[data-testid="news-query"]').type('batman');
    cy.get('[data-testid="get-news"]').click();
    cy.wait('@fetchEverything');
    cy.get('[data-testid="news-error-alert"]').contains("Couldn't fetch news data.");
  });
});

describe('Selecting everything, choosing date range and typing query', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('everything.json').as('everything');
    cy.route('GET', '**/v2/everything*', '@everything').as('fetchEverything');
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="news-type-selection"]').select('everything');
  });

  it('Renders date range inputs', () => {
    cy.get('[data-testid="news-date-from"]');
    cy.get('[data-testid="news-date-to"]');
  });

  it('Fills date range inputs with dates in the correct format and gets news', () => {
    cy.get('[data-testid="news-query"]').type('batman');
    cy.get('[data-testid="news-date-from"]').type('2021-02-01');
    cy.get('[data-testid="news-date-to"]').type('2021-03-01');
    cy.get('[data-testid="get-news"]').click();
    return cy.wait('@fetchEverything').then((request) => {
      expect(request.url).match(/from=2021-02-01&to=2021-03-01/);
    });
  });

  it('Fills date range inputs with dates in the incorrect format', () => {
    cy.get('[data-testid="news-query"]').type('batman');
    cy.get('[data-testid="news-date-from"]').type('2021.02.01');
    cy.get('[data-testid="news-date-to"]').type('2021.03.01');
    cy.get('[data-testid="get-news"]').click();
    cy.get('[data-testid="news-element"]').should('not.exist');
    cy.get('[data-testid="news-error-alert"]').should('not.exist');
  });

  it('Renders image placeholder if no image has been provided for the news', () => {
    cy.fixture('everythingNoImage.json').as('everythingNoImage');
    cy.route('GET', '**/v2/everything*', '@everythingNoImage').as('fetchEverything');
    cy.get('[data-testid="news-type-selection"]').select('everything');
    cy.get('[data-testid="news-query"]').type('batman');
    cy.get('[data-testid="news-date-from"]').type('2021-02-01');
    cy.get('[data-testid="news-date-to"]').type('2021-03-01');
    cy.get('[data-testid="get-news"]').click();
    cy.wait('@fetchEverything');
    cy.get('[data-testid="news-img"]')
      .first()
      .should('have.attr', 'src')
      .and('match', /https:\/\/via.placeholder.com/);
  });
});
