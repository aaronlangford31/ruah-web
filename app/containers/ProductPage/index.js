/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import _ from 'underscore';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProducts } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';

class ProductPage extends Component {

  renderProduct() {
    const { router, products } = this.props;
    const product = _.chain(products).filter({ Id: router.params.productId }).first().value() || {};
    return (
      <div>{product.Name}</div>
    );
  }

  render() {
    return (
      <article>
        <Helmet
          title="Product"
          meta={[
            { name: 'description', content: 'Product Page' },
          ]}
        />
        <H2>Product</H2>
        <Body>
          {this.renderProduct()}
        </Body>
      </article>
    );
  }
}

ProductPage.propTypes = {
  products: PropTypes.array,
  router: PropTypes.object,
};

ProductPage.contextTypes = {
  router: PropTypes.object,
};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
