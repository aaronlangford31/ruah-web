/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { submitCreateProduct } from './actions';
import { selectProducts } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import ProductForm from '../../components/forms/ProductForm';

function ProductCreatePage({ loading, createProduct }) {
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
      </Body>
    </article>
  );
}

ProductCreatePage.propTypes = {
  loading: PropTypes.bool,
  createProduct: PropTypes.func,
};

ProductCreatePage.contextTypes = {
  router: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    createProduct: () => {
      dispatch(submitCreateProduct());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductCreatePage);
