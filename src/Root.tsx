/* eslint-disable global-require */
import { FC, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Web3ContextProvider } from "./hooks/web3Context";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { initLocale } from "./locales";

import App from "./App";
import store from "./store";
import IDO from 'src/views/IDO';
import Landing from "src/views/Landing/Landing";

const Root: FC = () => {
  useEffect(() => {
    initLocale();
  }, []);

  const getApp = () => {
    // if (window.location.host.includes('app')) {
    if (true) {
      return <App />;
    }
    if (window.location.host.includes('ido')) {
    // if (true) {
      return <IDO />;
    }

    return <Landing />;
  }


  return (
    <Web3ContextProvider>
      <Provider store={store}>
        <I18nProvider i18n={i18n}>
          <BrowserRouter basename={"/#"}>
            {getApp()}
          </BrowserRouter>
        </I18nProvider>
      </Provider>
    </Web3ContextProvider>
  );
};

export default Root;
