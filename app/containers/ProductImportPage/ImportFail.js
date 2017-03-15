import React, { PropTypes } from 'react';
import _ from 'underscore';
import H2 from '../../components/styled/H2';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import SadFaceIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';

function renderErrors(errors) {
  return _.map(errors, (error, i) => (
    <TableRow key={i}>
      <TableRowColumn style={{ width: '10%' }}>{error.row}</TableRowColumn>
      <TableRowColumn style={{ width: '10%' }}>{String.fromCharCode(error.col + 64)}</TableRowColumn>
      <TableRowColumn style={{ width: '80%' }}>{error.error}</TableRowColumn>
    </TableRow>
  ));
}

function ImportFail(props) {
  return (
    <div>
      <div style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <SadFaceIcon style={{ height: '50px', width: '50px', color: '#F7E967' }} />
        <H2> Dang! </H2>
        <p>{'Something isn\'t quite right with your data. See below for more details. Please open your spreadsheet and follow along as you review errors.'}</p>
      </div>
      {
        props.fileError ?
          <div>
            <h6 style={{ color: '#9E9E9E', marginBottom: '5px' }}>File Error</h6>
            <Divider />
            <p> {props.fileError}</p>
          </div> : null
      }
      { props.dataErrors.length > 0 ?
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
            {renderErrors(props.dataErrors)}
          </TableBody>
        </Table> : null
      }
    </div>
  );
}

ImportFail.propTypes = {
  dataErrors: PropTypes.array,
  fileError: PropTypes.string,
};

export default ImportFail;
