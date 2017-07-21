import React from 'react';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

export default function ImportUploading() {
  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <CircularProgress color="#A9CF54" mode="indeterminate" size={80} />
      <p>Validating your data...</p>
    </div>
  );
}
