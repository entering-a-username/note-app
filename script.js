(function () {
    var btn = document.getElementById("btn");
    var appEl = document.getElementById("app");
    btn.addEventListener("click", addNote);
   
    getNotes().forEach(function (note) {
        var noteEl = createNoteEl(note.id, note.content);
        appEl.insertBefore(noteEl, btn);
    });
    
    function addNote() {
        var notes = getNotes();
        var noteObj = {
            id: Math.floor(Math.random() * 100000),
            content: "",
        };
        console.log(noteObj);
        var noteEl = createNoteEl(noteObj.id, noteObj.content); // destructure?
        appEl.insertBefore(noteEl, btn);
        notes.push(noteObj);
        console.log(noteObj);
        saveNote(notes);
    }
    function createNoteEl(id, content) {
        var element = document.createElement("textarea");
        element.classList.add("note");
        element.placeholder = "Empty note";
        element.value = content;
        element.addEventListener("dblclick", function () {
            var warning = confirm("Do you want to delete this note?");
            if (warning) {
                deleteNote(id, element);
            }
        });
        element.addEventListener("input", function () {
            updateNote(id, element.value);
        });
        return element;
    }
    function deleteNote(id, element) {
        var notes = getNotes().filter(function (note) { return note.id != id; }); // everything except that one
        saveNote(notes);
        appEl.removeChild(element);
    }
    function updateNote(id, content) {
        var notes = getNotes();
        var target = notes.filter(function (note) { return note.id == id; })[0];
        target.content = content;
        saveNote(notes);
    }
    function saveNote(notes) {
        localStorage.setItem("note-app", JSON.stringify(notes));
    }
    function getNotes() {
        return JSON.parse(localStorage.getItem("note-app") || "[]");
    }
})();
