function getStyles() {
  const baseStyle = {
    textAlign: 'center',
    fontSize: 12,
  };
  return ({
    new: [
      baseStyle,
      {
        width: 50,
      },
    ],
    processing: [
      baseStyle,
      {
        width: 50,
      },
    ],
    shipped: [
      baseStyle,
      {
        width: 60,
      },
    ],
  });
}

export default getStyles;
