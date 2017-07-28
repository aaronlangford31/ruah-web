import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField, CheckboxField } from '../Fields';

const CreateStoreForm = ({ handleSubmit, invalid, pristine }) => (
  <div style={{ display: 'flex' }}>
    <form onSubmit={handleSubmit}>
      <h1>Sign-up Form</h1>
      <p style={{ marginBottom: 0 }}>Picture</p>
      {
        // *** Need an upload link here ***
      }
      <p style={{ marginBottom: 0 }}>Handle</p>
      <Field
        name="handle"
        type="text"
        label="Handle"
        component={TextField}
      />
      <p style={{ marginBottom: 0 }}>Slogan</p>
      <Field
        name="slogan"
        type="text"
        label="Slogan"
        component={TextField}
      />
      <p style={{ marginBottom: 0 }}>Location</p>
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
      <p style={{ marginBottom: 0 }}>Year Founded</p>
      <Field
        name="founded"
        type="text"
        label="Founded"
        component={TextField}
      />
      <p>Categories</p>
      <Field
        name="accessories"
        type="checkbox"
        label="Accessories"
        component={CheckboxField}
      />
      <Field
        name="electronics"
        type="checkbox"
        label="Electronics"
        component={CheckboxField}
      />
      <Field
        name="food"
        type="checkbox"
        label="Food"
        component={CheckboxField}
      />
      <Field
        name="gifts"
        type="checkbox"
        label="Gifts"
        component={CheckboxField}
      />
      <Field
        name="personalcare"
        type="checkbox"
        label="Personal Care &amp; Beauty"
        component={CheckboxField}
      />
      <Field
        name="sporting-goods"
        type="checkbox"
        label="Sporting Goods"
        component={CheckboxField}
      />
      <Field
        name="other"
        type="checkbox"
        label="Other (tell us about it below)"
        component={CheckboxField}
      />
      <Field
        name="otherDetail"
        type="text"
        multiLine
        component={TextField}
      />
      <div style={{ marginTop: 12, display: 'flex' }} className="button">
        <RaisedButton type="submit" disabled={pristine || invalid}>Send</RaisedButton>
      </div>
    </form>
  </div>

);

CreateStoreForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
};

export default reduxForm({
  form: 'createStoreForm',  // a unique identifier for this form
  validate,
})(CreateStoreForm);
