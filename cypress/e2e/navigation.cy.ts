describe("navigation", () => {
  it("deve renderizar a página inicial", () => {
    cy.visit("/");

    cy.get("#employees-title-main").should(
      "contain",
      "Controle de Funcionários",
    );

    cy.get("#employees-title-sub").should("contain", "Empresa DoQR Tecnologia");
  });

  it("deve renderizar a tela de novo funcionário", () => {
    cy.visit("/");

    cy.get("#new-employee-btn").click();

    cy.url().should("include", "/edit/new");

    cy.get("#employee-title-main").should("contain", "Editar Funcionário");

    cy.get("#employee-title-sub").should("contain", "Empresa DoQR Tecnologia");
  });

  it("deve renderizar a página de edição de funcionário", () => {
    cy.visit("/");

    cy.get("#employee-row-0-edit-btn").click();

    cy.url().should("include", "/edit/");

    cy.get("#employee-title-main").should("contain", "Editar Funcionário");

    cy.get("#employee-title-sub").should("contain", "Empresa DoQR Tecnologia");

    cy.get("#employee-form-name").should("not.have.value", "");
    cy.get("#employee-form-email").should("not.have.value", "");
    cy.get("#employee-form-cpf").should("not.have.value", "");
    cy.get("#employee-form-phone").should("not.have.value", "");
    cy.get("#employee-form-dob").should("not.have.value", "");
  });

  it("deve visitar a página de edição e voltar para a inicial", () => {
    cy.visit("/");

    cy.get("#employees-title-main").should(
      "contain",
      "Controle de Funcionários",
    );

    cy.get("#new-employee-btn").click();

    cy.url().should("include", "/edit/new");

    cy.get("#employee-title-main").should("contain", "Editar Funcionário");

    cy.get("#home-btn").click();

    cy.url().should("not.include", "/edit/");

    cy.get("#employees-title-main").should(
      "contain",
      "Controle de Funcionários",
    );
  });
});
