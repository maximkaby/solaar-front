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


const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

function createData(name, rariry, quantity, value) {
  return { name, rariry, quantity, value };
}

const rows = [
  createData('Common', '85%', 5330, '200 SOLR'),
  createData('Rare', '10%',300, '400 SOLR'),
  createData('Legendary', '5%',80, '800 SOLR'),
];

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

const DescriptionWrap = styled.div`
  margin-bottom: 15px;
  li {
    font-weight: 500;
    font-size: 15px;
    margin: 5px 0;
    letter-spacing: 0.25px;
    color: #FFFFFF;
  }
`;

export default function AcccessibleTable() {
  const classes = useStyles();
  const [zoomed, setZoomed] = useState(false);

  return (
    <Zoom in={true} onEntered={() => setZoomed(true)}>
      <Paper className={`ohm-card my-bonds-info`}>
        <Title>About Initial Bond Offering</Title>
        <DescriptionWrap>
          <ul>
            <li>IBO Launch Date: 2th April 2022 at 6pm UTC / 11am EST until bonds are sold out.</li>
            <li>200 UST price per bond with a chance to receive a 400 or 800 UST bond!</li>
            <li>Vesting Period: Linearly released over 7 days from activation date</li>
          </ul>
        </DescriptionWrap>
        <TableContainer>
          <Table className={classes.table} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Rarity</TableCell>
                <TableCell align="right">Chance</TableCell>
                <TableCell align="right">Bonds</TableCell>
                <TableCell align="right">Value</TableCell>
                {/*<TableCell align="right">Protein&nbsp;(g)</TableCell>*/}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.rariry}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  {/*<TableCell align="right">{row.protein}</TableCell>*/}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Zoom>
  );
}
