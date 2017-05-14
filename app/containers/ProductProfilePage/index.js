import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import _ from 'underscore';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { GridList, GridTile } from 'material-ui/GridList';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentProduct,
  selectLoading,
  selectNotFound,
} from './selectors';
import {
  updateInventory,
  getProductById,
} from './actions';
import getStyles from './styles';
import Body from '../../components/styled/Body';
import Menu from '../../components/partials/Menu';
import UpdateInventoryForm from '../../components/forms/UpdateInventoryForm';
import SadFaceIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

class ProductProfilePage extends Component {
  constructor(props) {
    super(props);
    this.props.getProductById(this.props.router.params.productId);
  }

  renderLoading() {
    return (
      <div style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </div>
    );
  }
  renderNotFound() {
    return (
      <div>
        <div style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
          <SadFaceIcon style={{ height: '50px', width: '50px', color: '#F7E967' }} />
          <h2> Dang! </h2>
          <p>We could not find what you were looking for.</p>
        </div>
      </div>
    );
  }
  /* eslint-disable react/no-danger */
  renderProduct() {
    const { handleUpdateInventoryForm } = this.props;
    const { theme } = this.context;
    const styles = getStyles();
    return (
      <div>
        <div>
          <div style={styles.horizontalDiv}>
            <div style={styles.imageColumn}>
              <div
                style={this.props.product.MainImageUri ? {
                  ...styles.productImage,
                  backgroundImage: `url(${this.props.product.MainImageUri})`,
                } : styles.productImageEmpty}
              />
            </div>
            <div>
              <h2>
                {this.props.product.ProductName}
              </h2>
              <div style={styles.tinyId}>
                SKU: {this.props.product.SKU}
              </div>
              <div style={styles.tinyId}>
                RUAH-ID: {this.props.product.RuahId}
              </div>
            </div>
            <div>{this.props.product.VariationGroupId}</div>
          </div>
          <Tabs>
            <Tab label="Marketplace Info">
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>Wholesale Price:</p>
                <p style={{ flex: 70 }}>${this.props.product.WholesalePrice.toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>Shipping Fee:</p>
                <p style={{ flex: 70 }}>${this.props.product.ShippingFee.toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>Inventory Available:</p>
                <div style={{ flex: 70, ...theme.getIn(['spacing', 'paragaph']) }}>
                  <UpdateInventoryForm
                    initialValues={{ Inventory: this.props.product.Inventory, RuahId: this.props.product.RuahId }}
                    updateInventory={handleUpdateInventoryForm}
                  />
                </div>
              </div>
            </Tab>
            <Tab label="Global Attributes">
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>Product Name:</p>
                <p style={{ flex: 70 }}>{this.props.product.ProductName}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>SKU:</p>
                <p style={{ flex: 70 }}>{this.props.product.SKU}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>Ruah Id:</p>
                <p style={{ flex: 70 }}>{this.props.product.RuahId}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>Brand Name:</p>
                <p style={{ flex: 70 }}>{this.props.product.Brand}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ flex: 30 }}>Manufacturer Name:</p>
                <p style={{ flex: 70 }}>{this.props.product.ManufacturerName}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 30 }}>Description:</div>
                <span style={{ flex: 70 }} dangerouslySetInnerHTML={{ __html: this.props.product.Description }} />
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 30 }}>Bullets:</div>
                <ul style={{ flex: 70 }}>
                  {_.map(this.props.product.Bullets, (content, title) => (
                    <li key={title}>
                      <div>{title}</div>
                      <div>{content}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 30 }}>Keywords:</div>
                <div style={{ flex: 70 }}>{this.props.product.Keywords}</div>
              </div>
            </Tab>
            <Tab label="Media">
              <div style={{ display: 'flex' }}>
                <GridList style={{ flex: 50 }}>
                  <GridTile cols={2} rows={2} title="Main Image" titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                    <img src={this.props.product.MainImageUri} alt={this.props.product.ProductName} />
                  </GridTile>
                </GridList>
                <GridList style={{ flex: 50 }}>
                  {_.map(this.props.product.AltImageUris, (uri, i) => (
                    <GridTile key={i} title={`Alternate ${(i + 1)}`} titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                      <img src={uri} alt={this.props.product.ProducName} />
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
              {this.props.loading && this.renderLoading() }
              {this.props.notFound && this.renderNotFound() }
              {!this.props.notFound && !this.props.loading && this.renderProduct()}
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

ProductProfilePage.propTypes = {
  loading: PropTypes.bool,
  notFound: PropTypes.bool,
  product: PropTypes.object,
  router: PropTypes.object,
  handleUpdateInventoryForm: PropTypes.func,
  getProductById: PropTypes.func,
};

ProductProfilePage.contextTypes = {
  router: PropTypes.object,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleUpdateInventoryForm: (payload) => {
      dispatch(updateInventory(payload));
    },
    getProductById: (id) => {
      dispatch(getProductById(id));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  product: selectCurrentProduct(),
  loading: selectLoading(),
  notFound: selectNotFound(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductProfilePage);
