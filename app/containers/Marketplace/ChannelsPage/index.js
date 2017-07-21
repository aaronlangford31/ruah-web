import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import { Link } from 'react-router';
import Body from '../../../components/styled/Body';
import MarketplaceMenu from '../MarketplaceMenu';
import {
  getStore,
} from './actions';
import {
  selectLoading,
  selectBuyingChannels,
  selectSellingChannels,
} from './selectors';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import Divider from 'material-ui/Divider';
import UnhappyFaceIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';

class ChannelsPage extends Component {
  constructor(props) {
    super(props);
    this.props.getStore();
  }

  renderLoading() {
    return (
      <Paper style={{ margin: '10px 0', padding: '50px', textAlign: 'center', width: '500px', height: '200px' }}>
        <CircularProgress size={80} />
      </Paper>
    );
  }

  renderChannel({ key, channel }) {
    return (
      <Link to={`https://app.teamruah.com/marketplace/store/${channel}`} key={key}>
        {channel}
      </Link>
    );
  }

  renderChannels() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '10px 0',
          maxWidth: '1000px',
        }}
      >
        <Paper style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ margin: '0', color: '#04BFBF', fontWeight: 200 }}>Buying Channels</h2>
          <Divider />
          {_.map(this.props.buyingChannels, (item, ix) => this.renderChannel({ key: ix, channel: item }))}
          {this.props.buyingChannels.length === 0 &&
            <div style={{ display: 'flex', flexDirection: 'row', padding: '5px', width: '750px' }}>
              <span style={{ flex: 5 }} />
              <div style={{ textAlign: 'center' }}>
                <UnhappyFaceIcon color={'#BDBDBD'} />
                <div>{'You aren\'t buying product from anyone at this point.'}</div>
                <div>{'Find new channels to buy product from by browsing the Discover page in the Marketplace.'}</div>
              </div>
              <span style={{ flex: 5 }} />
            </div>
          }
        </Paper>
        <Paper style={{ padding: '15px', margin: '10px 0', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ margin: '0', color: '#04BFBF', fontWeight: 200 }}>Selling Channels</h2>
          <Divider />
          {_.map(this.props.sellingChannels, (item, ix) => this.renderChannel({ key: ix, channel: item }))}
          {this.props.sellingChannels.length === 0 &&
            <div style={{ display: 'flex', flexDirection: 'row', padding: '5px', width: '750px' }}>
              <span style={{ flex: 5 }} />
              <div style={{ textAlign: 'center' }}>
                <UnhappyFaceIcon color={'#BDBDBD'} />
                <div>{'You aren\'t selling product to anyone at this point.'}</div>
                <div>{'Find new channels to sell product to by browsing the Discover page in the Marketplace.'}</div>
              </div>
              <span style={{ flex: 5 }} />
            </div>
          }
        </Paper>
      </div>
    );
  }

  render() {
    return (
      <article>
        <Helmet
          title="Channels"
          meta={[
            { name: 'description', content: 'The channels you\'ve opened in the marketplace.' },
          ]}
        />
        <div style={{ display: 'flex' }}>
          <MarketplaceMenu location={'/marketplace/channels'} />
          <Body>
            {this.props.loading && this.renderLoading()}
            {!this.props.loading && this.renderChannels()}
          </Body>
        </div>
      </article>
    );
  }
}

ChannelsPage.propTypes = {
  getStore: PropTypes.func,
  loading: PropTypes.bool,
  buyingChannels: PropTypes.array,
  sellingChannels: PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
  return {
    getStore: () => dispatch(getStore()),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  buyingChannels: selectBuyingChannels(),
  sellingChannels: selectSellingChannels(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsPage);
