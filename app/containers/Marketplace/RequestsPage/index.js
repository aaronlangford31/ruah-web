import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import Body from '../../../components/styled/Body';
import MarketplaceMenu from '../MarketplaceMenu';
import {
  getRequests,
  submitChannelApproval,
  submitChannelDecline,
} from './actions';
import {
  selectLoading,
  selectReceivedRequests,
} from './selectors';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import UnhappyFaceIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';

class RequestsPage extends Component {
  constructor(props) {
    super(props);
    this.props.getRequests();
  }

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px', height: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderRequest({ key, request }) {
    return (
      <div key={key} style={{ width: '750px', padding: '10px', display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 10, margin: '5px' }}>
          {request.RequestType === 'Buying' &&
            <h3 style={{ margin: '0 0 5px 0' }}>{request.FromId} would like to buy from you.</h3>
          }
          {request.RequestType === 'Selling' &&
            <h3 style={{ margin: '0 0 5px 0' }}>{request.FromId} would like to sell to you.</h3>
          }
          <div style={{ whiteSpace: 'pre-wrap', backgroundColor: '#F5F5F5', padding: '5px', width: '90%' }}>{request.Message}</div>
          <div style={{ fontSize: '14px' }}>Sent {request.Timestamp.fromNow()}</div>
        </div>
        <div>
          <FlatButton
            style={{ padding: '0 5px' }}
            backgroundColor={'#F5F5F5'}
            onTouchTap={() => this.props.submitChannelDecline(key, request)}
          >
            Decline
          </FlatButton>
          &nbsp;
          <FlatButton
            style={{ padding: '0 5px', color: '#FFFFFF' }}
            backgroundColor={'#A9CF54'}
            onTouchTap={() => this.props.submitChannelApproval(key, request)}
          >
            Open Channel
          </FlatButton>
        </div>
      </div>
    );
  }

  renderRequests() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '10px 0',
          maxWidth: '1000px',
        }}
      >
        <Paper style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ margin: '0', color: '#04BFBF', fontWeight: 200 }}>Received Requests</h2>
          <Divider />
          {_.map(this.props.receivedRequests, (item, ix) => this.renderRequest({ key: ix, request: item }))}
          {this.props.receivedRequests.length === 0 &&
            <div style={{ display: 'flex', flexDirection: 'row', padding: '5px', width: '750px' }}>
              <span style={{ flex: 5 }} />
              <div style={{ textAlign: 'center' }}>
                <UnhappyFaceIcon color={'#BDBDBD'} />
                <div>You have no requests at this time.</div>
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
          title="Discover"
          meta={[
            { name: 'description', content: 'Find other businesses to connect with.' },
          ]}
        />
        <div style={{ display: 'flex' }}>
          <MarketplaceMenu location={'/marketplace/requests'} />
          <Body>
            {this.props.loading && this.renderLoading()}
            {!this.props.loading && this.renderRequests()}
          </Body>
        </div>
      </article>
    );
  }
}

RequestsPage.propTypes = {
  getRequests: PropTypes.func,
  loading: PropTypes.bool,
  receivedRequests: PropTypes.array,
  submitChannelApproval: PropTypes.func,
  submitChannelDecline: PropTypes.func,
};

RequestsPage.contextTypes = {
  router: PropTypes.object,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    getRequests: () => dispatch(getRequests()),
    submitChannelApproval: (requestIx) => dispatch(submitChannelApproval(requestIx)),
    submitChannelDecline: (requestIx) => dispatch(submitChannelDecline(requestIx)),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  receivedRequests: selectReceivedRequests(),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestsPage);
