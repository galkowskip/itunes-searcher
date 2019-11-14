import React from "react";

import style from "./style/SongCard.module.css";

export default function SongCard(props) {
  //Some songs have censored name. This function makes sure explicit names are not used
  function trackNameCensor() {
    if (props.item.trackName === props.item.trackCensoredName) {
      return props.item.trackName;
    } else {
      return props.item.trackCensoredName;
    }
  }

  return (
    <div className={style.card}>
      <div className={style.contentContainer}>
        <img
          className={style.img}
          src={props.item.artworkUrl100}
          alt="No artwork found"
        />
      </div>
      <div className={style.contentContainer}>
        <h5 className={style.text}>{trackNameCensor()}</h5>
        <hr />
        <small className={style.text}>By {props.item.artistName}</small>
      </div>
    </div>
  );
}
