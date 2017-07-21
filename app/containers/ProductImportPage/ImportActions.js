import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';

function ImportActions({ onUpload }) {
  const CSV_TEMPLATE_FILE = 'data:text/csv;charset=utf-8,SKU,ProductId,ProductIdType,ManufacturerName,ProductName,Brand,Description,Bullet_1_Title,Bullet_1_Content,Bullet_2_Title,Bullet_2_Content,Bullet_3_Title,Bullet_3_Content,Bullet_4_Title,Bullet_4_Content,Bullet_5_Title,Bullet_5_Content,Keywords,MainImageUri,AltImageUris,WholesalePrice,ShippingFee,Inventory,VariationGroupId,VariationTypes,Variations\r\n';
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
      <FlatButton
        href={CSV_TEMPLATE_FILE}
        label="Get Template"
        icon={<FileDownloadIcon />}
        labelPosition="before"
      />
      <FlatButton
        containerElement="label"
        label="Upload File"
        icon={<FileUploadIcon />}
        style={{ backgroundColor: '#A9CF54', color: 'white' }}
        labelPosition="before"
      >
        <input
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={(event) => {
            onUpload(event.target.files[0]);
          }}
        />
      </FlatButton>
    </div>
  );
}

ImportActions.propTypes = {
  onUpload: PropTypes.func,
};

export default ImportActions;
