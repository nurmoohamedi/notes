import React, { Component } from "react";
import "../App.scss";
import filter_icon from "../assets/filter_2.png";
import trash_icon from "../assets/trash-bin.png";
import DarkMode from "./DarkMode";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleTagSearch = (tag) => {
    this.props.setSearchValue(tag);
  };

  handleChange = (e) => {
    this.props.setSearchValue(e.target.value);
  };

  togglePopup = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { notes, searchValue, setSearchValue } = this.props;
    const { isOpen } = this.state;
    
    let tags = [];
    notes?.forEach((note) => {
      tags = [...tags, ...(note?.tags || [])];
    });
    tags = [...new Set(tags)];

    return (
      <div className="site_top">
        <header className="header">
          <div className="header__title">Notes</div>
          <div className="header__darkMode">
            <DarkMode />
          </div>
        </header>
        <div className="search">
          <div className="search__bar">
            <input
              type="text"
              placeholder="Enter the keyword..."
              value={searchValue}
              onChange={this.handleChange}
            />
            <a className="search__clear" onClick={() => setSearchValue("")}> 
              <img src={trash_icon} alt="clear" />
            </a>
          </div>
          <div className="search__filter">
            <img src={filter_icon} alt="filter" onClick={this.togglePopup} />
          </div>
          {isOpen && (
            <div className="search__filter_tags" id="filter_popup">
              {tags.length === 0 ? (
                <p>You have no tags!</p>
              ) : (
                tags.map((tag) => (
                  <p key={tag} onClick={() => this.handleTagSearch(tag)}>
                    {tag}
                  </p>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBar;
