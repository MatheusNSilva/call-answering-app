export const integersInputValidation = (value) => {
  console.log("integersInputValidation", value);
  const numberValue = value.replace(/\D/g, "");

  const validNumber = numberValue.replace(/^0+/, "");

  return validNumber === "" ? "" : Number(validNumber);
};
