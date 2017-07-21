import React from 'react';
import H2 from '../../components/styled/H2';
import FlatButton from 'material-ui/FlatButton';
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';

function ImportGuide() {
  return (
    <div>
      <H2>Bulk Upload</H2>
      <p>Uploading your products via CSV upload is the fastest and most efficient way to get your products onto the Ruah network. Once your products are uploaded, they will immediately be available for sale across our network of powersellers and online stores, giving you instant product exposure.</p>
      <H2>The Upload Process</H2>
      <p>This upload guide will ensure that this process is as quick and painless for you as possible. The basic flow is as follows:</p>
      <ol>
        <li>
          Click the
          <FlatButton
            label="Get Template"
            disabled
            style={{ color: 'black!important' }}
            icon={<FileDownloadIcon />}
            labelPosition="before"
          /> button on the top right of the screen. On click, a CSV import template will download to your computer.
        </li>
        <li>
          Open the file in Excel or any other spreadsheet application you have.
        </li>
        <li>
          Fill in the spreadsheet with your product information, following the format in the table below.
        </li>
        <li>
          Save your work. Click the
          <FlatButton
            label="Upload File"
            disabled
            style={{
              backgroundColor: '#A9CF54',
              color: 'white',
            }}
            icon={<FileUploadIcon />}
            labelPosition="before"
          /> button above to upload your file.
        </li>
        <li>
          Our system will check your spreadsheet for errors. If everything is fine, you will be given a message notifying you of the successful upload. At that point your products are in the Ruah Marketplace. If there are errors, you will get a list of errors found in your spreadsheet which you will need to fix in your file.
        </li>
      </ol>
    </div>
  );
}

export default ImportGuide;
