import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import ShipIcon from 'material-ui/svg-icons/maps/local-shipping';
import CardIcon from 'material-ui/svg-icons/action/credit-card';

const styles = {
  productImage: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 240,
    width: 240,
  },
  productImageEmpty: {
    background: 'repeating-linear-gradient(45deg,transparent,transparent 10px,#ccc 10px,#ccc 20px)',
    height: '100%',
  },
};

const ProductCard = (props) => {
  const { product } = props;
  return (
    <Paper style={{ margin: '5px', width: '240px', height: '340px', display: 'flex', flexDirection: 'column' }} >
      <div
        style={product.MainImageUri ? {
          ...styles.productImage,
          backgroundImage: `url(${product.MainImageUri})`,
        } : styles.productImageEmpty}
      />
      <div style={{ padding: '5px' }}>
        <div style={{ margin: '0', color: '#04BFBF' }}>
          {product.ProductName.substr(0, 48)}{product.ProductName.length > 48 ? <span>&hellip;</span> : '' }
        </div>
        <div style={{ color: '#BDBDBD', fontSize: '12px' }}>{product.SKU}</div>
        <div>
          <CardIcon /> ${product.WholesalePrice.toFixed(2)} <ShipIcon /> ${product.ShippingFee.toFixed(2)}
        </div>
      </div>
    </Paper>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

ProductCard.contextTypes = {
  theme: PropTypes.object,
};

export default ProductCard;
