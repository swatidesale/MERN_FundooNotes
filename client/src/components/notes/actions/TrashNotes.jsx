import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
// import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import more from '../../../assets/icons/more.svg';
import axios from 'axios';
import $ from 'jquery';

class TrashNotes extends Component {
    constructor() {
        super();

        this.state = {
            anchorEl: null,
            notes: [],
            isPin: false
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/notes/notes')
          .then(res => {
            this.setState({ notes: res.data });
          })
        //   .catch((error) => {
        //     if(error.response.status === 401) {
        //       this.props.history.push("/login");
        //     }
        //   });

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

    onUpdateNote(key,note) {
        // const { notetitle, notedata, ispin, istrash, isarchive } = this.state;
        const ispin  = note.ispin;
        const isarchive = note.isarchive;
        const istrash = note.istrash;
        axios.put('/api/notes/notes/'+key, { ispin, isarchive, istrash })
        .then((result) => {
            // history.push('/home/notes');
            this.reload();
        });
    }


    reload() {
        // $(document).ready(($) => {
        //     $(document).on('submit', '#submit-form', (event) => {
        //         event.preventDefault();
        //     });
        // });

        $.ajax({
            url: "/home/trash",
            context: document.body,
            success: function(s,x) {
                $(this).html(s);
            }
        });

        // $(document).ready(function() {
        //     $('#submit-form').delay(1000).load('/home/notes');
        // });
    }

    deleteForever(key, data) {
        console.log("Inside delete");
        axios.delete('/api/notes/notes/'+key, { })
        .then((result) => {
            // history.push('/home/notes');
            this.reload();
        });    
    }

    handleDeleteLabel(key, data) {
        // labelCtrl.removeLabel(key, data);
    }

    render() {
        const { anchorEl } = this.state;
        // var trashNotesCount = [];
        return (
            this.state.notes.map((note) => {
                if (note.istrash === true && note.ispin === false) {
                    // trashNotesCount.push(data);
                    // localStorage.setItem("trashNotesCount", trashNotesCount.length);
                    return (
                        <form>
                            <div className="display-notes-div">
                            {/* {localStorage.getItem("trashNotesCount")} */}
                            <div id="div_element" className="displaynotes column ">
                                <Card style={{ width: '100%', backgroundColor:note.background, borderRadius:0}}>
                                    <div style={{ width: '90%', marginTop: 10, marginLeft: 10, fontWeight: 'bolder', position: 'relative' }}>
                                        <div style={{width:'80%', paddingBottom: 20, paddingTop: 10 }}>
                                            {note.notetitle}
                                        </div>
                                    </div>

                                    <div style={{ width: '100%', marginLeft: 10, marginBottom: 20,fontSize:20,opacity:0.7 }}>{note.notedata}</div>

                                    {/* {data.label ?
                                        <Chip
                                            label={data.label}
                                            onDelete={() => this.handleDeleteLabel(key, data)}
                                            style={{ borderRadius: 1, height: 24, marginLeft: 10, fontSize: 11 }}
                                        />
                                        :
                                        null
                                    } */}

                                    <div id="note-btns" style={{ width: 240, height: 40 }}>
                                        <IconButton name={note.key} color="primary" id="notebuttons"
                                            aria-owns={anchorEl ? 'simple-menu' : null}
                                            aria-haspopup="true"
                                            onClick={this.handleClick}
                                        >
                                            <img src={more} alt="more" id="noteicons" />
                                        </IconButton>

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={this.handleClose}
                                        >
                                            <MenuItem type="submit" id="menuitems" onClick={() => { this.handleClose(); this.deleteForever(note._id, note) }}>Delete forever</MenuItem>
                                            <MenuItem id="menuitems" onClick={() => { this.handleClose(); this.isTrashNote(note._id, note) }}>Restore</MenuItem>
                                        </Menu>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        </form>
                    );
                } else {
                    return (
                        <div>
                        </div>
                    )
                }
            })
        );
    }
}

export default TrashNotes;