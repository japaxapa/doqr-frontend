# 🧑‍💼 CRUD de Funcionários

Aplicação web desenvolvida com **Next.js**, **React 19** e **TypeScript** para gerenciamento de funcionários.

O sistema permite visualizar, criar, editar e validar dados de funcionários com uma interface moderna e componentes reutilizáveis.

---

## 🚀 Tecnologias Utilizadas

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS 4**
* **shadcn/ui** (componentes acessíveis e modernos)
* **React Hook Form** (gerenciamento de formulários)
* **Zod** (validação de dados)
* **Radix UI** (primitivos acessíveis)
* **Lucide Icons** (ícones)
* **clsx + tailwind-merge** (controle de classes)
* **use-mask-input** (máscaras de input)

---

## 📦 Funcionalidades

### 👥 Listagem de Funcionários

* Visualização de todos os funcionários cadastrados
* Interface limpa e organizada
* Preparado para filtros e busca (se aplicável)

### ✏️ Criação e Edição

* Formulário reutilizável para criar ou editar funcionários
* Validação de dados com **Zod**
* Gerenciamento de estado com **React Hook Form**
* Máscaras para inputs (ex: CPF, telefone)

---

## 📁 Estrutura do Projeto (Sugestão)

```
src/
  app/
    page.tsx        # Listagem de funcionários
    edit/
      [id]/
        page.tsx      # Criar / Editar funcionário

  components/
    ui/               # Componentes do shadcn
    commmon/          # Componentes genéricos
    Home/             # Componentes da HomePage
    Form/             # Componentes do formulário

  schemas/
    form.schema.ts

  services/
    employee.service.ts

```

---

## 🛠️ Scripts Disponíveis

```bash
# Rodar ambiente de desenvolvimento
npm run dev

# Build de produção
npm run build

# Rodar aplicação em produção
npm run start

# Lint do projeto
npm run lint
```

---

## ⚙️ Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd fronted
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar o projeto

```bash
npm run dev
```

A aplicação estará disponível em:
👉 http://localhost:3000

---

## 🧠 Padrões Utilizados

* **Separação de responsabilidades**
* **Componentização**
* **Validação centralizada com Zod**
* **Formulários controlados com React Hook Form**
* **Estilização com Tailwind + utilitários inteligentes**

---

## 👨‍💻 Autor

Desenvolvido como projeto de prática para evolução em **frontend moderno**, focando em arquitetura escalável e boas práticas.

---

## 📄 Licença

Este projeto é privado e destinado a fins de estudo.
