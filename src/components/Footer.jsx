import React from "react";

import style from "./style/Footer.module.css";

export default function Footer() {
  return (
    <div className={style.bar}>
      <hr className={style.line} />
      <h4 className={style.text}>Powered by PGS</h4>
      <hr className={style.line} />
    </div>
  );
}
