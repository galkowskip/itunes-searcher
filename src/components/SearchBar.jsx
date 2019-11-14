import React, { useState } from "react";

import style from "./style/SearchBar.module.css";

export default function SearchBar(props) {
  const [input, setInput] = useState("");

  function submitSearchForm(e) {
    e.preventDefault();
    props.searchAction(input);
  }

  return (
    <div className={style.bar}>
      <h4 className={style.topText}>iTunes api example</h4>
      <form className={style.inputGroup} onSubmit={submitSearchForm}>
        <input
          type="text"
          placeholder="Search songs.."
          onChange={e => setInput(e.target.value)}
          className={style.textInput}
        />
        <input className={style.inputButton} type="submit" value="search" />
      </form>
      <p className={style.bottomText}>
        Search by song title, author, song number, lyrics, catalog or copyright
        owner
      </p>
    </div>
  );
}
