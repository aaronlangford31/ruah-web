import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import { addItemToCart } from '../../CheckoutPage/actions';
import { selectProducts, selectLoading, selectFilteredProducts, selectAutocomplete } from './selectors';
import getStyles from './styles';
import CatalogMenu from '../CatalogMenu';
import ProductCard from '../ProductCard';
import Body from '../../../components/styled/Body';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import UnhappyFaceIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';


const PRODUCT_ROW_WIDTH = 4;

class CatalogPage extends PureComponent {
  static propTypes = {
    products: PropTypes.array,
    filteredProducts: PropTypes.array,
    autocomplete: PropTypes.array,
    loading: PropTypes.bool,
    getProducts: PropTypes.func,
    searchProducts: PropTypes.func,
    onAddToCart: PropTypes.func,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.props.getProducts();
  }

  searchProducts = (query) => {
    this.props.searchProducts(this.props.products, query.toLowerCase());
  };

  renderRows = () => {
    const rows = [];
    const products = this.props.filteredProducts;
    for (let i = 0; i < products.length / PRODUCT_ROW_WIDTH; i += 1) {
      rows.push(this.renderRow(products, i));
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows}
      </div>
    );
  };

  renderRow = (products, i) => {
    const cards = [];
    for (let j = 0; j < PRODUCT_ROW_WIDTH; j += 1) {
      if ((i * PRODUCT_ROW_WIDTH) + j < products.length) {
        const product = products[(i * PRODUCT_ROW_WIDTH) + j];
        cards.push(
          <ProductCard
            key={j}
            isBuyer
            product={product}
            onAddToCart={() => this.props.onAddToCart(product)}
          />);
      }
    }
    return (
      <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
        {cards}
      </div>
    );
  }

  filterAutocomplete(searchText, key) {
    return key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  }

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  render() {
    const styles = getStyles();
    const message = 'You have not opened any buying channels on the Ruah marketplace.';
    return (
      <article>
        <Helmet
          title="Catalog"
          meta={[
            { name: 'description', content: 'Catalog Page' },
          ]}
        />
        <div style={{ display: 'flex' }} >
          <CatalogMenu location={'/catalog/channels'} />
          <Body>
            <div style={{ maxWidth: '1000px' }}>
              <Paper style={styles.header}>
                <div>
                  <AutoComplete floatingLabelText="Search" onNewRequest={(query) => this.searchProducts(query)} filter={(searchText, key) => this.filterAutocomplete(searchText, key)} maxSearchResults={5} dataSource={this.props.autocomplete} />
                </div>
                <Link to={'product/import'}>
                  <FlatButton label="Import" icon={<FileUploadIcon />} labelPosition="before" />
                </Link>
              </Paper>
              {this.props.loading && this.renderLoading()}
              {!this.props.loading && this.renderRows()}
              {!this.props.loading && this.props.products.length === 0 &&
              <Paper style={{ display: 'flex', flexDirection: 'row', padding: '5px', margin: '5px', width: '750px' }}>
                <span style={{ flex: 5 }} />
                <div style={{ textAlign: 'center' }}>
                  <UnhappyFaceIcon color={'#BDBDBD'} />
                  <div>{message}</div>
                </div>
                <span style={{ flex: 5 }} />
              </Paper>
              }
            </div>
          </Body>
        </div>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => {
      dispatch(Actions.getProducts());
    },
    onAddToCart: (product) => {
      dispatch(addItemToCart(product));
    },
    searchProducts: (products, query) => {
      dispatch(Actions.searchProducts(products, query));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
  filteredProducts: selectFilteredProducts(),
  loading: selectLoading(),
  autocomplete: selectAutocomplete(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
