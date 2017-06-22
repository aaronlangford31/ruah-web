import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const styles = {
  footer: {
    padding: '5px',
    position: 'fixed',
    left: '0px',
    display: 'flex',
    flexDirection: 'row',
    bottom: '0px',
    height: '50px',
    width: '100%',
    background: 'linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 1))',
  },
};

export default class Footer extends React.Component {
  state = {
    modalOpen: false,
  }

  render() {
    return (
      <footer style={styles.footer}>
        <div style={{ padding: '5px' }}>&copy; Ruah Logistics</div>
        <div style={{ flex: 1 }} >&nbsp;</div>
        <FlatButton onTouchTap={() => this.setState({ modalOpen: true })}>Support</FlatButton>
        <Dialog
          title="Getting Help"
          modal={false}
          open={this.state.modalOpen}
          onRequestClose={() => this.setState({ modalOpen: false })}
        >
          For all support issues email aaron@teamruah.com with a description of your issue. You can expect to hear back within 30 minutes of emailing.
        </Dialog>
      </footer>
    );
  }
}
