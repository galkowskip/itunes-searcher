import React, { Component } from "react";
import SongCard from "./SongCard";

import style from "./style/ResultBox.module.css";

export default class ResultBox extends Component {
  constructor() {
    super();

    this.state = {
      activePage: 1,
      lastItem: 9
    };

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data) {
      this.setState({ activePage: 1 });
      this.setLastItem();
    }
  }

  //Calculates whitch item will be the last one to render
  setLastItem() {
    this.setState({ lastItem: this.state.activePage * 9 });
  }

  //Returns message with array.length or no matches
  countSongs() {
    if (this.props.inputError) {
      return this.props.inputError;
    }
    if (!this.props.searching) {
      return null;
    } else {
      if (!this.props.data.length) {
        return "Sorry, no matches found";
      } else {
        return `Found ${this.props.data.length} songs`;
      }
    }
  }

  //Returns 9 objects to render on page
  getActiveSongs() {
    return this.props.data.slice(this.state.lastItem - 9, this.state.lastItem);
  }

  //Creates SongCard for each item in active array
  createSongCards() {
    if (this.props.data) {
      const slicedItems = this.getActiveSongs();

      return slicedItems.map(item => {
        return <SongCard item={item} key={item.trackId}></SongCard>;
      });
    } else {
      return null;
    }
  }

  canGoToPrevPage() {
    if (this.state.activePage > 1) {
      return true;
    } else {
      return false;
    }
  }

  canGoToNextPage() {
    if (this.props.data.length / 9 > this.state.activePage) {
      return true;
    } else {
      return false;
    }
  }

  async nextPage() {
    if (this.canGoToNextPage()) {
      await this.setState({ activePage: this.state.activePage + 1 });
      this.setLastItem();
    }
  }

  async prevPage() {
    if (this.canGoToPrevPage()) {
      await this.setState({ activePage: this.state.activePage - 1 });
      this.setLastItem();
    }
  }
  //Creates relevant Next and Prev buttons. If there is no previous page, prev button won't render
  createPageControlButtons() {
    if (this.canGoToPrevPage() && this.canGoToNextPage()) {
      return (
        <div className={style.buttonContainer}>
          <button className={style.controlButton} onClick={this.prevPage}>
            {"<<"} prev
          </button>
          <button className={style.controlButton} onClick={this.nextPage}>
            next {">>"}
          </button>
        </div>
      );
    }
    if (this.canGoToNextPage()) {
      return (
        <div className={style.buttonContainer}>
          <div></div>
          <button className={style.controlButton} onClick={this.nextPage}>
            next {">>"}
          </button>
        </div>
      );
    }
    if (this.canGoToPrevPage()) {
      return (
        <div className={style.buttonContainer}>
          <button className={style.controlButton} onClick={this.prevPage}>
            {"<<"} prev
          </button>
          <div></div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className={style.container}>
        <p className={style.textLine}>{this.countSongs()}</p>
        <div className={style.songsContainer}>{this.createSongCards()}</div>
        {this.createPageControlButtons()}
      </div>
    );
  }
}
