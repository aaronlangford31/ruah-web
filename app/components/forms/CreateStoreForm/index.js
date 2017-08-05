import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField, CheckboxField, FileField } from '../Fields';
import BasicForm from '../../styled/BasicForm';

const CreateStoreForm = ({ handleSubmit, invalid, pristine }) => (
  <div>
    <BasicForm
      style={{ marginBottom: '50px' }}
      onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
    >
      <h1>Set up your store</h1>
      <p style={{ marginBottom: 0 }}>Logo (Please choose a square image)</p>
      <Field
        style={{ width: '50px' }}
        name="logo"
        label="Upload File"
        component={FileField}
      />
      <p style={{ marginBottom: 0 }}>Name</p>
      <div>
        <Field
          name="name"
          type="text"
          label="Name of Store"
          component={TextField}
        />
      </div>
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
        type="number"
        label="Year"
        component={TextField}
        style={{ width: '110px' }}
      />
      <p style={{ marginBottom: 0 }}>Slogan</p>
      <Field
        name="slogan"
        type="text"
        label="Slogan"
        multiLine
        fullWidth
        component={TextField}
      />
      <p style={{ marginBottom: 0 }}>Story</p>
      <Field
        name="story"
        type="text"
        label="Tell the story of your business"
        multiLine
        fullWidth
        component={TextField}
      />
      <p>Categories (What kind of things you buy or sell)</p>
      <Field
        name="accessories"
        type="checkbox"
        label="Clothing & Accessories"
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
        name="pets"
        type="checkbox"
        label="Pet Care & Accessories"
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
      <p>How will you use Ruah? (Choose 1 or 2 of the following)</p>
      <Field
        name="buying"
        type="checkbox"
        label="I will buy product on Ruah"
        component={CheckboxField}
      />
      <Field
        name="selling"
        type="checkbox"
        label="I will sell product on Ruah"
        component={CheckboxField}
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
