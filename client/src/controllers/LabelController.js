import axios from 'axios';

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
}

export default LabelController;