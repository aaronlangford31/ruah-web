import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import ShipIcon from 'material-ui/svg-icons/maps/local-shipping';
import CardIcon from 'material-ui/svg-icons/action/credit-card';
import ViewIcon from 'material-ui/svg-icons/image/remove-red-eye';

const styles = {
  cardPaper: {
    margin: '5px',
    width: '240px',
    height: '340px',
    display: 'flex',
    flexDirection: 'column',
  },
  productImage: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '240px',
    width: '240px',
    display: 'flex',
    flexDirection: 'row',
    padding: '7px',
  },
  addToCart: {
    backgroundColor: '#A9CF54',
    color: 'white',
  },
  viewProduct: {
    backgroundColor: 'rgb(245, 245, 245)',
    width: '37px',
    height: '37px',
    cursor: 'pointer',
    padding: '7px',
  },
  productImageEmpty: {
    background: 'repeating-linear-gradient(45deg,transparent,transparent 10px,#ccc 10px,#ccc 20px)',
    height: '100%',
  },
};

const ProductCard = (props) => {
  const { product, isBuyer, onAddToCart } = props;
  return (
    <Paper style={styles.cardPaper} >
      <div
        style={product.MainImageUri ? {
          ...styles.productImage,
          backgroundImage: `url(${product.MainImageUri})`,
        } : styles.productImageEmpty}
      >
        <span style={{ flex: 10 }}>&nbsp;</span>
        <Link to={`/product/${product.RuahId}`} style={styles.viewProduct}><ViewIcon /></Link>
        <span>&nbsp;</span>
        {isBuyer && <FlatButton onTouchTap={onAddToCart} style={styles.addToCart}>Add to Cart</FlatButton> }
      </div>
      <div style={{ padding: '5px' }}>
        <div style={{ margin: '0', color: '#04BFBF' }}>
          {product.ProductName.substr(0, 48)}{product.ProductName.length > 48 && <span>&hellip;</span> }
        </div>
        {!isBuyer && <div style={{ color: '#BDBDBD', fontSize: '12px' }}>{product.SKU}</div>}
        {isBuyer && <div style={{ color: '#BDBDBD', fontSize: '12px' }}>{product.StoreId}</div>}
        <div>
          <CardIcon color={'#757575'} /> ${product.WholesalePrice.toFixed(2)}&nbsp;&nbsp;
          <ShipIcon color={'#757575'} /> ${product.ShippingFee.toFixed(2)}&nbsp;&nbsp;
          <span style={{ color: '#757575', fontWeight: 600 }}>INV</span> {product.Inventory}&nbsp;
        </div>
      </div>
    </Paper>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  isBuyer: PropTypes.bool,
  onAddToCart: PropTypes.func,
};

ProductCard.contextTypes = {
  theme: PropTypes.object,
};

export default ProductCard;
