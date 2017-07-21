import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { submitIntroductionForm } from './actions';
import { selectLoading, selectFormSubmitted } from './selectors';
import IntroductionForm from '../../components/forms/IntroductionForm';
import Body from '../../components/styled/Body';
import Spinner from '../../components/styled/Spinner';
import { transparentCard, ruahH1, ruahH2 } from './styles';

export const IntroductionPage = ({ submitIntroduction, loading, submitted }) => {
  const isMobile = () => {
    const w = window;
    const d = document;
    const documentElement = d.documentElement;
    const body = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    if (width < 500) {
      return true;
    }
    return false;
  };
  return (
    <article>
      <Helmet
        title="Introduction"
        meta={[
          { name: 'description', content: 'Let\'s get to know you!' },
        ]}
      />
      <Body useBackground>
        { !loading && !submitted &&
          <div style={transparentCard}>
            <h1 style={ruahH1}>{'Let\'s do a proper introduction.'}</h1>
            <div style={isMobile() ? { display: 'flex', flexDirection: 'column' } : { display: 'flex' }}>
              <div
                style={isMobile() ? { padding: '5px', width: '400px' } : { padding: '5px 40px 5px 5px', width: '400px' }}
              >
                <h2 style={ruahH2}>{'We\'ll go first.'}</h2>
                <h4>Ruah is a B2B social network.</h4>
                <p>We are not a network built for cat memes and click bait news. Ruah facilitates <strong>secure trading relationships</strong> between businesses online. We call it a social network because <strong>relationships are at the core</strong> of the Ruah experience.</p>
                <p>Just as other social networks allowed you to manage hundreds more personal relationships than before, Ruah makes it possible for you to <strong>grow your trading network</strong> larger than ever before.</p>
                <p>The Ruah team started with a vision that we could empower entrepreneurs to succeed. That is our goal for every business that joins the Ruah community</p>
              </div>
              <div style={{ padding: '5px 5px 5px 40px' }}>
                <h2 style={ruahH2}>Now tell us about you:</h2>
                <IntroductionForm onSubmit={submitIntroduction} />
              </div>
            </div>
          </div>
        }
        { loading &&
        <div style={transparentCard}>
          <Spinner />
        </div>
        }
        { submitted &&
        <div style={transparentCard}>
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <h1 style={ruahH1}>It was a pleasure to meet you!</h1>
            <p>A human should be in touch shortly.</p>
            <div>
              <span style={{ color: '#FF0000' }}>&hearts;</span> Team Ruah
            </div>
          </div>
        </div>
        }
      </Body>
    </article>
  );
};

IntroductionPage.propTypes = {
  submitIntroduction: PropTypes.func,
  loading: PropTypes.bool,
  submitted: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    submitIntroduction: () => {
      dispatch(submitIntroductionForm());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  submitted: selectFormSubmitted(),
});

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionPage);
