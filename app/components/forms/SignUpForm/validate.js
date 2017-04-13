import { hasLowerCase, hasUpperCase, isAlphabetical } from '../../../helpers';

const validate = (values) => {
  const errors = {};
  if (!values.get('email')) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
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
