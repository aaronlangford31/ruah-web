import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as ProductCreateActions from './actions';
import { selectInvalidSku, selectError } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import ProductForm from '../../components/forms/ProductForm';
import ErrorBox from '../App/ErrorBox';
import Menu from '../../components/partials/Menu';

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
        <div style={{ display: 'flex' }}>
          <div>
            <Menu />
          </div>
          <div style={{ flex: 9 }}>
            <ProductForm
              createProduct={createProduct}
              loading={loading}
            />
          </div>
        </div>
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
  error: PropTypes.any,
};

ProductCreatePage.contextTypes = {
  router: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    createProduct: (values) => {
      dispatch(ProductCreateActions.createProduct(values));
    },
    removeSku: () => {
      dispatch(ProductCreateActions.removeInvalidSku());
    },
    removeError: () => {
      dispatch(ProductCreateActions.removeError());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  invalidSku: selectInvalidSku(),
  error: selectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreatePage);
