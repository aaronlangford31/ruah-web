/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

export const HomePage = () => (
  <article>
    <Helmet
      title="Home"
      meta={[
        { name: 'description', content: 'Ruah Home Page' },
      ]}
    />
    <h2>Home</h2>
  </article>
);

HomePage.propTypes = {};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
