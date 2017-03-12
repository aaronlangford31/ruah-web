/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import {
  uploadProductTemplateFile,
} from './actions';
import {
  selectUploadingToServer,
  selectUploadedToServer,
  selectUploadToServerFailed,
  selectUploadDataErrors,
  selectUploadFileError,
} from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import Menu from '../../components/partials/Menu';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import SadFaceIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import HappyFaceIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied';

function ImportActions(properties) {
  if (!properties.shouldRender) {
    return null;
  }
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
            properties.onUpload(event.target.files[0]);
          }}
        />
      </FlatButton>
    </div>
  );
}

function ImportGuide(properties) {
  if (!properties.shouldRender) {
    return null;
  }
  return (
    <div>
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
  );
}

function ImportUploading(properties) {
  if (!properties.shouldRender) {
    return null;
  }

  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <CircularProgress color="#A9CF54" mode="indeterminate" size={80} />
      <p>Validating your data...</p>
    </div>
  );
}

function ImportSuccess(properties) {
  if (!properties.shouldRender) {
    return null;
  }

  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <HappyFaceIcon style={{ height: '50px', width: '50px', color: '#A9CF54' }} />
      <H2> Congratulations! </H2>
      <p>Your products are now listed on the Ruah Marketplace.</p>
    </div>
  );
}

function renderErrors(errors) {
  return _.map(errors, (error, i) => (
    <TableRow key={i}>
      <TableRowColumn style={{ width: '10%' }}>{error.row}</TableRowColumn>
      <TableRowColumn style={{ width: '10%' }}>{String.fromCharCode(error.col + 64)}</TableRowColumn>
      <TableRowColumn style={{ width: '80%' }}>{error.error}</TableRowColumn>
    </TableRow>
  ));
}

function ImportFail(properties) {
  if (!properties.shouldRender) {
    return null;
  }
  return (
    <div>
      <div style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <SadFaceIcon style={{ height: '50px', width: '50px', color: '#F7E967' }} />
        <H2> Dang! </H2>
        <p>{'Something isn\'t quite right with your data. See below for more details. Please open your spreadsheet and follow along as you review errors.'}</p>
      </div>
      {
        properties.fileError ?
          <div>
            <h6 style={{ color: '#9E9E9E', marginBottom: '5px' }}>File Error</h6>
            <Divider />
            <p> {properties.fileError}</p>
          </div> : null
      }
      { properties.dataErrors ?
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn style={{ width: '10%' }}>Row</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%' }}>Column</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '80%' }}>Error</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {renderErrors(properties.dataErrors)}
          </TableBody>
        </Table> : null
      }
    </div>
  );
}

const ProductImportPage = (props) => (
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
          <ImportActions
            shouldRender={!props.uploadingToServer && !props.uploadSuccess && !props.uploadFail}
            onUpload={props.uploadTemplateFile}
          />
          <div>
            <ImportGuide shouldRender={!(props.uploadingToServer || props.uploadSuccess || props.uploadFail)} />
            <ImportUploading shouldRender={props.uploadingToServer} />
            <ImportSuccess shouldRender={props.uploadSuccess} />
            <ImportFail
              shouldRender={props.uploadFail}
              dataErrors={props.dataErrors}
              fileError={props.fileError}
            />
          </div>
        </div>
      </div>
    </Body>
  </article>
);

ProductImportPage.propTypes = {
  uploadTemplateFile: PropTypes.func.isRequired,
  uploadingToServer: PropTypes.bool,
  uploadSuccess: PropTypes.bool,
  uploadFail: PropTypes.bool,
  dataErrors: PropTypes.array,
  fileError: PropTypes.string,
};

ProductImportPage.contextTypes = {
  router: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    uploadTemplateFile: (csvData) => {
      dispatch(uploadProductTemplateFile(csvData));
    },
  };
}

// user selectors
const mapStateToProps = createStructuredSelector({
  uploadingToServer: selectUploadingToServer(),
  uploadSuccess: selectUploadedToServer(),
  uploadFail: selectUploadToServerFailed(),
  dataErrors: selectUploadDataErrors(),
  fileError: selectUploadFileError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductImportPage);
