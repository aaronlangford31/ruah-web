import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import _ from 'underscore';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { GridList, GridTile } from 'material-ui/GridList';
import { createStructuredSelector } from 'reselect';
import { selectProducts } from './selectors';
import * as Actions from './actions';
import getStyles from './styles';
import Body from '../../components/styled/Body';
import Menu from '../../components/partials/Menu';
import UpdateInventoryForm from '../../components/forms/UpdateInventoryForm';

class ProductProfilePage extends Component {

  static propTypes = {
    products: PropTypes.array,
    router: PropTypes.object,
    updateInventory: PropTypes.func,
  };

  static contextTypes = {
    router: PropTypes.object,
    theme: PropTypes.object,
  };

  /* eslint-disable react/no-danger */
  renderProduct() {
    const { router, products, updateInventory } = this.props;
    const { theme } = this.context;
    const styles = getStyles();
    const product = _.chain(products).filter({ Id: router.params.productId }).first().value() || {};
    return (
      <div>
        <div>
          <div style={styles.horizontalDiv}>
            <div style={styles.imageColumn}>
              <div
                style={product.MainImageUri ? {
                  ...styles.productImage,
                  backgroundImage: `url(${product.MainImageUri})`,
                } : styles.productImageEmpty}
              />
            </div>
            <div>
              <h2>
                {product.ProductName}
              </h2>
              <div style={styles.tinyId}>
                SKU: {product.SKU}
              </div>
              <div style={styles.tinyId}>
                RUAH-ID: {product.RuahId}
              </div>
            </div>
            <div>{product.VariationGroupId}</div>
          </div>
          <Tabs>
            <Tab label="Marketplace Info">
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>Wholesale Price:</p>
                <p style={{ flex: 70 }}>${product.WholesalePrice.toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>Shipping Fee:</p>
                <p style={{ flex: 70 }}>${product.ShippingFee.toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>Inventory Available:</p>
                <div style={{ flex: 70, ...theme.getIn(['spacing', 'paragaph']) }}>
                  <UpdateInventoryForm
                    initialValues={{ Inventory: product.Inventory, RuahId: product.RuahId }}
                    updateInventory={updateInventory}
                  />
                </div>
              </div>
            </Tab>
            <Tab label="Global Attributes">
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
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 30 }}>Description:</div>
                <span style={{ flex: 70 }} dangerouslySetInnerHTML={{ __html: product.Description }} />
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 30 }}>Bullets:</div>
                <ul style={{ flex: 70 }}>
                  {_.map(product.Bullets, (content, title) => (
                    <li key={title}>
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
            </Tab>
            <Tab label="Media">
              <div style={{ display: 'flex' }}>
                <GridList style={{ flex: 50 }}>
                  <GridTile cols={2} rows={2} title="Main Image" titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                    <img src={product.MainImageUri} alt={product.ProductName} />
                  </GridTile>
                </GridList>
                <GridList style={{ flex: 50 }}>
                  {_.map(product.AltImageUris, (uri, i) => (
                    <GridTile key={i} title={`Alternate ${(i + 1)}`} titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                      <img src={uri} alt={product.ProducName} />
                    </GridTile>
                  ))}
                </GridList>
              </div>
            </Tab>
          </Tabs>
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
        <Body>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 2, marginRight: 24 }}>
              <Menu />
            </div>
            <div style={{ flex: 10 }}>
              {this.renderProduct()}
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    updateInventory: (payload) => {
      dispatch(Actions.updateInventory(payload));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductProfilePage);
