import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField, CheckboxField } from '../Fields';

const IntroductionForm = ({ handleSubmit, invalid, pristine }) => (
  <div style={{ display: 'flex' }}>
    <form onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: 0 }}>What do your friends call you?</h3>
      <Field
        name="name"
        type="text"
        label="Name"
        component={TextField}
      />
      <h3 style={{ marginBottom: 0 }}>What is the name of your business?</h3>
      <Field
        name="business"
        type="text"
        label="Business Name"
        component={TextField}
      />
      <h3 style={{ marginBottom: 0 }}>Where are you located?</h3>
      <div>
        <Field
          name="city"
          type="text"
          label="City"
          style={{ paddingRight: '10px' }}
          component={TextField}
        />
        <Field
          name="sovereignty"
          type="text"
          label="State/Province"
          style={{ width: '110px', paddingLeft: '10px' }}
          component={TextField}
        />
      </div>
      <Field
        name="country"
        type="text"
        label="Country"
        component={TextField}
      />
      <h3 style={{ marginBottom: 0 }}>What is the best e-mail to reach you at?</h3>
      <Field
        name="email"
        type="email"
        label="E-mail"
        component={TextField}
      />
      <h3 style={{ marginBottom: 0 }}>What is the best phone number to reach you at?</h3>
      <Field
        name="phone"
        type="text"
        label="Phone Number"
        component={TextField}
      />
      <h3>Where do you currently sell things?</h3>
      <Field
        name="websiteChannel"
        type="checkbox"
        label="On my website"
        component={CheckboxField}
      />
      <Field
        name="onlineChannel"
        type="checkbox"
        label="Online retail channels (Amazon, Etsy, etc.)"
        component={CheckboxField}
      />
      <Field
        name="affiliateChannel"
        type="checkbox"
        label="To other business affiliates"
        component={CheckboxField}
      />
      <Field
        name="brickChannel"
        type="checkbox"
        label="In my brick and mortar store"
        component={CheckboxField}
      />
      <Field
        name="otherChannel"
        type="checkbox"
        label="Other (tell us about it below)"
        component={CheckboxField}
      />
      <Field
        name="otherChannelDetail"
        type="text"
        multiLine
        component={TextField}
      />
      <br />
      <h3>Where do you get your product from?</h3>
      <Field
        name="homeSourced"
        type="checkbox"
        label="I manufacture my product"
        component={CheckboxField}
      />
      <Field
        name="otherManufacturerSource"
        type="checkbox"
        label="Other manufacturers"
        component={CheckboxField}
      />
      <Field
        name="dropShipSource"
        type="checkbox"
        label="I drop-ship from other businesses"
        component={CheckboxField}
      />
      <Field
        name="otherSource"
        type="checkbox"
        label="Other (tell us about it below)"
        component={CheckboxField}
      />
      <Field
        name="otherSourceDetail"
        type="text"
        multiLine
        component={TextField}
      />
      <h3>How did you hear about Ruah?</h3>
      <Field
        name="adDiscovery"
        type="checkbox"
        label="I saw an ad"
        component={CheckboxField}
      />
      <Field
        name="friendDiscovery"
        type="checkbox"
        label="A friend told me about it"
        component={CheckboxField}
      />
      <Field
        name="searchDiscovery"
        type="checkbox"
        label="It came up in an online search"
        component={CheckboxField}
      />
      <Field
        name="otherDiscovery"
        type="checkbox"
        label="Other (tell us about it below)"
        component={CheckboxField}
      />
      <Field
        name="otherDiscoveryDetail"
        type="text"
        component={TextField}
      />
      <h3>Why are you interested in joining Ruah?</h3>
      <Field
        name="interest"
        type="text"
        label="A thought or two will do"
        multiLine
        component={TextField}
      />
      <div style={{ marginTop: 12, display: 'flex' }} className="button">
        <RaisedButton type="submit" disabled={pristine || invalid}>Send</RaisedButton>
      </div>
    </form>
  </div>

);

IntroductionForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
};

export default reduxForm({
  form: 'introductionForm',  // a unique identifier for this form
  validate,
})(IntroductionForm);
