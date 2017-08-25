import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import {
  startEditStore,
  cancelEditStore,
  saveStoreEdits,
  editStore,
} from './actions';
import { selectIsEditing, selectStore } from './selectors';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';

class MyStoreProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onMarketResChange = this.onMarketResChange.bind(this);
    this.onTaxClassChange = this.onTaxClassChange.bind(this);
  }

  onFieldChange(event, newVal) {
    const fieldName = event.target.id;
    this.props.handleEditStore(fieldName, newVal);
  }

  onMarketResChange(event, isChecked) {
    let ress = this.props.store.MarketResources;
    const res = event.target.id;
    if (isChecked) {
      ress.push(res);
    } else {
      ress = _.filter(ress, (a) => a !== res);
    }
    this.props.handleEditStore('MarketResources', ress);
  }

  onTaxClassChange(event, isChecked) {
    let classes = this.props.store.TaxonomicClassifications;
    const clss = event.target.id;
    if (isChecked) {
      classes.push(clss);
    } else {
      classes = _.filter(classes, (a) => a !== clss);
    }
    this.props.handleEditStore('TaxonomicClassifications', classes);
  }

  renderStoreEdit() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Paper style={{ padding: '15px', display: 'flex' }}>
          <Avatar src={this.props.store.ProfilePicUri} size={100} />
          <div style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', fontSize: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor={'Name'} style={{ fontSize: '12px' }}>
                  Store Name
                </label>
                <input
                  type={'text'}
                  id={'Name'}
                  onChange={this.onFieldChange}
                  value={this.props.store.Name}
                  style={{ color: '#04BFBF', width: '350px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor={'Slogan'} style={{ fontSize: '12px' }}>
                Your {"store's"} slogan
              </label>
              <textarea
                type={'text'}
                id={'Slogan'}
                onChange={this.onFieldChange}
                value={this.props.store.Slogan}
                style={{ color: '#3D3D3D', width: '350px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
              />
            </div>
            <div style={{ display: 'flex', marginTop: '15px' }}>
              <span style={{ width: '400px', fontSize: '14px', fontWeight: '600' }}>Looking to Connect With</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Checkbox
                id={'Buyers'}
                checked={_.contains(this.props.store.MarketResources, 'Buyers')}
                onCheck={this.onMarketResChange}
                label={'Buyers'}
              />
              <Checkbox
                id={'Suppliers'}
                checked={_.contains(this.props.store.MarketResources, 'Suppliers')}
                onCheck={this.onMarketResChange}
                label={'Suppliers'}
              />
            </div>
            <div style={{ display: 'flex', marginTop: '15px' }}>
              <span style={{ width: '400px', fontSize: '14px', fontWeight: '600' }}>Categories</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Checkbox
                id={'Clothing & Accessories'}
                checked={_.contains(this.props.store.TaxonomicClassifications, 'Clothing & Accessories')}
                onCheck={this.onTaxClassChange}
                label={'Clothing & Accessories'}
              />
              <Checkbox
                id={'Electronics'}
                checked={_.contains(this.props.store.TaxonomicClassifications, 'Electronics')}
                onCheck={this.onTaxClassChange}
                label={'Electronics'}
              />
              <Checkbox
                id={'Food'}
                checked={_.contains(this.props.store.TaxonomicClassifications, 'Food')}
                onCheck={this.onTaxClassChange}
                label={'Food'}
              />
              <Checkbox
                id={'Beauty & Personal Care'}
                checked={_.contains(this.props.store.TaxonomicClassifications, 'Beauty & Personal Care')}
                onCheck={this.onTaxClassChange}
                label={'Beauty & Personal Care'}
              />
              <Checkbox
                id={'Sporting Goods'}
                checked={_.contains(this.props.store.TaxonomicClassifications, 'Sporting Goods')}
                onCheck={this.onTaxClassChange}
                label={'Sporting Goods'}
              />
              <Checkbox
                id={'Pet Care & Accessories'}
                checked={_.contains(this.props.store.TaxonomicClassifications, 'Pet Care & Accessories')}
                onCheck={this.onTaxClassChange}
                label={'Pet Care & Accessories'}
              />
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <span style={{ width: '400px', fontSize: '14px', fontWeight: '600' }}>Location</span>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '400px', display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor={'Locality'} style={{ fontSize: '12px' }}>
                    City
                  </label>
                  <input
                    type={'text'}
                    id={'Locality'}
                    onChange={this.onFieldChange}
                    value={this.props.store.Locality}
                    style={{ color: '#3D3D3D', width: '175px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
                  />
                </div>
                &nbsp;
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor={'Sovereignty'} style={{ fontSize: '12px' }}>
                    State
                  </label>
                  <input
                    type={'text'}
                    id={'Sovereignty'}
                    onChange={this.onFieldChange}
                    value={this.props.store.Sovereignty}
                    style={{ color: '#3D3D3D', width: '50px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
                  />
                </div>
                &nbsp;
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor={'Country'} style={{ fontSize: '12px' }}>
                    Country
                  </label>
                  <input
                    type={'text'}
                    id={'Country'}
                    onChange={this.onFieldChange}
                    value={this.props.store.Country}
                    style={{ color: '#3D3D3D', width: '175px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <span style={{ width: '400px', fontSize: '14px', fontWeight: '600' }}>About Your Store</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor={'Founded'} style={{ fontSize: '12px' }}>
                Year Founded
              </label>
              <input
                type={'number'}
                id={'Founded'}
                onChange={this.onFieldChange}
                value={this.props.store.Founded}
                style={{ color: '#3D3D3D', width: '75px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor={'Story'} style={{ fontSize: '12px' }}>
                Your {"store's"} story
              </label>
              <textarea
                type={'text'}
                id={'Story'}
                onChange={this.onFieldChange}
                value={this.props.store.Story}
                style={{ color: '#3D3D3D', width: '500px', height: '500px', border: '1px #636464 solid', backgroundColor: '#EBF6F7', padding: '4px' }}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <IconButton
              onTouchTap={() => this.props.handleCancelEditStore()}
            >
              <CancelIcon color={'#CA4C4C'} />
            </IconButton>
            <IconButton
              onTouchTap={() => this.props.handleSaveStore()}
            >
              <SaveIcon color={'#64BD63'} />
            </IconButton>
          </div>
        </Paper>
      </div>
    );
  }

  renderStore() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Paper style={{ padding: '15px', display: 'flex' }}>
          <Avatar src={this.props.store.ProfilePicUri} size={100} />
          <div style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', fontSize: '18px' }}>
              <div style={{ color: '#04BFBF' }}>{this.props.store.Name}&nbsp;</div>
              <div style={{ color: '#BDBDBD' }}>{this.props.store.StoreId}</div>
            </div>
            <div style={{ color: '#616161', fontSize: '14px' }}>{`"${this.props.store.Slogan}"`}</div>
            <div style={{ display: 'flex', marginTop: '32px' }}>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Looking to Connect With</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Categories</span>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', width: '250px' }}>
                {_.map(this.props.store.MarketResources, (item, j) => (
                  <div key={j} style={{ backgroundColor: '#9CE8E6', borderRadius: '5px', padding: '1px 5px', marginRight: '5px', color: '#3D3D3D' }}>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', width: '250px' }}>
                {_.map(this.props.store.TaxonomicClassifications, (item, j) => (
                  <div key={j} style={{ backgroundColor: '#9CE8E6', borderRadius: '5px', padding: '1px 5px', marginRight: '5px', color: '#3D3D3D' }}>
                    {item}&nbsp;
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Location</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>On Ruah since</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Founded</span>
            </div>
            <div style={{ display: 'flex' }}>
              <span style={{ width: '250px' }}>{this.props.store.Locality}, {this.props.store.Sovereignty}, {this.props.store.Country}</span>
              <span style={{ width: '250px' }}>{this.props.store.Joined && moment(this.props.store.Joined).fromNow()}</span>
              <span style={{ width: '250px' }}>{this.props.store.Founded}</span>
            </div>
            <div style={{ display: 'flex', marginTop: '32px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Story</span>
            </div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.store.Story}</p>
          </div>
          <div style={{ flex: 1 }}>
            <IconButton
              onTouchTap={() => this.props.handleStartEditStore()}
            >
              <EditIcon />
            </IconButton>
          </div>
        </Paper>
      </div>
    );
  }

  render() {
    return this.props.isEditing ? this.renderStoreEdit() : this.renderStore();
  }
}

MyStoreProfileComponent.propTypes = {
  store: PropTypes.object,
  isEditing: PropTypes.bool,
  handleStartEditStore: PropTypes.func,
  handleCancelEditStore: PropTypes.func,
  handleSaveStore: PropTypes.func,
  handleEditStore: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    handleStartEditStore: () => {
      dispatch(startEditStore());
    },
    handleCancelEditStore: () => {
      dispatch(cancelEditStore());
    },
    handleSaveStore: () => {
      dispatch(saveStoreEdits());
    },
    handleEditStore: (newVal, field) => {
      dispatch(editStore(newVal, field));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  store: selectStore(),
  isEditing: selectIsEditing(),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyStoreProfileComponent);
