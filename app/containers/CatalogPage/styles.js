export default function getStyles() {
  return {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 12,
    },
    productNameColumn: { width: 530 },
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
