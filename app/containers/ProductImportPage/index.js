/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {
  uploadProductTemplateFile,
} from './actions';
import selectProductImportPage from './selectors';
import Body from '../../components/styled/Body';
import Menu from '../../components/partials/Menu';
import ImportActions from './ImportActions';
import ImportFail from './ImportFail';
import ImportGuide from './ImportGuide';
import ImportSuccess from './ImportSuccess';
import ImportUploading from './ImportUploading';

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
        <div>
          <Menu />
        </div>
        <div style={{ flex: 10 }}>
          {!props.uploadingToServer && !props.uploadSuccess && !props.uploadFail && <ImportActions
            onUpload={props.uploadTemplateFile}
          />}
          <div>
            {!(props.uploadingToServer || props.uploadSuccess || props.uploadFail) && <ImportGuide />}
            {props.uploadingToServer && <ImportUploading />}
            {props.uploadSuccess && <ImportSuccess />}
            {props.uploadFail && <ImportFail
              dataErrors={props.dataErrors}
              fileError={props.fileError}
            />}
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

export function mapDispatchToProps(dispatch) {
  return {
    uploadTemplateFile: (csvData) => {
      dispatch(uploadProductTemplateFile(csvData));
    },
  };
}

// user selectors
const mapStateToProps = selectProductImportPage();

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ProductImportPage);
