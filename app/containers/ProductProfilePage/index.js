import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import _ from 'underscore';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentProduct,
  selectLoading,
  selectNotFound,
  selectIsEditing,
} from './selectors';
import { selectStoreId, selectStore } from '../App/selectors';
import {
  getProductById,
  startEditCurrentProduct,
  cancelEditCurrentProduct,
  editCurrentProduct,
  saveCurrentProductEdits,
} from './actions';
import { getStore } from '../App/actions';
import Sidebar from '../../components/partials/Sidebar';
import Body from '../../components/styled/Body';
import SadFaceIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import CurrencyInput from 'react-currency-input';
import IconButton from 'material-ui/IconButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import FlatButton from 'material-ui/FlatButton';
import ShipIcon from 'material-ui/svg-icons/maps/local-shipping';
import CardIcon from 'material-ui/svg-icons/action/credit-card';

class ProductProfilePage extends Component {
  constructor(props) {
    super(props);
    this.props.getProductById(this.props.router.params.productId);
    this.props.getStore();
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onCurrencyFieldChange = this.onCurrencyFieldChange.bind(this);
  }

  onFieldChange(ev) {
    this.props.handleEditProduct(ev.target.value, ev.target.name);
  }

  onCurrencyFieldChange(ev, mask, floatVal) {
    this.props.handleEditProduct(floatVal, ev.target.name);
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

  renderSeller() {
    return (
      <Paper style={{ margin: '10px', padding: '10px' }}>
        <h4 style={{ margin: 0 }}>Sold by <Link to={`/marketplace/store/${this.props.product.StoreId}`}>{this.props.product.StoreId}</Link></h4>
      </Paper>
    );
  }

  renderActions() {
    if (this.props.currentStoreId === this.props.product.StoreId) {
      return (
        <FlatButton style={{ backgroundColor: '#A9CF54', color: 'white' }} onTouchTap={this.props.handleStartEditProduct}>
          Edit Listing
        </FlatButton>
      );
    } else if (_.contains(this.props.store.BuysFrom, this.props.product.StoreId)) {
      return (
        <FlatButton style={{ backgroundColor: '#A9CF54', color: 'white' }}>
          Add To Cart
        </FlatButton>
      );
    }
    return (
      <div />
    );
  }

  renderEditingProduct() {
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
        <Paper style={{ margin: '10px', padding: '10px', display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={'Name'} style={{ fontSize: '12px' }}>
              Product Name
            </label>
            <textarea
              type={'text'}
              name={'ProductName'}
              onChange={this.onFieldChange}
              value={this.props.product.ProductName}
              style={{ color: '#3D3D3D', width: '350px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
            />
          </div>
          &nbsp;
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={'Name'} style={{ fontSize: '12px' }}>
              Price per unit
            </label>
            <CurrencyInput
              name={'WholesalePrice'}
              prefix={'$'}
              onChangeEvent={this.onCurrencyFieldChange}
              value={this.props.product.WholesalePrice}
              style={{ color: '#3D3D3D', width: '85px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
            />
          </div>
          &nbsp;
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={'Name'} style={{ fontSize: '12px' }}>
              Ship per unit
            </label>
            <CurrencyInput
              name={'ShippingFee'}
              prefix={'$'}
              onChangeEvent={this.onCurrencyFieldChange}
              value={this.props.product.ShippingFee}
              style={{ color: '#3D3D3D', width: '85px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
            />
          </div>
          &nbsp;
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={'Name'} style={{ fontSize: '12px' }}>
              Inventory
            </label>
            <input
              name={'Inventory'}
              type={'number'}
              prefix={'$'}
              onChangeEvent={this.onFieldChange}
              value={this.props.product.Inventory}
              style={{ color: '#3D3D3D', width: '65px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
            />
          </div>
          <IconButton onTouchTap={this.props.handleCancelEditProduct}>
            <CancelIcon color={'#CA4C4C'} />
          </IconButton>
          <IconButton onTouchTap={this.props.handleSaveProduct}>
            <SaveIcon color={'#64BD63'} />
          </IconButton>
        </Paper>
        <Paper style={{ margin: '10px', padding: '10px', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
          <img style={{ height: '350px', padding: '10px', width: 'auto' }} src={this.props.product.MainImageUri} alt={'Main'} />
          {_.map(this.props.product.AltImageUris, (item) => (
            <img src={item} alt={'Alternate'} />
          ))}
        </Paper>
        <Paper style={{ margin: '10px', padding: '10px', flex: 5 }}>
          <h3>Highlights</h3>
          {_.map(this.props.product.Bullets, (item, ix) => (
            <div style={{ display: 'flex', flexDirection: 'column' }} key={item.title}>
              <TextField
                style={{ width: '100%' }}
                name={ix}
                type={'text'}
                onChange={onBulletTitleChange}
                value={item.title}
              />
              <TextField
                multiLine
                style={{ width: '100%' }}
                name={ix}
                type={'text'}
                onChange={onBulletContentChange}
                value={item.content}
              />
            </div>
          ))}
        </Paper>
        <Paper style={{ margin: '10px', padding: '10px', flex: 5 }}>
          <label htmlFor={'Name'} style={{ fontSize: '12px' }}>
            Description
          </label>
          <textarea
            type={'text'}
            name={'Description'}
            onChange={this.onFieldChange}
            value={this.props.product.Description}
            style={{ color: '#3D3D3D', width: '100%', height: '200px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
          />
        </Paper>
      </div>
    );
  }

  renderProduct() {
    return (
      <div>
        <Paper style={{ margin: '10px', padding: '10px', display: 'flex', flexDirection: 'row' }}>
          <h4 style={{ flex: 52, margin: 0, paddingRight: '20px' }}>
            {this.props.product.ProductName}
          </h4>
          <h4 style={{ flex: 16, margin: 0 }}>
            <CardIcon color={'#757575'} /> ${this.props.product.WholesalePrice.toFixed(2)}
          </h4>
          <h4 style={{ flex: 16, margin: 0 }}>
            <ShipIcon color={'#757575'} /> ${this.props.product.ShippingFee.toFixed(2)}
          </h4>
          <h4 style={{ flex: 16, margin: 0 }}>
            <span style={{ color: '#757575' }}>INV</span> {this.props.product.Inventory}
          </h4>
          {this.renderActions()}
        </Paper>
        <Paper style={{ margin: '10px', padding: '10px', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
          <img style={{ height: '350px', padding: '10px', width: 'auto' }} src={this.props.product.MainImageUri} alt={'Main'} />
          {_.map(this.props.product.AltImageUris, (item) => (
            <img src={item} alt={'Alternate'} />
          ))}
        </Paper>
        <Paper style={{ margin: '10px', padding: '10px', flex: 5 }}>
          <h3>Highlights</h3>
          {_.map(this.props.product.Bullets, (item) => (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.content}</p>
            </div>
          ))}
        </Paper>
        <Paper style={{ margin: '10px', padding: '10px', flex: 5 }}>
          <h3>Description</h3>
          <p>{this.props.product.Description}</p>
        </Paper>
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
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <Body>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '250px' }}>
                {!this.props.notFound && !this.props.loading && this.renderSeller() }
              </div>
              <div style={{ width: '750px' }}>
                {this.props.loading && this.renderLoading() }
                {this.props.notFound && this.renderNotFound() }
                {!this.props.notFound && !this.props.loading && !this.props.isEditing && this.renderProduct()}
                {!this.props.notFound && !this.props.loading && this.props.isEditing && this.renderEditingProduct()}
              </div>
              <div style={{ flex: 1 }} />
            </div>
          </Body>
        </div>
      </article>
    );
  }
}

ProductProfilePage.propTypes = {
  loading: PropTypes.bool,
  notFound: PropTypes.bool,
  isEditing: PropTypes.bool,
  product: PropTypes.object,
  store: PropTypes.object,
  router: PropTypes.object,
  currentStoreId: PropTypes.string,
  handleStartEditProduct: PropTypes.func,
  handleEditProduct: PropTypes.func,
  handleSaveProduct: PropTypes.func,
  handleCancelEditProduct: PropTypes.func,
  getProductById: PropTypes.func,
  getStore: PropTypes.func,
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
    getStore: () => {
      dispatch(getStore());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  product: selectCurrentProduct(),
  store: selectStore(),
  currentStoreId: selectStoreId(),
  loading: selectLoading(),
  notFound: selectNotFound(),
  isEditing: selectIsEditing(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductProfilePage);
