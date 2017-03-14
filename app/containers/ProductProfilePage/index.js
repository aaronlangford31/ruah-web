import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import _ from 'underscore';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProducts } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import Menu from '../../components/partials/Menu';
import Divider from 'material-ui/Divider';
import LabelIcon from 'material-ui/svg-icons/action/label';
import ProductIcon from 'material-ui/svg-icons/action/work';
import DescriptionIcon from 'material-ui/svg-icons/action/description';

class ProductProfilePage extends Component {

  static propTypes = {
    products: PropTypes.array,
    router: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  /* eslint-disable react/no-danger */
  renderProduct() {
    const { router, products } = this.props;
    const product = _.chain(products).filter({ Id: router.params.productId }).first().value() || {};
    return (
      <div>
        <h3><ProductIcon /> Basic Info</h3>
        <p>Product Name: {product.Name}</p>
        <p>SKU: {product.SKU}</p>
        <p>Brand Name: {product.Brand}</p>
        <p>Manufacturer Name: {product.ManufacturerName}</p>
        <Divider />
        <h3><DescriptionIcon /> Description</h3>
        <p>Product Description:
          <span dangerouslySetInnerHTML={{ __html: product.Description }} />
        </p>
        <div>
          Product Features:
          <ul>
            {_.map(product.Bullets, (bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
        <Divider />
        <h3><LabelIcon /> Category Info</h3>
        <p>Product Type: {product.Type}</p>
        <p>Amazon Browse Node: {product.BrowseNode}</p>
        <p>Amazon Tax Code: {product.TaxCategory}</p>
      </div>
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
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 3, marginRight: 24 }}>
              <Menu />
            </div>
            <div style={{ flex: 9 }}>
              {this.renderProduct()}
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductProfilePage);
