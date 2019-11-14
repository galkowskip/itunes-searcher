import React from "react";

import logo from "./style/pgs-logo.png";
import style from "./style/Header.module.css";

export default function Header() {
  return (
    <div className={style.bar}>
      <div className={style.logo}>
        <img src={logo} alt="pgs-logo" />
      </div>
    </div>
  );
}
