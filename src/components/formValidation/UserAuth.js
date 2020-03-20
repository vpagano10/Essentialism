// Check if there are any empty fields
export default function check(form) {
  if (form.username.value == "" || form.username.value == null) {
    alert("Please enter a username.");
    return false;
  }
  if (form.password.value == "" || form.password.value == null) {
    alert("A password is required to log in.");
    return false;
  } else {
    return true;
  }
}

// Validate Username characters on Register
export default function validateUsername(value) {
  // Minimum length of 3, maximum length of 16, must consist of only letters, numbers, or dashes
  const usernameRegex = /^[a-z0-9_-]{3,16}$/gi;
  const isValidUsername = value.match(usernameRegex);
  return isValidUsername
    ? `Hello ${value}!`
    : "Please enter a username using only letters, numbers, and dashes";
}

// Validate Password on Register
export default function validatePassword(value) {
  // Minimum length of 6, at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character
  const passwordRegex = /(?=^.{6,}$)((?=.*\w)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[|!"$%&\/\(\)\?\^\'\\\+\-\*]))^.*/;
  const isValidPassword = value.match(passwordRegex);
  return isValidPassword
    ? "Password Success"
    : "Please enter a password that includes at least 6 characters with one uppercase letter, one lowercase letter, one number, and one special character.";
}
