export function hasUpperCase(string) {
  let result = false;
  for (let i = 0; i < string.length; i += 1) {
    if (isAlphabetical(string[i]) && string[i] === string[i].toUpperCase()) {
      result = true;
      break;
    }
  }

  return result;
}

export function hasLowerCase(string) {
  let result = false;
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] === string[i].toLowerCase()) {
      result = true;
      break;
    }
  }

  return result;
}

export function isAlphabetical(string) {
  return /^[A-Z]+$/i.test(string);
}
