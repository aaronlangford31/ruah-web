import { hasLowerCase, hasUpperCase, isAlphabetical, isValidEmail } from '../../../helpers';

const validate = (values) => {
  const errors = {};

  if (!values.get('storeId')) {
    errors.storeId = 'Please choose a store ID!';
  } else if (values.get('storeId').search(' ') >= 0) {
    errors.storeId = 'Store ID cannot contain spaces';
  }

  if (!values.get('email')) {
    errors.email = 'Required';
  } else if (isValidEmail(values.get('email'))) {
    errors.email = 'Invalid email address';
  }

  if (!values.get('password')) {
    errors.password = 'Required';
  } else if (values.get('password').length < 8) {
    errors.password = 'Must be at least 8 characters long';
  } else if (!hasUpperCase(values.get('password')) || !hasLowerCase(values.get('password'))) {
    errors.password = 'Must contain upper and lower case letters';
  } else if (isAlphabetical(values.get('password'))) {
    errors.password = 'Must contain a number or a symbol';
  }

  if (values.get('password') && values.get('password') !== values.get('password_confirmation')) {
    errors.password_confirmation = 'Please confirm your password';
  }

  return errors;
};

export default validate;
