import React from 'react';

const styles = {
  footer: {
    padding: '10px',
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    height: '45px',
    width: '100%',
    background: 'linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75))',
  },
};

function Footer() {
  return (
    <footer style={styles.footer}>
      &copy; Ruah Logistics
    </footer>
  );
}

export default Footer;
