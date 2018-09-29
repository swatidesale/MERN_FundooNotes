import axios from 'axios';
// import $ from 'jquery';
var dateFormat = require('dateformat');

// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;

class NoteController {
    // reload() {
    //     $(document).ready(($) => {
    //         $(document).on('submit', '#submit-form', (event) => {
    //             event.preventDefault();
    //         });
    //     });

    //     $.ajax({
    //         url: "/home/notes",
    //         context: document.body,
    //         success: function(s,x) {
    //             $(this).html(s);
    //         }
    //     });

    //     $(document).ready(function() {
    //         $('#submit-form').delay(1000).load('/home/notes');
    //     });
    // }

    notesInGridView() {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = "27%";
        }
    }

    notesInListView() {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = "70%";
        }
    }

    onUpdateNote(key,note) {
        const ispin  = note.ispin;
        const isarchive = note.isarchive;
        const istrash = note.istrash;
        const background = note.background;
        const reminder = note.reminder;
        const notetitle = note.notetitle;
        const notedata = note.notedata;
        const label = note.label;
        const image = note.image;
        axios.put('/api/notes/notes/'+key, { notetitle, notedata, ispin, isarchive, istrash, background, reminder, label, image })
        .then((result) => {
            // history.push('/home/notes');
            // this.reload();
        });        
    }

    getToday(key, note) {
        var day = new Date();   
        var today = dateFormat(day,"mmm d, h:MM TT"); 
        note.reminder = today;
        
        this.onUpdateNote(key,note);
    }

    getTomorrow(key,note) {
        var day = new Date();   
        day.setDate(day.getDate()+1);
        var tomorrow = dateFormat(day,"mmm d, h:MM TT");
        note.reminder = tomorrow;

        this.onUpdateNote(key,note);
    }

    getNextWeek(key,note) { 
        var day = new Date();
        day.setDate(day.getDate() + (1 + 7 - day.getDay()) % 7);
        var nextMonday = dateFormat(day,"mmm d, h:MM TT");
        note.reminder = nextMonday;

        this.onUpdateNote(key,note);
    }

    handleDeleteReminder(key, data) {
        data.reminder = null;
        this.onUpdateNote(key,data);
    }

    isPinNote(key, data) {
        if( data.ispin === true) {
            data.ispin = false;
        }
        else {
            data.ispin = true;
        }
        this.onUpdateNote(key,data);
    }

    isArchiveNote(key, data) {
        if( data.isarchive === true) {
            data.isarchive = false;
        }
        else {
            data.isarchive = true;
        }
        this.onUpdateNote(key,data);
    }

    isTrashNote(key, data) {
        if( data.istrash === true) {
            data.istrash = false;
        }
        else {
            data.istrash = true;
        }
        this.onUpdateNote(key,data);
    }

    changeColor(key,note,btn) {
        if(btn === 1) {
            note.background = 'white';
        }
        else if(btn === 2) {
            note.background = 'rgb(255, 138, 128)';
        }
        else if(btn === 3) {
            note.background = 'rgb(255, 209, 128)';
        }
        else if(btn === 4) {
            note.background = 'rgb(255, 255, 141)';
        }
        else if(btn === 5) {
            note.background = 'rgb(204, 255, 144)';
        }
        else if(btn === 6) {
            note.background = 'rgb(167, 255, 235)';
        }
        else if(btn === 7) {
            note.background = 'rgb(128, 216, 255)';
        }
        else if(btn === 8) {
            note.background = 'rgb(130, 177, 255)';
        }
        else if(btn === 9) {
            note.background = 'rgb(179, 136, 255)';
        }
        else if(btn === 10) {
            note.background = 'rgb(248, 187, 208)';
        }
        else if(btn === 11) {
            note.background = 'rgb(215, 204, 200)';
        }
        else if(btn === 12) {
            note.background = 'rgb(207, 216, 220)';
        }
        else {
            note.background = 'white';
        }
        
        this.onUpdateNote(key,note);

        // return note;
    }

    onNoteEdit(title, notedata, key, data) {
        if(title !== null || notedata !== null) {
            data = {
                title: title,
                notedata: notedata
            }
            this.onUpdateNote(key, data);
        }
    }

    deleteForever(key, data) {
        axios.delete('/api/notes/notes/'+key, { })
        .then((result) => {
            // history.push('/home/notes');
            // this.reload();
        });    
    }
}

export default NoteController;