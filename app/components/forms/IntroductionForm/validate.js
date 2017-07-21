const validate = (values) => {
  const errors = {};
  if (!values.get('name')) {
    errors.name = 'Don\'t forget your name!';
  }
  if (!values.get('business')) {
    errors.business = 'Don\'t forget your business!';
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
  if (!values.get('email')) {
    errors.email = 'Don\'t forget your e-mail!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'That doesn\'t look like an email...';
  }

  if (!values.get('websiteChannel')
    && !values.get('onlineChannel')
    && !values.get('affiliateChannel')
    && !values.get('brickChannel')
    && !values.get('otherChannel')) {
    errors.websiteChannel = 'Please select one of these!';
    errors.onlineChannel = 'Please select one of these!';
    errors.affiliateChannel = 'Please select one of these!';
    errors.brickChannel = 'Please select one of these!';
    errors.otherChannel = 'Please select one of these!';
  } else if (values.get('otherChannel') && !values.get('otherChannelDetail')) {
    errors.otherChannelDetail = 'Just need a note here.';
  }

  if (!values.get('homeSourced')
    && !values.get('otherManufacturerSource')
    && !values.get('dropShipSource')
    && !values.get('otherSource')) {
    errors.homeSourced = 'Please select one of these!';
    errors.otherManufacturerSource = 'Please select one of these!';
    errors.dropShipSource = 'Please select one of these!';
    errors.otherSource = 'Please select one of these!';
  } else if (values.get('otherSource') && !values.get('otherSourceDetail')) {
    errors.otherChannelDetail = 'Just need a note here.';
  }

  if (!values.get('adDiscovery')
    && !values.get('friendDiscovery')
    && !values.get('searchDiscovery')
    && !values.get('otherDiscovery')) {
    errors.homeSourced = 'Please select one of these!';
    errors.otherManufacturerSource = 'Please select one of these!';
    errors.dropShipSource = 'Please select one of these!';
    errors.otherSource = 'Please select one of these!';
  } else if (values.get('otherDiscovery') && !values.get('otherDiscoveryDetail')) {
    errors.otherChannelDetail = 'Just need a note here.';
  }

  if (!values.get('interest')) {
    errors.interest = 'Just need a note here.';
  }
  return errors;
};

export default validate;
