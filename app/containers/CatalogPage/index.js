/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import { getProducts } from './actions';
import { selectProducts } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';

class CatalogPage extends Component {

  componentDidMount() {
    this.props.getProducts();
  }

  renderProducts = () => {
    const { products } = this.props;
    return _.map(products, (product, i) => (
      <div key={i}>{product.Name}</div>
    ));
  };

  render() {
    return (
      <article>
        <Helmet
          title="Catalog"
          meta={[
            { name: 'description', content: 'Catalog Page' },
          ]}
        />
        <H2>Catalog</H2>
        <Body>
          {this.renderProducts()}
        </Body>
      </article>
    );
  }
}

CatalogPage.propTypes = {
  products: PropTypes.array,
  getProducts: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => {
      dispatch(getProducts());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
