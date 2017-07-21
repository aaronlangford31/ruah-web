import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import H2 from '../../components/styled/H2';

export const HomePage = () => (
  <article>
    <Helmet
      title="Home"
      meta={[
        { name: 'description', content: 'Ruah Home Page' },
      ]}
    />
    <H2>Home</H2>
  </article>
);

HomePage.propTypes = {};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
