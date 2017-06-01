import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from '../../../components/styled/Spinner';
import { TextField, CheckboxField } from '../Fields';

const IntroductionForm = ({ handleSubmit, login, loading }) => (
  <div style={{ display: 'flex' }}>
    { loading && <Spinner /> }
    <form onSubmit={handleSubmit(login)}>
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
        component={TextField}
      />
      <div style={{ marginTop: 12, display: 'flex' }} className="button">
        <RaisedButton type="submit">Send</RaisedButton>
      </div>
    </form>
  </div>

);

IntroductionForm.propTypes = {
  handleSubmit: PropTypes.func,
  login: PropTypes.func,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'loginForm',  // a unique identifier for this form
})(IntroductionForm);
