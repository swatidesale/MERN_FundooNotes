import axios from 'axios';
import NoteController from './NoteController';

const noteCtrl = new NoteController();

class LabelController {
    deleteLabel(key) {
        axios.delete('/api/labels/labels/'+key, { })
        .then((result) => {
            // history.push('/home/notes');
            // this.reload();
        });    
    }

    onUpdateLabel(label,key) {
        const newlabel  = label;
        axios.put('/api/labels/labels/'+key, { newlabel })
        .then((result) => {
            // history.push('/home/notes');
            // this.reload();
        });        
    }

    editLabel(label,key) {
        if(label !== null)
        this.onUpdateLabel(label,key);
    }

    getLabel(key, note, label) {
        note.label = label.newlabel;
        noteCtrl.onUpdateNote(key,note);
    }

    handleDeleteLabel(key, note) {
        note.label = null;
        noteCtrl.onUpdateNote(key,note);
    }
}

export default LabelController;