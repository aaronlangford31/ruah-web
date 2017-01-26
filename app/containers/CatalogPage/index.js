/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import { getProducts } from './actions';
import { selectProducts } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import CatalogTable from '../../components/styled/CatalogTable';

class CatalogPage extends Component {

  componentDidMount() {
    if (this.props.products.length === 0) {
      this.props.getProducts();
    }
  }

  renderProducts = () => {
    const { products } = this.props;
    return _.map(products, (product, i) => (
      <tr key={i}>
        <td><Link to={`/product/${product.Id}`}>{product.Name}</Link></td>
        <td>
          <div className="image" style={{ backgroundImage: `url(${product.MainImageUri})` }} />
        </td>
        <td>{product.SKU}</td>
        <td>TBD</td>
        <td>{product.Price}</td>
        <td>{product.ShippingFee}</td>
        <td><Link to={`/product/${product.Id}`}>Edit This Product</Link></td>
      </tr>
    ));
  };

  render() {
    return (
      <article>
        <Helmet
          title="Catalog"
          meta={[
            { name: 'description', content: 'Catalog Page' },
          ]}
        />
        <H2>Catalog</H2>
        <Body>
          <CatalogTable>
            <thead>
              <tr>
                <td>Product Name</td>
                <td>Image</td>
                <td>SKU</td>
                <td>Inventory Available</td>
                <td>Retail Price</td>
                <td>Shipping Price</td>
              </tr>
            </thead>
            <tbody>
              {this.renderProducts()}
            </tbody>
          </CatalogTable>
        </Body>
      </article>
    );
  }
}

CatalogPage.propTypes = {
  products: PropTypes.array,
  getProducts: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => {
      dispatch(getProducts());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
