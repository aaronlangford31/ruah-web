/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { submitCreateProduct, removeInvalidSku, removeError as removeErrorAction } from './actions';
import { selectInvalidSku, selectError } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import ProductForm from '../../components/forms/ProductForm';
import ErrorBox from '../App/ErrorBox';

function ProductCreatePage({ loading, createProduct, invalidSku, removeSku, error, removeError }) {
  return (
    <article>
      <Helmet
        title="Create Product"
        meta={[
          { name: 'description', content: 'Create Product Page' },
        ]}
      />
      <H2>Create Product</H2>
      <Body>
        <ProductForm
          createProduct={createProduct}
          loading={loading}
        />
        <ErrorBox error="Invalid SKU" show={!!invalidSku} close={removeSku} />
        <ErrorBox error={error} show={!!error} close={removeError} />
      </Body>
    </article>
  );
}

ProductCreatePage.propTypes = {
  loading: PropTypes.bool,
  createProduct: PropTypes.func,
  removeSku: PropTypes.func,
  removeError: PropTypes.func,
  invalidSku: PropTypes.bool,
  error: PropTypes.bool,
};

ProductCreatePage.contextTypes = {
  router: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    createProduct: () => {
      dispatch(submitCreateProduct());
    },
    removeSku: () => {
      dispatch(removeInvalidSku());
    },
    removeError: () => {
      dispatch(removeErrorAction());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  invalidSku: selectInvalidSku(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductCreatePage);
