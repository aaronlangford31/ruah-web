import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import { selectProducts } from './selectors';
import MyStoreMenu from '../MyStoreMenu';
import ProductCard from '../../Catalog/ProductCard';
import Sidebar from '../../../components/partials/Sidebar';
import Body from '../../../components/styled/Body';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import UnhappyFaceIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';

const PRODUCT_ROW_WIDTH = 4;

class ProductPage extends PureComponent {
  static propTypes = {
    products: PropTypes.array,
    getProducts: PropTypes.func,
    filterProducts: PropTypes.func,
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
        cards.push(<ProductCard key={j} isBuyer={false} product={this.props.products[(i * PRODUCT_ROW_WIDTH) + j]} />);
      }
    }
    return (
      <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
        {cards}
      </div>
    );
  }

  render() {
    const styles = {
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: '0 12px 12px 12px',
        margin: '10px 5px 5px 5px',
      },
      imageColumn: { width: 75 },
      productNameColumn: { width: 300 },
      tinyId: {
        fontSize: '10px',
        color: 'grey',
      },
      number: { textAlign: 'right' },
    };
    return (
      <article>
        <Helmet
          title="Catalog"
          meta={[
            { name: 'description', content: 'Catalog Page' },
          ]}
        />
        <div style={{ display: 'flex' }} >
          <Sidebar />
          <MyStoreMenu location={'/mystore/product'} />
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
              {this.renderRows()}
              {this.props.products.length === 0 &&
              <Paper style={{ display: 'flex', flexDirection: 'row', padding: '5px', margin: '5px', width: '750px' }}>
                <span style={{ flex: 5 }} />
                <div style={{ textAlign: 'center' }}>
                  <UnhappyFaceIcon color={'#BDBDBD'} />
                  <div>You have not listed any product on the Ruah marketplace.</div>
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
  };
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
