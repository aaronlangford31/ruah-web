import React, { PropTypes } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import { renderField, renderChip, renderFileInput, renderFields, renderFileInputs, renderBullets } from '../Fields';
import { basicInfoFields, priceQuantityFields, categoryInfoFields } from './fields';

const ProductForm = ({ handleSubmit, createProduct, loading }) => (
  <BasicForm onSubmit={handleSubmit(createProduct)}>
    <Tabs>
      <Tab label={'Basic Product Information'}>
        {renderFields(basicInfoFields)}
        {renderFields(priceQuantityFields)}
      </Tab>
      <Tab label={'Product Description'}>
        <Field name="Description" type="text" component={renderField} label="Product Description*" multiLine rows={4} />
        <FieldArray name="Bullets" component={renderBullets} label="Product Features*" />
        <Field name="Keywords" component={renderChip} label="Related Keywords" hintText="Type keyword, press enter to add" />
      </Tab>
      <Tab label={'Product Images'}>
        <div>
          <Field name="DefaultImage" type="file" component={renderFileInput} label="Default Image" />
          <FieldArray name="AltImages" component={renderFileInputs} label="Alt Images" />
        </div>
      </Tab>
      <Tab label={'Variations'} />
      <Tab label={'Category Information'}>
        {renderFields(categoryInfoFields)}
      </Tab>
    </Tabs>
    <div style={{ marginTop: 12 }}>
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
  initialValues: {
    Parentage: 0,
    Keywords: [],
    SKU: '',
    SupplierId: '',
    ManufacturerName: '',
    Name: '',
    Brand: '',
    Description: '',
    Bullets: [],
    Type: '',
    TypeKeyword: '',
    BrowseNode: '',
    TaxCategory: '',
    AltImageUris: [],
    MainImageUri: '',
    VariationThemeTypes: [],
  },
})(ProductForm);
