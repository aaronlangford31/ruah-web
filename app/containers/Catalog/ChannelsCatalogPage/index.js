import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import { addItemToCart } from '../../CheckoutPage/actions';
import { selectProducts, selectLoading } from './selectors';
import getStyles from './styles';
import CatalogMenu from '../CatalogMenu';
import ProductCard from '../ProductCard';
import Body from '../../../components/styled/Body';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import UnhappyFaceIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';

const PRODUCT_ROW_WIDTH = 4;

class CatalogPage extends PureComponent {
  static propTypes = {
    products: PropTypes.array,
    loading: PropTypes.bool,
    getProducts: PropTypes.func,
    filterProducts: PropTypes.func,
    onAddToCart: PropTypes.func,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.props.getProducts();
  }

  filterProducts = ({ target: { value } }) => {
    this.props.filterProducts(value);
  };

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderRows = () => {
    const rows = [];
    for (let i = 0; i < this.props.products.length / PRODUCT_ROW_WIDTH; i += 1) {
      rows.push(this.renderRow(i));
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows}
      </div>
    );
  };

  renderRow = (i) => {
    const cards = [];
    for (let j = 0; j < PRODUCT_ROW_WIDTH; j += 1) {
      if ((i * PRODUCT_ROW_WIDTH) + j < this.props.products.length) {
        const product = this.props.products[(i * PRODUCT_ROW_WIDTH) + j];
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

  render() {
    const styles = getStyles();

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
                  <TextField onChange={this.filterProducts} floatingLabelText="Filter" />
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
                  <div>You have not opened any buying channels on the Ruah marketplace.</div>
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
    filterProducts: (filter) => {
      dispatch(Actions.filterProducts(filter));
    },
    getProducts: () => {
      dispatch(Actions.getProducts());
    },
    onAddToCart: (product) => {
      dispatch(addItemToCart(product));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
  loading: selectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
