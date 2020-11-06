export function hasAnySpaces(str) {
  const regAnySpaces = /\s/;

  return regAnySpaces.test(str);
}

export function containsLetter(str) {
  const regLetters = /[a-zA-Z]/;

  return regLetters.test(str);
}

export function limitText(field, limitNum = 25) {
  if (field.value.length > limitNum) {
    field.value = field.value.substring(0, limitNum);
  }
}

export function isValidEmail(str) {
  const regLetters = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return regLetters.test(str);
}
