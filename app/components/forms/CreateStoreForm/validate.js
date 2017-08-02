const validate = (values) => {
  const errors = {};
  if (!values.get('handle')) {
    errors.handle = 'Don\'t forget your handle!';
  }
  if (!values.get('slogan')) {
    errors.slogan = 'Don\'t forget your slogan!';
  }
  if (!values.get('city')) {
    errors.city = 'Don\'t forget your city!';
  }
  if (!values.get('sovereignty')) {
    errors.sovereignty = 'Required';
  }
  if (!values.get('country')) {
    errors.country = 'Don\'t forget your country!';
  }
  if (!values.get('founded')) {
    errors.founded = 'Don\'t forget year founded!';
  }

  // console.log(values.toJS());

  if (!values.get('accessories')
    && !values.get('electronics')
    && !values.get('food')
    && !values.get('gifts')
    && !values.get('personalCare')
    && !values.get('sportingGoods')
    && !values.get('other')) {
    errors.accessories = 'Please select one of these!';
    errors.electronics = 'Please select one of these!';
    errors.food = 'Please select one of these!';
    errors.gifts = 'Please select one of these!';
    errors.personalCare = 'Please select one of these!';
    errors.sportingGoods = 'Please select one of these!';
    errors.other = 'Please select one of these!';
  } else if (values.get('other') && !values.get('otherDetail')) {
    errors.otherDetail = 'Just need a note here.';
  }

  return errors;
};

export default validate;
