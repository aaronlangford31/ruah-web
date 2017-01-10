const validate = (values) => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};

  if (!values.get('email')) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address';
  }

  if (!values.get('password')) {
    errors.password = 'Required';
  }

  return errors;
};

export default validate;
