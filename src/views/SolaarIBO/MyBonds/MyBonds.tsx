import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Zoom } from "@material-ui/core";
import styled from 'styled-components';
import { useIBOContextData } from "src/context/IBOContext";
import { Row } from './BondRow';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});



const TotalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-right: 16px;
`;

const TotalTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.25px;
  color: #999999;
  margin-bottom: 10px;
`;

const TotalValue = styled.div`
  font-weight: 500;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.25px;
  color: #FFFFFF;
  margin-bottom: 25px;
  margin-top: 20px;
  margin-left: 16px;
`;

export default function AcccessibleTable() {
  const classes = useStyles();
  const [zoomed, setZoomed] = useState(false);

  const { bondsRows, bondsTotalPrice } = useIBOContextData();
  console.log(bondsRows, 'bondsRows');
  return (
    <Zoom in={true} onEntered={() => setZoomed(true)}>
      <Paper className={`ohm-card my-bonds`}>
        <Title>My Bonds</Title>
        <TableContainer>
          <Table className={classes.table} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Bond</TableCell>
                <TableCell align="right">Rarity</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Value</TableCell>
                {/*<TableCell align="right">Protein&nbsp;(g)</TableCell>*/}
              </TableRow>
            </TableHead>
            <TableBody>
              {bondsRows.map((row) => (
                // <TableRow key={row.name}>
                //   <TableCell component="th" scope="row">
                //     {row.name}
                //   </TableCell>
                //   <TableCell align="right">{row.rariry}</TableCell>
                //   <TableCell align="right">{row.quantity}</TableCell>
                //   <TableCell align="right">{row.value}</TableCell>
                //   {/*<TableCell align="right">{row.protein}</TableCell>*/}
                // </TableRow>
                <Row row={row}></Row>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TotalWrap>
          <TotalTitle>
            Total Value
          </TotalTitle>
          <TotalValue>
            {bondsTotalPrice} SOLR
          </TotalValue>
        </TotalWrap>
      </Paper>
    </Zoom>
  );
}
