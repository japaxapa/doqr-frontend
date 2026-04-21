export const FormatDateToString = (date?: string) => {
  return date ? new Date(date).toLocaleDateString("pt-BR") : "";
};

export function FormatFormDOBtoInput(dob: string) {
  const [day, month, year] = dob.split("/");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    .toISOString()
    .substring(0, 19);
}
