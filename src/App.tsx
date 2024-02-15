import React from "react";
import "./choices.min.css";
import "./App.css";
import MainInput from "./components/MainInput/MainInput";
import usdtIcon from "./assets/USDT-icon.svg";
import rubIcon from "./assets/RUB-icon.svg";
import SubInput from "./components/SubInput";

const App = () => {
  return (
    <div className="background">
      <h1>Cryptocurrency Converter Calculator</h1>
      <div className="container">
        <MainInput />
        <div className="sub-input">
          <SubInput icon={usdtIcon} title="USDT" />
          <img src="/arrows.svg" alt="" />
          <SubInput icon={rubIcon} title="RUB" />
        </div>
        <div className="plaque">
          Created by: <a href="https://qxtool.dev">qxtool.dev</a>
        </div>
      </div>

      <div id="btc-img"></div>
      <div id="eth-img"></div>
    </div>
  );
};

export default App;
