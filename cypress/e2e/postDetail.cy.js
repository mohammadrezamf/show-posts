describe("PostDetail component", () => {
  it("loads successfully with correct title and body", () => {
    cy.visit("/postDetail/1"); // change the URL to match your local environment

    cy.get("h2")
      .eq(1)
      .should("contain", "sunt aut facere repellat provident occaecati")
      .should("have.class", "text-gray-900");

    cy.get("p").should("contain", "quia et suscipit\nsuscipit");
  });

  it("redirects back to home page when 'Back to Home' button is clicked", () => {
    cy.visit("/postDetail/1"); // change the URL to match your local environment

    cy.get("button").contains("Back to Home").click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
