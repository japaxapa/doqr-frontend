describe("search", () => {
  it("deve procurar um funcionário pelo nome", () => {
    cy.visit("/");

    // TODO checar como fazer intercept
    // cy.intercept("https://api-testefrontend.qforms.com.br/employees").as(
    //   "getEmployees",
    // );

    let initialCount: number;

    cy.get("table tbody tr")
      .its("length")
      .then((len) => {
        initialCount = len;
      });

    cy.get("#search-bar").type("doqr");

    cy.get("table tbody tr").should(($tr) => {
      expect($tr.length).to.lessThan(initialCount);
    });
  });
});
