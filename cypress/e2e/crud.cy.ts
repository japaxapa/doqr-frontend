import { employee } from "@/types/employee";

// TODO fazer um request ao invés de fazer navegação e type nos before
describe("CRUD de funcionários", () => {
  // TODO checar se os testes são simultaneos e mudar nome para algo com Date
  const mockNewEmployeeData = {
    name: "cypress 1",
    email: "cypress@teste.com",
    cpf: "12345678900",
    phone: "12123451234",
    dateOfBirth: "01012001",
    typeOfHiring: "CLT",
    status: "true",
  };

  describe("criar", () => {
    afterEach(() => {
      cy.request("https://api-testefrontend.qforms.com.br/employees").then(
        (res) => {
          const match = res.body.find(
            (item: any) => item.name === mockNewEmployeeData.name,
          );

          cy.request(
            "DELETE",
            `https://api-testefrontend.qforms.com.br/employees/${match.id}`,
          );
        },
      );
    });
    it("deve criar novo funcionário", () => {
      cy.visit("/");

      let initialCount: number;

      cy.get("table tbody tr")
        .its("length")
        .then((len) => {
          initialCount = len;
        });

      cy.get("#new-employee-btn").click();

      cy.url().should("include", "/edit/new");

      cy.get("#employee-form-name").type(mockNewEmployeeData.name);
      cy.get("#employee-form-email").type(mockNewEmployeeData.email);
      cy.get("#employee-form-cpf").type(mockNewEmployeeData.cpf);
      cy.get("#employee-form-phone").type(mockNewEmployeeData.phone);
      cy.get("#employee-form-dob").type(mockNewEmployeeData.dateOfBirth);
      cy.get("#employee-form-hiring").select(mockNewEmployeeData.typeOfHiring);
      cy.get("#employee-form-status").select(mockNewEmployeeData.status);

      cy.get("#create-employee-btn").click();

      cy.url().should("not.include", "/edit/new");

      cy.get("table tbody tr").should(($tr) => {
        expect($tr.length).to.eq(initialCount + 1);
      });
    });
  });

  describe("update", () => {
    const baseName = mockNewEmployeeData.name + " update";
    before(() => {
      cy.visit("/");
      cy.get("#new-employee-btn").click();

      cy.url().should("include", "/edit/new");

      cy.get("#create-employee-btn").should("exist");

      cy.get("#employee-form-name").type(baseName);
      cy.get("#employee-form-email").type(mockNewEmployeeData.email);
      cy.get("#employee-form-cpf").type(mockNewEmployeeData.cpf);
      cy.get("#employee-form-phone").type(mockNewEmployeeData.phone);
      cy.get("#employee-form-dob").type(mockNewEmployeeData.dateOfBirth);
      cy.get("#employee-form-hiring").select(mockNewEmployeeData.typeOfHiring);
      cy.get("#employee-form-status").select(mockNewEmployeeData.status);

      cy.get("#create-employee-btn").click();

      cy.get("#employees-title-main").should(
        "contain",
        "Controle de Funcionários",
      );
    });

    after(() => {
      cy.request("https://api-testefrontend.qforms.com.br/employees").then(
        (res) => {
          const match = res.body.find((employee: employee) =>
            employee.name.includes("update"),
          );

          cy.request(
            "DELETE",
            `https://api-testefrontend.qforms.com.br/employees/${match.id}`,
          );
        },
      );
    });

    it("deve atualizar informações do funcionário", () => {
      cy.visit("/");

      cy.contains("tr", "update")
        .invoke("index")
        .then((index) => {
          cy.get("table tr")
            .eq(index + 1)
            .within(() => {
              cy.get('[id$="-edit-btn"]').click();
            });
        });

      cy.url().should("include", "/edit/");

      cy.get("#update-employee-btn").should("exist");

      cy.get("#employee-form-name")
        .should("have.value", baseName)
        .clear()
        .type(baseName + " alt");

      cy.get("#employee-form-email")
        .should("have.value", mockNewEmployeeData.email)
        .clear()
        .type(mockNewEmployeeData.email + ".br");

      // TODO checar como fazer sem hardcode
      cy.get("#employee-form-cpf").should("have.value", "123.456.789-00");

      // TODO checar como fazer sem hardcode
      cy.get("#employee-form-phone").should("have.value", "(12) 12345-1234");

      // TODO checar como fazer sem hardcode
      cy.get("#employee-form-dob").should("have.value", "01/01/2001");

      cy.get("#employee-form-hiring")
        .should("have.value", mockNewEmployeeData.typeOfHiring)
        .select("PJ");

      cy.get("#employee-form-status")
        .should("have.value", mockNewEmployeeData.status)
        .select("false");

      cy.get("#update-employee-btn").click();

      cy.contains("tr", "update")
        .invoke("index")
        .then((index) => {
          cy.get("table tr")
            .eq(index + 1)
            .within(() => {
              cy.get('[id$="-name"]').should("contain", baseName + " alt");
              cy.get('[id$="-email"]').should(
                "contain",
                mockNewEmployeeData.email + ".br",
              );
              cy.get('[id$="-hiring"]').should("contain", "PJ");
              cy.get('[id$="-status"]').should("contain", "Inativo");
            });
        });
    });
  });

  describe("delete", () => {
    const baseName = mockNewEmployeeData.name + " delete";
    beforeEach(() => {
      cy.visit("/");
      cy.get("#new-employee-btn").click();

      cy.url().should("include", "/edit/new");

      cy.get("#employee-form-name").type(baseName);
      cy.get("#employee-form-email").type(mockNewEmployeeData.email);
      cy.get("#employee-form-cpf").type(mockNewEmployeeData.cpf);
      cy.get("#employee-form-phone").type(mockNewEmployeeData.phone);
      cy.get("#employee-form-dob").type(mockNewEmployeeData.dateOfBirth);
      cy.get("#employee-form-hiring").select(mockNewEmployeeData.typeOfHiring);
      cy.get("#employee-form-status").select(mockNewEmployeeData.status);

      cy.get("#create-employee-btn").click();

      cy.get("#employees-title-main").should(
        "contain",
        "Controle de Funcionários",
      );
    });

    afterEach(() => {
      cy.request("https://api-testefrontend.qforms.com.br/employees").then(
        (res) => {
          const match = res.body.find((employee: employee) =>
            employee.name.includes("delete"),
          );

          if (match) {
            cy.request(
              "DELETE",
              `https://api-testefrontend.qforms.com.br/employees/${match.id}`,
            );
          }
        },
      );
    });

    it("deve deletar funcionário via botão da tabela", () => {
      cy.visit("/");

      let initialCount: number;

      cy.get("table tbody tr")
        .its("length")
        .then((len) => {
          initialCount = len;
        });

      cy.contains("tr", "delete")
        .invoke("index")
        .then((index) => {
          cy.get("table tr")
            .eq(index + 1)
            .within(() => {
              cy.get('[id$="-delete-btn"]').click();
            });
        });

      cy.contains("tr", "delete").should("not.exist");

      cy.get("table tbody tr").should(($tr) => {
        expect($tr.length).to.eq(initialCount - 1);
      });
    });

    it("deve deletar funcionário via botão do formulário", () => {
      cy.visit("/");

      let initialCount: number;

      cy.get("table tbody tr")
        .its("length")
        .then((len) => {
          initialCount = len;
        });

      cy.contains("tr", "delete")
        .invoke("index")
        .then((index) => {
          cy.get("table tr")
            .eq(index + 1)
            .within(() => {
              cy.get('[id$="-edit-btn"]').click();
            });
        });

      cy.url().should("include", "/edit/");

      cy.get("#delete-employee-btn").click();

      cy.contains("tr", "delete").should("not.exist");

      cy.get("table tbody tr").should(($tr) => {
        expect($tr.length).to.eq(initialCount - 1);
      });
    });
  });
});
