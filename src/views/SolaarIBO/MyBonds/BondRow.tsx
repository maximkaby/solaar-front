import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styled from "styled-components";
import { useIBOContextData } from "../../../context/IBOContext";
import Loader from 'src/components/Loader';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

const IconButtonArrows = styled(IconButton)`
  color: white!important;
`;

const NFTWrap = styled.div`
  max-height: 500px;
  overflow: scroll;
`;

const ImageNFT = styled.img`
  height: 300px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  margin-bottom: 5px;
`;

const NFTItem = styled.div`
  min-width: 50%;
`;

const ImageNFTWrap = styled.div`
  flex-basis: 50%;
`;

const NFTListContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ImageLoading = ({ src }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <ImageNFTWrap>
      {loaded ? null : (
        <Loader />
      )}
      <ImageNFT
        style={loaded ? {} : { display: 'none' }}
        src={src}
        onLoad={() => setLoaded(true)}
      />
    </ImageNFTWrap>
  );
};

export function Row(props) {
  const { row = {} } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const { imagesUri, tokenIdsByType } = useIBOContextData();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButtonArrows aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButtonArrows>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.rariry}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.value}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <NFTWrap>
              <Typography variant="h6" gutterBottom component="div">
                Bonds NFT
              </Typography>
              <NFTListContainer>
                {(tokenIdsByType[row.type] || []).map((id) => {
                  return (
                    <NFTItem>
                      <Title>Bond Number {id}</Title>
                      <ImageLoading src={`${imagesUri}/${id}.png`} alt="" />
                    </NFTItem>
                  )
                })}
              </NFTListContainer>
            </NFTWrap>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
