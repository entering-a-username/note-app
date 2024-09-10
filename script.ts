(function() {
    const btn = document.getElementById("btn") as HTMLButtonElement;
    const appEl = document.getElementById("app") as HTMLDivElement;


    btn.addEventListener("click", addNote);

    getNotes().forEach(note => {
        const noteEl = createNoteEl(note.id, note.content);
        appEl.insertBefore(noteEl, btn);
    });

    function addNote() {
        const notes = getNotes();

        const noteObj = {
            id: Math.floor(Math.random() * 100000),
            content: "",
        };

        console.log(noteObj);
        
        const noteEl = createNoteEl(noteObj.id, noteObj.content); // destructure?
        appEl.insertBefore(noteEl, btn);

        notes.push(noteObj);
        console.log(noteObj);
        

        saveNote(notes);
    }

    function createNoteEl(id, content) {
        const element = document.createElement("textarea") as HTMLTextAreaElement;
        element.classList.add("note");
        element.placeholder = "Empty note";
        element.value = content;

        element.addEventListener("dblclick", () => {
            const warning = confirm("Do you want to delete this note?");
            if (warning) {
                deleteNote(id, element);
            }
        })

        element.addEventListener("input", () => {
            updateNote(id, element.value);
        })

        return element;
    }

    function deleteNote(id, element) {
        const notes = getNotes().filter(note => note.id != id); // everything except that one
        saveNote(notes);
        appEl.removeChild(element);
    }

    function updateNote(id, content) {
        const notes = getNotes();
        const target = notes.filter(note => note.id == id)[0];
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