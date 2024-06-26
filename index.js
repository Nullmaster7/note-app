
'use-strict'

const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");
const timeEl = document.getElementById("time");
const now = new Date();
const currentDateTime = now.toLocaleDateString();

timeEl.innerText = ("Date: " + currentDateTime);

getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content)
    appEl.insertBefore(noteEl, btnEl);
});

function createNoteEl(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note ?");
        if (warning) {
            deleteNote(id, element);
        }
    })

    element.addEventListener("input", () => {
        updateNote(id, element.value)
    })

    return element;
}

function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNoteLocalStr(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
    saveNoteLocalStr(notes);
    appEl.removeChild(element);
}

function addNote() {

    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    };

    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);

    notes.push(noteObj);

    saveNoteLocalStr(notes);
}

function saveNoteLocalStr(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btnEl.addEventListener("click", addNote);