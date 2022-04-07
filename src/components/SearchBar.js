import React, {useState} from "react";
import "../App.scss";
import filter_icon from "../assets/filter_2.png"
import DarkMode from "./DarkMode";

const SearchBar = ({notes, searchValue, setSearchValue}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleTagSearch = (tag) => {
        setSearchValue(tag)
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    const popup = () => {
        setIsOpen(prevState => !prevState)
    }

    // const tags = notes.filter()

    const tags = []

    for(let note of notes){
        for (let tag of note.tags)
            tags.push(tag)
    }

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
                    <input type="text" placeholder="Enter the keyword..." value={searchValue} onChange={handleChange}/>
                </div>
                <div className="search__filter">
                    <img src={filter_icon} alt="filter" onClick={() => popup()}/>
                </div>
                {isOpen &&
                    <div className={"search__filter_tags"} id="filter_popup">
                        {
                            tags.length === 0
                                ? <p>You have no tags!</p>
                                : tags.map(tag => {
                                        return (<p key={tag} onClick={() => handleTagSearch(tag)}>{tag}</p>)
                                    }
                                )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchBar;