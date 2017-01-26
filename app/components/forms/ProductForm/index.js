import React, { PropTypes } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import _ from 'underscore';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import BasicForm from '../../styled/BasicForm';
import Spinner from '../../../components/styled/Spinner';
import { renderField, renderChip } from '../Fields';

const renderFields = (fields) => (
  <div>
    {_.map(fields, (field, i) => (
      <Field key={i} name={field.name} type="text" component={renderField} label={field.label} />
    ))}
  </div>
);

const renderBullets = ({ fields, label }) => (
  <div>
    <div>{label}</div>
    <ul>
      {fields.map((field, i) =>
        <li key={i}>
          <Field
            name={`${field}.value`}
            test="test"
            type="text"
            component={renderField}
            multiLine
          />
          <button
            type="button"
            onClick={() => fields.remove(i)}
          >x
          </button>
        </li>
      )}
    </ul>
    <RaisedButton onClick={() => fields.push({})}>Add</RaisedButton>
  </div>
);

renderBullets.propTypes = {
  label: PropTypes.string,
  fields: PropTypes.object,
};

const basicInfoFields = [
  {
    name: 'Name',
    label: 'Product Name',
  },
  {
    name: 'Id',
    label: 'Product ID',
  },
  {
    name: 'IdType',
    label: 'Product ID Type',
  },
  {
    name: 'SKU',
    label: 'SKU',
  },
  {
    name: 'Brand',
    label: 'Brand Name',
  },
  {
    name: 'ManufacturerName',
    label: 'Manufacturer Name',
  },
  {
    name: 'PackageQuantity',
    label: 'Quantity Per Package',
  },
  {
    name: 'Price',
    label: 'Retail Price',
  },
  {
    name: 'ShippingFee',
    label: 'Domestic Shipping',
  },
  {
    name: 'TBD',
    label: 'Inventory on Hand',
  },
];

const categoryInfoFields = [
  {
    name: 'Type',
    label: 'Product Type',
  },
  {
    name: 'TypeKeyword',
    label: 'Item Type Keyword',
  },
  {
    name: 'TBD',
    label: 'Amazon Browse Node',
  },
  {
    name: 'TBD',
    label: 'Amazon Tax Code',
  },
];

const ProductForm = ({ handleSubmit, createProduct, loading }) => (
  <BasicForm onSubmit={handleSubmit(createProduct)}>
    <Tabs>
      <Tab label={'Basic Product Information'}>
        {renderFields(basicInfoFields)}
      </Tab>
      <Tab label={'Product Description'}>
        <Field name="Description" type="text" component={renderField} label="Product Description" multiLine rows={4} />
        <FieldArray name="Bullets" component={renderBullets} label="Product Features" />
        <Field name="Keywords" component={renderChip} label="Related Keywords" hintText="Type keyword, press enter to add" />
      </Tab>
      <Tab label={'Product Images'}>
        <div>
          <Field name="code" type="text" component={renderField} label="Code" />
        </div>
      </Tab>
      <Tab label={'Variations'} />
      <Tab label={'Category Information'}>
        {renderFields(categoryInfoFields)}
      </Tab>
    </Tabs>
    <div>
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
  form: 'productForm',  // a unique identifier for this form
  initialValues: {
    Bullets: [],
  },
})(ProductForm);
