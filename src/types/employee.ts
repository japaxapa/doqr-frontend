export type employee = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  dateOfBith: string;
  typeOfHiring: string;
  status: boolean;
};

export const emptyEmployee = {
  id: 0,
  name: "",
  email: "",
  cpf: "",
  phone: "",
  dateOfBith: "",
  typeOfHiring: "",
  status: false,
};
