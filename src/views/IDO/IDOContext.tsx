import React, { useState, useReducer, useMemo, useContext, createContext, useCallback } from "react";

// @ts-ignore
export const Context = createContext();

export const Actions = {
  GET_DATA: "getData",
};

const IDOInitialState = {
  salePriceGaia: 0,
  maxAllotment: 0,
  offeringAmount: 0,
  endOfSaleTime: 0,
  countBoughtTokens: 0,
  isSaleFinished: false,
  startOfSaleTime: 0,
  purchasedAmount: 0
};

export const IDOReducer = (state: any, action: any = {}) => {
  switch (action.type) {
    case Actions.GET_DATA: {
      return {
        ...state,
        ...action.data
      };
    }
    default: {
      return state;
    }
  }
};

export const IDOProvider = ({ children }: any) => {
  const [IDOState, dispatch] = useReducer(IDOReducer, IDOInitialState);


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


  const contextValue = {
    ...IDOState,
    getData
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useIDOContextData = (): any => {
  const data = useContext(Context);
  return data;
};
