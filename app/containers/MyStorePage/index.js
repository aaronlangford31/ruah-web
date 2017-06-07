import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import {
  startEditStore,
  cancelEditStore,
  saveStoreEdits,
  editStore,
  getStore,
} from './actions';
import {
  selectStore,
  selectLoading,
  selectStoreNotSetup,
  selectIsEditing,
} from './selectors';
import Body from '../../components/styled/Body';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class MyStorePage extends Component {
  constructor(props) {
    super(props);
    this.props.getStore();
    this.onEditClicked = this.onEditClicked.bind(this);
    this.onCancelEditClicked = this.onCancelEditClicked.bind(this);
    this.onSaveEditClicked = this.onSaveEditClicked.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onEditClicked() {
    this.props.handleStartEditStore();
  }

  onCancelEditClicked() {
    this.props.handleCancelEditStore();
  }

  onSaveEditClicked() {
    this.props.handleSaveStore();
  }

  onFieldChange(event, newVal) {
    const fieldName = event.target.id;
    this.props.handleEditStore(fieldName, newVal);
  }

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderNotSetUp() {
    return (
      <Paper>
        Oops! your store is not set up yet.
        renderStoreEdit()
      </Paper>
    );
  }

  renderStoreEdit() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1000px' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ flex: 10 }} />
          <FlatButton
            backgroundColor={'#EEEEEE'}
            style={{ padding: '0 5px' }}
            onTouchTap={this.onCancelEditClicked}
          >
            Cancel Edits
          </FlatButton>
          &nbsp;
          &nbsp;
          <FlatButton
            backgroundColor={'#A9CF94'}
            onTouchTap={this.onSaveEditClicked}
          >
            <span style={{ color: '#FFFFFF' }}>Save Edits</span>
          </FlatButton>
        </div>
        <Paper style={{ padding: '15px', display: 'flex' }}>
          <img style={{ width: '200px', height: '200px' }} src={this.props.store.ProfilePicUri} alt={'Profile Pic'} />
          <div style={{ padding: '0 20px' }}>
            <TextField
              id={'Name'}
              onChange={this.onFieldChange}
              floatingLabelText={'Your store\'s name'}
              label={'The name of your store'}
              value={this.props.store.Name}
              inputStyle={{ fontWeight: '200', margin: '0', color: '#04BFBF', fontSize: '2em', height: '100px', width: '350px' }}
              underlineStyle={{ width: '350px' }}
            />
            <div style={{ color: '#BDBDBD', fontSize: '14px' }}>{this.props.store.StoreId}</div>
            <TextField
              id={'Slogan'}
              onChange={this.onFieldChange}
              value={this.props.store.Slogan}
              floatingLabelText={'Your store\'s slogan'}
              multiLine
              inputStyle={{ fontWeight: '200', margin: '0', color: '#616161', fontSize: '14px', width: '350px' }}
              underlineStyle={{ width: '350px' }}
            />
            <Divider />
            <div style={{ display: 'flex', marginTop: '15px' }}>
              <span style={{ width: '400px', fontSize: '14px', fontWeight: '600' }}>Marketplace Roles</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Taxonomy</span>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', width: '400px' }}>
                {_.map(this.props.store.MarketResources, (item, j) => (
                  <div
                    key={j}
                    style={{ backgroundColor: '#F7E967', borderRadius: '5px', padding: '1px 5px', marginRight: '5px', color: '#9E9E9E' }}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', width: '250px' }}>
                {_.map(this.props.store.TaxonomicClassifications, (item, j) => (
                  <div key={j} style={{ backgroundColor: '#F7E967', borderRadius: '5px', padding: '1px 5px', marginRight: '5px', color: '#9E9E9E' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <span style={{ width: '400px', fontSize: '14px', fontWeight: '600' }}>Location</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>On Ruah since</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Founded</span>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '400px', display: 'flex' }}>
                <TextField
                  id={'City'}
                  onChange={this.onFieldChange}
                  value={this.props.store.Locality}
                  style={{ width: '150px' }}
                  floatingLabelText={'City'}
                  inputStyle={{ width: '150px' }}
                  underlineStyle={{ width: '150px' }}
                />
                &nbsp;
                <TextField
                  id={'Sovereignty'}
                  onChange={this.onFieldChange}
                  value={this.props.store.Sovereignty}
                  style={{ width: '100px' }}
                  floatingLabelText={'State/Province'}
                  inputStyle={{ width: '100px' }}
                  underlineStyle={{ width: '100px' }}
                />
                &nbsp;
                <TextField
                  id={'Country'}
                  onChange={this.onFieldChange}
                  value={this.props.store.Country}
                  style={{ width: '100px' }}
                  floatingLabelText={'Country'}
                  inputStyle={{ width: '100px' }}
                  underlineStyle={{ width: '100px' }}
                />
              </div>
              <span style={{ width: '250px' }}>{this.props.store.Joined.fromNow()}</span>
              <TextField
                id={'Founded'}
                onChange={this.onFieldChange}
                value={this.props.store.Founded}
                type={'number'}
                style={{ width: '100px' }}
                floatingLabelText={'Year Founded'}
                inputStyle={{ width: '100px' }}
                underlineStyle={{ width: '100px' }}
              />
            </div>
          </div>
        </Paper>
        <Paper style={{ padding: '15px', marginTop: '20px' }}>
          <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Story</span>
          <TextField
            id={'Story'}
            onChange={this.onFieldChange}
            value={this.props.store.Story}
            floatingLabelText={'What does your store do? How did you get started? Who are you looking to do business with?'}
            fullWidth
            multiLine
          />
        </Paper>
      </div>
    );
  }

  renderStore() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1000px' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ flex: 10 }} />
          <FlatButton
            backgroundColor={'#A9CF94'}
            color={'#FFFFFF'}
            onTouchTap={this.onEditClicked}
          >
            <span style={{ color: '#FFFFFF' }}>Edit Page</span>
          </FlatButton>
        </div>
        <Paper style={{ padding: '15px', display: 'flex' }}>
          <img style={{ width: '200px', height: '200px' }} src={this.props.store.ProfilePicUri} alt={'Profile Pic'} />
          <div style={{ padding: '0 20px' }}>
            <h1 style={{ fontWeight: '200', margin: '0', color: '#04BFBF' }}>{this.props.store.Name}</h1>
            <div style={{ color: '#BDBDBD', fontSize: '14px' }}>{this.props.store.StoreId}</div>
            <div style={{ color: '#616161', fontSize: '14px' }}>{`"${this.props.store.Slogan}"`}</div>
            <Divider />
            <div style={{ display: 'flex', marginTop: '15px' }}>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Marketplace Roles</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Taxonomy</span>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', width: '250px' }}>
                {_.map(this.props.store.MarketResources, (item, j) => (
                  <div key={j} style={{ backgroundColor: '#F7E967', borderRadius: '5px', padding: '1px 5px', marginRight: '5px', color: '#9E9E9E' }}>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', width: '250px' }}>
                {_.map(this.props.store.TaxonomicClassifications, (item, j) => (
                  <div key={j} style={{ backgroundColor: '#F7E967', borderRadius: '5px', padding: '1px 5px', marginRight: '5px', color: '#9E9E9E' }}>
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
              <span style={{ width: '250px' }}>{this.props.store.Joined.fromNow()}</span>
              <span style={{ width: '250px' }}>{this.props.store.Founded}</span>
            </div>
          </div>
        </Paper>
        <Paper style={{ padding: '15px', marginTop: '20px' }}>
          <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Story</span>
          <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.store.Story}</p>
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
        <Body>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 10 }}>
              {this.props.loading && this.renderLoading()}
              {!this.props.loading && !this.props.isEditing && this.renderStore()}
              {!this.props.loading && this.props.isEditing && this.renderStoreEdit()}
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

MyStorePage.propTypes = {
  loading: PropTypes.bool,
  isEditing: PropTypes.bool,
  store: PropTypes.object,
  handleStartEditStore: PropTypes.func,
  handleCancelEditStore: PropTypes.func,
  handleSaveStore: PropTypes.func,
  handleEditStore: PropTypes.func,
  getStore: PropTypes.func,
};

MyStorePage.contextTypes = {
  router: PropTypes.object,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
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
    getStore: () => {
      dispatch(getStore());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  store: selectStore(),
  storeNotSetup: selectStoreNotSetup(),
  isEditing: selectIsEditing(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(MyStorePage);
