export default function getStyles(props, theme) {
  return {
    productGroupHeader: {
      backgroundColor: theme.getIn(['colors', 'lightGray']),
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    productImage: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: 50,
      width: 50,
    },
    productImageEmpty: {
      background: 'repeating-linear-gradient(45deg,transparent,transparent 10px,#ccc 10px,#ccc 20px)',
      height: '100%',
    },
  };
}
