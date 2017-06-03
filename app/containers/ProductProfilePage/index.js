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
  selectIsEditing,
} from './selectors';
import {
  getProductById,
  startEditCurrentProduct,
  cancelEditCurrentProduct,
  editCurrentProduct,
  saveCurrentProductEdits,
} from './actions';
import getStyles from './styles';
import Body from '../../components/styled/Body';
import Menu from '../../components/partials/Menu';
import SadFaceIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';

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

  renderMarketplaceInfoReadOnly() {
    const styles = getStyles();
    return (
      <div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Wholesale Price:</p>
          <p style={styles.productFieldRowVal}>${this.props.product.WholesalePrice.toFixed(2)}</p>
        </div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Shipping Fee:</p>
          <p style={styles.productFieldRowVal}>${this.props.product.ShippingFee.toFixed(2)}</p>
        </div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Inventory Available:</p>
          <div style={styles.productFieldRowVal}>{this.props.product.Inventory}</div>
        </div>
      </div>
    );
  }

  renderMarketplaceInfoEdit() {
    const styles = getStyles();
    const onFieldChange = (ev, newVal) => { this.props.handleEditProduct(newVal, ev.target.id); };
    return (
      <div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Wholesale Price:</p>
          <div style={styles.productFieldRowVal}>
            <TextField
              id={'WholesalePrice'}
              type={'number'}
              min={0.01}
              step={0.01}
              value={this.props.product.WholesalePrice.toFixed(2)}
              onChange={onFieldChange}
            />
          </div>
        </div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Shipping Fee:</p>
          <div style={styles.productFieldRowVal}>
            <TextField
              id={'ShippingFee'}
              type={'number'}
              min={0.00}
              step={0.01}
              value={this.props.product.ShippingFee.toFixed(2)}
              onChange={onFieldChange}
            />
          </div>
        </div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Inventory Available:</p>
          <div style={styles.productFieldRowVal}>
            <TextField
              id={'Inventory'}
              type={'number'}
              min={0}
              step={1}
              value={this.props.product.Inventory}
              onChange={onFieldChange}
            />
          </div>
        </div>
      </div>
    );
  }

  /* eslint-disable react/no-danger */
  renderGlobalAttributesReadOnly() {
    const styles = getStyles();
    return (
      <div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Product Name:</p>
          <p style={styles.productFieldRowVal}>{this.props.product.ProductName}</p>
        </div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Brand Name:</p>
          <p style={styles.productFieldRowVal}>{this.props.product.Brand}</p>
        </div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Manufacturer Name:</p>
          <p style={styles.productFieldRowVal}>{this.props.product.ManufacturerName}</p>
        </div>
        <div style={styles.productFieldRow}>
          <div style={styles.productFieldRowHeader}>Description:</div>
          <span style={styles.productFieldRowVal} dangerouslySetInnerHTML={{ __html: this.props.product.Description }} />
        </div>
        <div style={styles.productFieldRow}>
          <div style={styles.productFieldRowHeader}>Bullets:</div>
          <ul style={styles.productFieldRowVal}>
            {_.map(this.props.product.Bullets, (bullet, ix) => (
              <li key={ix}>
                <div>{bullet.title}</div>
                <div>{bullet.content}</div>
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.productFieldRow}>
          <div style={styles.productFieldRowHeader}>Keywords:</div>
          <div style={styles.productFieldRowVal}>{this.props.product.Keywords}</div>
        </div>
      </div>
    );
  }

  renderGlobalAttributesEdit() {
    const styles = getStyles();
    const onFieldChange = (ev, newVal) => { this.props.handleEditProduct(newVal, ev.target.id); };
    const onBulletTitleChange = (ev, newVal) => {
      const bullets = this.props.product.Bullets;
      bullets[ev.target.name].title = newVal;
      this.props.handleEditProduct(bullets, 'Bullets');
    };
    const onBulletContentChange = (ev, newVal) => {
      const bullets = this.props.product.Bullets;
      bullets[ev.target.name].content = newVal;
      this.props.handleEditProduct(bullets, 'Bullets');
    };
    return (
      <div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Product Name:</p>
          <div style={styles.productFieldRowVal}>
            <TextField
              id={'ProductName'}
              type={'text'}
              fullWidth
              value={this.props.product.ProductName}
              onChange={onFieldChange}
            />
          </div>
        </div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Brand Name:</p>
          <div style={styles.productFieldRowVal}>
            <TextField
              id={'Brand'}
              type={'text'}
              fullWidth
              value={this.props.product.Brand}
              onChange={onFieldChange}
            />
          </div>
        </div>
        <div style={styles.productFieldRow}>
          <p style={styles.productFieldRowHeader}>Manufacturer Name:</p>
          <div style={styles.productFieldRowVal}>
            <TextField
              id={'ManufacturerName'}
              type={'text'}
              fullWidth
              value={this.props.product.ManufacturerName}
              onChange={onFieldChange}
            />
          </div>
        </div>
        <div style={styles.productFieldRow}>
          <div style={styles.productFieldRowHeader}>Description:</div>
          <div style={styles.productFieldRowVal}>
            <TextField
              id={'Description'}
              type={'text'}
              fullWidth
              multiLine
              value={this.props.product.Description}
              onChange={onFieldChange}
            />
          </div>
        </div>
        <div style={styles.productFieldRow}>
          <div style={styles.productFieldRowHeader}>Bullets:</div>
          <ul style={styles.productFieldRowVal}>
            {_.map(this.props.product.Bullets, (bullet, ix) => (
              <li key={ix}>
                <TextField
                  id={bullet.title}
                  name={`${ix}`}
                  type={'text'}
                  fullWidth
                  value={bullet.title}
                  onChange={onBulletTitleChange}
                />
                <TextField
                  id={bullet.content}
                  name={`${ix}`}
                  type={'text'}
                  fullWidth
                  multiLine
                  value={bullet.content}
                  onChange={onBulletContentChange}
                />
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.productFieldRow}>
          <div style={styles.productFieldRowHeader}>Keywords:</div>
          <div style={styles.productFieldRowVal}>
            <TextField
              id={'Keywords'}
              type={'text'}
              fullWidth
              multiLine
              value={this.props.product.Keywords}
              onChange={onFieldChange}
            />
          </div>
        </div>
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

  renderProduct() {
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
            <div style={{ width: '100%' }}>
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
            {this.props.isEditing ?
              <div style={styles.horizontalDiv}>
                <IconButton onTouchTap={this.props.handleSaveProduct}>
                  <SaveIcon />
                </IconButton>
                <IconButton onTouchTap={this.props.handleCancelEditProduct}>
                  <CancelIcon />
                </IconButton>
              </div>
              : <div style={styles.horizontalDiv}>
                <IconButton onTouchTap={this.props.handleStartEditProduct}>
                  <ModeEditIcon />
                </IconButton>
              </div>
            }
          </div>
          <Tabs>
            <Tab label="Marketplace Info">
              {this.props.isEditing ? this.renderMarketplaceInfoEdit() : this.renderMarketplaceInfoReadOnly()}
            </Tab>
            <Tab label="Global Attributes">
              {this.props.isEditing ? this.renderGlobalAttributesEdit() : this.renderGlobalAttributesReadOnly()}
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
            <div>
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
  isEditing: PropTypes.bool,
  product: PropTypes.object,
  router: PropTypes.object,
  handleStartEditProduct: PropTypes.func,
  handleEditProduct: PropTypes.func,
  handleSaveProduct: PropTypes.func,
  handleCancelEditProduct: PropTypes.func,
  getProductById: PropTypes.func,
};

ProductProfilePage.contextTypes = {
  router: PropTypes.object,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleStartEditProduct: () => {
      dispatch(startEditCurrentProduct());
    },
    handleCancelEditProduct: () => {
      dispatch(cancelEditCurrentProduct());
    },
    handleSaveProduct: () => {
      dispatch(saveCurrentProductEdits());
    },
    handleEditProduct: (newVal, field) => {
      dispatch(editCurrentProduct(newVal, field));
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
  isEditing: selectIsEditing(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductProfilePage);
