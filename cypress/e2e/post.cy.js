
describe("Post Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders post component", () => {
    const post = {
      id: 1,
      title: "Lorem Ipsum",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac fermentum lorem.",
    };
    cy.get('[data-testid="post"]').should("exist");
    cy.get('[data-testid="post"] h6')
      .eq(0)
      .should("have.text", `id: ${post.id}`);

  });
});
