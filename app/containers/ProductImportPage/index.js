/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  submitProductImport,
  downloadImportTemplate,
  uploadProductTemplateFile,
} from './actions';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import Menu from '../../components/partials/Menu';
import FlatButton from 'material-ui/FlatButton';
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';

class ProductImportPage extends Component {
  CSV_TEMPLATE_FILE = 'data:text/csv;charset=utf-8,SKU,ProductId,ProductIdType,ManufacturerName,ProductName,Brand,Description,Bullet_1_Title,Bullet_1_Content,Bullet_2_Title,Bullet_2_Content,Bullet_3_Title,Bullet_3_Content,Bullet_4_Title,Bullet_4_Content,Bullet_5_Title,Bullet_5_Content,Keywords,MainImageUri,AltImageUris,WholesalePrice,ShippingFee,Inventory,VariationGroupId,VariationTypes,Variations\r\n';

  render() {
    return (
      <article>
        <Helmet
          title="Product Import"
          meta={[
            { name: 'description', content: 'Product Import Page' },
          ]}
        />
        <Body>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 3, marginRight: 24 }}>
              <Menu />
            </div>
            <div style={{ flex: 9 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <FlatButton
                  href={this.CSV_TEMPLATE_FILE}
                  label="Get Template"
                  icon={<FileDownloadIcon />}
                  onClick={this.props.downloadImportTemplate}
                  labelPosition="before"
                />
                <FlatButton
                  containerElement="label"
                  label="Upload File"
                  icon={<FileUploadIcon />}
                  style={{ backgroundColor: '#A9CF54', color: 'white' }}
                  labelPosition="before"
                  onClick={this.openFileDialog}
                >
                  <input
                    ref={(node) => { this.fileInput = node; }}
                    type="file"
                    accept=".csv"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      this.props.uploadTemplateFile(event.target.files[0]);
                    }}
                  />
                </FlatButton>
              </div>
              <H2>Bulk Upload</H2>
              <p>Uploading your products via CSV upload is the fastest and most efficient way to get your products onto the Ruah network. Once your products are uploaded, they will immediately be available for sale across our network of powersellers and online stores, giving you instant product exposure.</p>
              <H2>The Upload Process</H2>
              <p>This upload guide will ensure that this process is as quick and painless for you as possible. The basic flow is as follows:</p>
              <ol>
                <li>
                  Click the <FlatButton label="Get Template" disabled style={{ color: 'black!important' }} icon={<FileDownloadIcon />} labelPosition="before" /> button on the top right of the screen. On click, a CSV import template will download to your computer.
                </li>
                <li>
                  Open the file in Excel or any other spreadsheet application you have.
                </li>
                <li>
                  Fill in the spreadsheet with your product information, following the format in the table below.
                </li>
                <li>
                  Save your work. Click the <FlatButton label="Upload File" disabled style={{ backgroundColor: '#A9CF54', color: 'white' }} icon={<FileUploadIcon />} labelPosition="before" /> button above to upload your file.
                </li>
                <li>
                  Our system will check your spreadsheet for errors. If everything is fine, you will be given a message notifying you of the successful upload. At that point your products are in the Ruah Marketplace. If there are errors, you will get a list of errors found in your spreadsheet which you will need to fix in your file.
                </li>
              </ol>
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

ProductImportPage.propTypes = {
  downloadImportTemplate: PropTypes.func.isRequired,
  uploadTemplateFile: PropTypes.func.isRequired,
};

ProductImportPage.contextTypes = {
  router: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    importProduct: () => {
      dispatch(submitProductImport());
    },
    downloadImportTemplate: () => {
      dispatch(downloadImportTemplate());
    },
    uploadTemplateFile: (csvData) => {
      dispatch(uploadProductTemplateFile(csvData));
    },
  };
}

// user selectors
const mapStateToProps = createStructuredSelector({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductImportPage);
