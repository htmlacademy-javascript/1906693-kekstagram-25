const checkStringMaxLength = (stringCheck, maxLength) => {
  if (stringCheck.length > maxLength) {
    return false;
  }
  return true;
};

export { checkStringMaxLength };
