import { formatDate } from "./format-date";

describe("formatDate", () => {
  it("deve formatar a data para o formato 'dd/MM/yyyy' em pt-BR", () => {
    const testDate = new Date("2021-01-01T00:00:00Z");
    const expectedFormattedDate = "01/01/2021";

    const result = formatDate(testDate);

    expect(result).toBe(expectedFormattedDate);
  });

  it("deve formatar corretamente uma data diferente", () => {
    const testDate = new Date("2024-10-26T12:00:00Z");
    const expectedFormattedDate = "26/10/2024";

    const result = formatDate(testDate);

    expect(result).toBe(expectedFormattedDate);
  });
});
