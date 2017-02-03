import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import { TextField, ChipsField, FileField, TextFields, FileFields, BulletFields } from '../Fields';
import { basicInfoFields, categoryInfoFields } from './fields';
import validate from './validate';

const inputStyle = { margin: '0 10px' };

const ProductForm = ({ handleSubmit, createProduct, loading }) => (
  <BasicForm onSubmit={handleSubmit(createProduct)}>
    <Tabs>
      <Tab label={'Basic Info'}>
        {<TextFields fields={basicInfoFields} />}
      </Tab>
      <Tab label={'Description'}>
        <Field name="Description" type="text" component={TextField} label="Product Description*" multiLine rows={4} style={inputStyle} />
        <FieldArray name="Bullets" component={BulletFields} label="Product Features" style={inputStyle} />
        <Field name="Keywords" component={ChipsField} label="Related Keywords" hintText="Type keyword, press enter to add" style={inputStyle} />
      </Tab>
      <Tab label={'Images'}>
        <div>
          <Field name="DefaultImage" type="file" component={FileField} label="Upload" style={Object.assign(inputStyle, { marginTop: 12 })} />
          <FieldArray name="AltImages" component={FileFields} label="Upload" style={inputStyle} />
        </div>
      </Tab>
      <Tab label={'Variations'} />
      <Tab label={'Category Info'}>
        {<TextFields fields={categoryInfoFields} style={inputStyle} />}
      </Tab>
    </Tabs>
    <div style={{ marginTop: 24 }}>
      {!loading ? <RaisedButton type="submit">Create</RaisedButton> : <Spinner />}
    </div>
  </BasicForm>
);

ProductForm.propTypes = {
  handleSubmit: PropTypes.func,
  createProduct: PropTypes.func,
  loading: PropTypes.bool,
};

export default reduxForm({
  form: 'productForm',
  initialValues: fromJS({
    Parentage: 0,
    Keywords: [],
    SKU: '',
    SupplierId: '',
    ManufacturerName: '',
    Name: '',
    Brand: '',
    Description: '',
    Bullets: [''],
    Type: '',
    TypeKeyword: '',
    BrowseNode: '',
    TaxCategory: '',
    AltImageUris: [],
    MainImageUri: '',
    VariationThemeTypes: [],
  }),
  validate,
})(ProductForm);
