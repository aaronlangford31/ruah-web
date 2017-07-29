import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField, CheckboxField, FileField } from '../Fields';
import BasicForm from '../../styled/BasicForm';

const CreateStoreForm = ({ handleSubmit, invalid, pristine }) => (
  <div>
    <BasicForm style={{ marginBottom: '50px' }} onSubmit={handleSubmit}>
      <h1>Sign-up Form</h1>
      <p style={{ marginBottom: 0 }}>Logo</p>
      <Field
        name="logo"
        type="file"
        label="Logo"
        component={FileField}
      />
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
      <p style={{ marginBottom: 0 }}>Story</p>
      <Field
        name="story"
        type="text"
        label="Story"
        rows={2}
        rowsMax={4}
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
        name="personalCare"
        type="checkbox"
        label="Personal Care &amp; Beauty"
        component={CheckboxField}
      />
      <Field
        name="sportingGoods"
        type="checkbox"
        label="Sporting Goods"
        component={CheckboxField}
      />
      <Field
        name="other"
        type="checkbox"
        label="Other (enter below)"
        component={CheckboxField}
      />
      <Field
        name="otherDetail"
        type="text"
        label="Other"
        multiLine
        component={TextField}
      />
      <div style={{ marginTop: 12, display: 'flex' }} className="button">
        <RaisedButton type="submit" disabled={pristine || invalid}>Submit</RaisedButton>
      </div>
    </BasicForm>
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
