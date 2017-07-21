import React from 'react';
import HappyFaceIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import H2 from '../../components/styled/H2';

function ImportSuccess() {
  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <HappyFaceIcon style={{ height: '50px', width: '50px', color: '#A9CF54' }} />
      <H2> Congratulations! </H2>
      <p>Your products are now listed on the Ruah Marketplace.</p>
    </div>
  );
}

export default ImportSuccess;
