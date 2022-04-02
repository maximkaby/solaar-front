import React, { useState, useReducer, useMemo, useContext, createContext, useCallback } from "react";
import { BOND_TYPES, BOND_TYPES_BY_NAME } from "../constants";
import { createData } from "src/helpers";
// @ts-ignore
export const Context = createContext();

export const Actions = {
  GET_DATA: "getData",
  GET_BONDS_INFO: 'GET_BONDS_INFO',
};

const initialRows = [
  createData('UST', 'Common', 0, '0 SOLR'),
  createData('UST', 'Rare', 0, '0 SOLR'),
  createData('UST', 'Legendary', 0, '0 SOLR'),
];

const IBOInitialState = {
  bondsTotal: 0,
  bondsSold: 0,
  bondPrice: 0,
  bondsOwnershipLimit: 0,
  bondsPurchased: 0,
  bondsRows: initialRows,
  bondsTotalPrice: 0,
  imagesUri: 'https://solaar-images-dev.s3.amazonaws.com',
  tokenIdsByType: {}
};



export const IBOReducer = (state: any, action: any = {}) => {
  switch (action.type) {
    case Actions.GET_DATA: {
      return {
        ...state,
        ...action.data
      };
    }
    case Actions.GET_BONDS_INFO: {
      const bondsCount = {
        common: 0,
        rare: 0,
        legendary: 0,
      };

      const bondCountByTypes = action.data.reduce((acc, type) => {
        switch (type) {
          case BOND_TYPES.COMMON:
            acc.common += 1;
            break;
          case BOND_TYPES.RARE:
            acc.rare += 1;
            break;
          case BOND_TYPES.LEGENDARY:
            acc.legendary += 1;
            break;
          default:
            break;
        }
        return acc;
      }, bondsCount);

      const bondsTotalPrice = bondsCount.common * 200 +
        bondsCount.rare * 400 +
        bondsCount.legendary * 800;

      return {
        ...state,
        bondsRows: [
          createData('UST', 'Common', bondsCount.common, `${bondsCount.common * 200} SOLR`, BOND_TYPES.COMMON),
          createData('UST', 'Rare', bondsCount.rare, `${bondsCount.rare * 400} SOLR`, BOND_TYPES.RARE),
          createData('UST', 'Legendary', bondsCount.legendary, `${bondsCount.legendary * 800} SOLR`, BOND_TYPES.LEGENDARY),
        ],
        bondsTotalPrice
      };
    }
    default: {
      return state;
    }
  }
};

export const IBOProvider = ({ children }: any) => {
  const [IBOState, dispatch] = useReducer(IBOReducer, IBOInitialState);


  const getData = useCallback(
    (data) => {
      // @ts-ignore
      dispatch({
        type: Actions.GET_DATA,
        data
      });
    },
    [dispatch]
  );

  const getBondsInfo = useCallback(
    (data) => {
      // @ts-ignore
      dispatch({
        type: Actions.GET_BONDS_INFO,
        data
      });
    },
    [dispatch]
  );


  const contextValue = {
    ...IBOState,
    getData,
    getBondsInfo
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useIBOContextData = (): any => {
  const data = useContext(Context);
  return data;
};
