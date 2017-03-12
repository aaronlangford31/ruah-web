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
import Menu from '../../components/partials/Menu';
import Divider from 'material-ui/Divider';
import { GridList, GridTile } from 'material-ui/GridList';

class ProductProfilePage extends Component {
  /* eslint-disable react/no-danger */
  renderProduct() {
    const { router, products } = this.props;
    const product = _.chain(products).filter({ Id: router.params.productId }).first().value() || {};
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 40, paddingRight: '50px' }}>
          <GridList>
            <GridTile cols={2} rows={2} title="Main Image" titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
              <img src={product.MainImageUri} alt={product.ProductName} />
            </GridTile>
            {_.map(product.AltImageUris, (uri, i) => (
              <GridTile title={`Alternate ${(i + 1)}`} titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                <img src={uri} alt={product.ProducName} />
              </GridTile>
            ))}
          </GridList>
        </div>
        <div style={{ flex: 60 }}>
          <h3>Marketplace Info</h3>
          <Divider />
          <div style={{ display: 'flex' }}>
            <p style={{ flex: 30 }}>Wholesale Price:</p>
            <p style={{ flex: 70 }}>{product.WholesalePrice}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ flex: 30 }}>Shipping Fee:</p>
            <p style={{ flex: 70 }}>{product.ShippingFee}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ flex: 30 }}>Inventory:</p>
            <p style={{ flex: 70 }}>{product.Inventory}</p>
          </div>
          <h3>Basic Info</h3>
          <Divider />
          <div style={{ display: 'flex' }}>
            <p style={{ flex: 30 }}>Product Name:</p>
            <p style={{ flex: 70 }}>{product.ProductName}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ flex: 30 }}>SKU:</p>
            <p style={{ flex: 70 }}>{product.SKU}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ flex: 30 }}>Ruah Id:</p>
            <p style={{ flex: 70 }}>{product.RuahId}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ flex: 30 }}>Brand Name:</p>
            <p style={{ flex: 70 }}>{product.Brand}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ flex: 30 }}>Manufacturer Name:</p>
            <p style={{ flex: 70 }}>{product.ManufacturerName}</p>
          </div>
          <h3>Details</h3>
          <Divider />
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 30 }}>Description:</div>
            <span style={{ flex: 70 }} dangerouslySetInnerHTML={{ __html: product.Description }} />
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 30 }}>Bullets:</div>
            <ul style={{ flex: 70 }}>
              {_.map(product.Bullets, (content, title) => (
                <li>
                  <div>{title}</div>
                  <div>{content}</div>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 30 }}>Keywords:</div>
            <div style={{ flex: 70 }}>{product.Keywords}</div>
          </div>
        </div>
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

ProductProfilePage.propTypes = {
  products: PropTypes.array,
  router: PropTypes.object,
};

ProductProfilePage.contextTypes = {
  router: PropTypes.object,
};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductProfilePage);
