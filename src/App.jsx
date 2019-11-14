import React, { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResultBox from "./components/ResultBox";
import Footer from "./components/Footer";

import style from "./components/style/App.module.css";

function App() {
  const [data, setData] = useState([]);
  const [searching, setSearchState] = useState(false);
  const [inputError, setInputError] = useState("");

  //Checks for missing values in objects. Returns object without unnecessary data
  function prepareData(data) {
    const completeData = data.filter(item => {
      if (
        !item.trackId ||
        !item.artistName ||
        !item.trackName ||
        !item.trackCensoredName ||
        !item.previewUrl ||
        !item.artworkUrl100
      ) {
        return false;
      } else {
        return true;
      }
    });
    const cutData = completeData.map(item => {
      return {
        trackId: item.trackId,
        artistName: item.artistName,
        trackName: item.trackName,
        trackCensoredName: item.trackCensoredName,
        previewUrl: item.previewUrl,
        artworkUrl100: item.artworkUrl100
      };
    });
    return cutData;
  }

  //Uses ony "term" as search key
  async function searchAction(input) {
    setInputError("");
    if (!input) {
      setInputError("No input provided");
      return;
    }
    const safeInput = input.replace(" ", "+");
    const response = await fetch(
      `https://itunes.apple.com/search?term=${safeInput}&entity=song`
    );
    const data = await response.json();
    const preparedData = prepareData(data.results);

    setData(preparedData);
    setSearchState(true);
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.container}>
        <Header />
        <SearchBar searchAction={searchAction} />
        <ResultBox data={data} searching={searching} inputError={inputError} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
