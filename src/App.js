import "./App.scss";
import SearchBar from "./components/SearchBar";
import NoteContainer from "./components/NoteContainer";
import {useEffect, useState} from "react";
import DarkMode from "./components/DarkMode";

const notesList = [
    {
        id: 1,
        text: "Hi there!",
        createdDate: "05-04-2022",
        tags: ["#cool", "#awesome"]
    },
    {
        id: 2,
        text: "Damn I love Coding!",
        createdDate: "08-01-2022",
        tags: ["#coding"]
    }
];

const App = () => {

    const [notes, setNotes] = useState(localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : notesList);
    const [searchValue, setSearchValue] = useState("");
    const [searchNotes, setSearchNotes] = useState([]);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes || []));
    }, [notes])
    
    const addNote = (note) => {
        setNotes([...notes, note])
    }
    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id))
    }
    const updateNote = (id, text) => {
        let newNotes = [...notes]
        newNotes = newNotes.map(note => {
            if (note.id === id) {
                note.text = text
            }
            return note;
        })
        setNotes(newNotes)
    }

    const addTag = (id, value) => {
        if (value.length === 0)
            return

        let tags = value.split(" ");
        tags = tags.map(tag => "#" + tag)

        let tagNotes = [...notes]
        tagNotes = tagNotes.map(note => {
            if (note.id === id) {
                note.tags = [...note.tags, ...tags]
            }
            return note;
        })
        setNotes(tagNotes)
        console.log(tagNotes)
    }
    const deleteTag = (id, value) => {
        debugger
        let tagNotes = [...notes]
        tagNotes = tagNotes.map(note => {
            if (note.id === id) {
                debugger
                note.tags = note.tags.filter(tag => tag !== value)
            }
            return note;
        })
        setNotes(tagNotes)

    }

    const search = (searchValue) => {
        let searchedNotes = []
        if (searchValue.includes("#")) {
            for (let i = 0; i < notes.length; i++) {
                for (let j = 0; j < notes[i].tags.length; j++)
                    if (notes[i].tags[j].includes(searchValue))
                        searchedNotes.push(notes[i])
            }
            // setSearchNotes(notes.filter(note => {
            //     return note.tags.filter(tag => tag === searchValue)
            // }))
        } else {
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].text.toLowerCase().includes(searchValue.toLowerCase()))
                    searchedNotes.push(notes[i])
            }
            // setSearchNotes(notes.filter(note => note.text.contains(searchValue)))
        }
        setSearchNotes(searchedNotes);
    }

    useEffect(() => search(searchValue), [searchValue])

    return (
        <>
            <div className="wrapper">
                <SearchBar
                    notes={notes}
                    searchValue={searchValue} setSearchValue={setSearchValue}
                />
                <NoteContainer
                    notes={searchValue?.length === 0 ? notes : searchNotes} addNote={addNote} deleteNote={deleteNote}
                    updateNote={updateNote}
                    addTag={addTag} deleteTag={deleteTag}
                />

                <div className="footer">
                    Made By <span>Nurmoohamedi</span>
                    <p>Copyright © 2022 Noor Inc.</p>
                </div>
            </div>
        </>
    )
}

export default App;