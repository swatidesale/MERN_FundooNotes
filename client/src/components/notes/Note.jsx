import React, { Component } from 'react';
import DisplayNotes from './DisplayNotes';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Input, Button } from '@material-ui/core';
import ToggleDisplay from 'react-toggle-display';
import IconButton from '@material-ui/core/IconButton';
import pinnote from '../../assets/icons/pinnote.svg';
import newlist from '../../assets/icons/newlist.svg';
import newnotewithimage from '../../assets/icons/newnotewithimage.svg';
import drawingunavailable from '../../assets/icons/drawingunavailable.svg';
import collaborator from '../../assets/icons/collaborator.svg';
import changecolor from '../../assets/icons/changecolor.svg';
import archive from '../../assets/icons/archive.svg';
import more from '../../assets/icons/more.svg';
import undo from '../../assets/icons/undo.svg';
import remindme from '../../assets/icons/reminder.svg';
import redo from '../../assets/icons/redo.svg';
import axios from 'axios';
import $ from 'jquery';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class Note extends Component {
    constructor() {
        super();

        this.state = {
            anchorEl: null,
            show: true,
            notetitle: null,
            notedata: null
        }

        this.handleClickShow = this.handleClickShow.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    handleClickShow() {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    addNote() {
        const { notetitle, notedata } = this.state;
        
        if(notedata !== null || notetitle !== null) {
            axios.post('/api/notes/notes', { notetitle, notedata})
                .then((result) => {
                console.log("Result :",result);
                if(result.data.success === false) {
                    console.log("Inside if");
                }
                else {
                    console.log("Inside else");
                    history.push("/home/notes");
                }
            });
        }

        this.setState({
            title: '',
            notedata: ''
        });
    }

    reload() {
        // $(document).ready(($) => {
        //     $(document).on('submit', '#submit-form', (event) => {
        //         event.preventDefault();
        //     });
        // });

        $.ajax({
            url: "/home/notes",
            context: document.body,
            success: function(s,x) {
                $(this).html(s);
            }
        });

        // $(document).ready(function() {
        //     $('#submit-form').delay(1000).load('/home/notes');
        // });
    }

    render() {
        const { anchorEl } = this.state;
        return(
            <div>
                {/* ----------------------- Add Note -------------------- */}
                <ToggleDisplay show={this.state.show}>
                    <Card className="addnotetitle">
                        <Input 
                            className="addnotetitleinput" 
                            disableUnderline={true} 
                            type="text" 
                            placeholder="Take a note..." 
                            onClick={() => this.handleClickShow()}
                        />
                        <IconButton style={{marginLeft:215}} color="inherit" aria-label="Menu">
                            <img src={newlist} alt="newlist" id="topicons" />
                        </IconButton>

                        <IconButton style={{marginLeft:7}} color="inherit" aria-label="Menu">
                            <img src={newnotewithimage} alt="newnotewithimage" id="topicons" />
                        </IconButton>

                        <IconButton style={{marginLeft:7,cursor: "not-allowed"}}  color="inherit" aria-label="Menu">
                            <img style={{opacity:0.2}} src={drawingunavailable} alt="drawingunavailable" id="topicons"/>
                        </IconButton>
                    </Card>
                </ToggleDisplay>

               <form id="submit-form" onSubmit={this.reload}>
               <ToggleDisplay show={!this.state.show}>
                    <Card className="addnotedata">
                    <div >
                        <Input style={{width:550,height:43}} 
                            id="addtitleinput"
                            disableUnderline={true}  
                            type="text" 
                            placeholder="Title" 
                            onInput={e => this.setState({ notetitle: e.target.value })}
                            />
                        <IconButton color="primary" >
                            <img src={pinnote} alt="pinnote" id="topicons"/>
                        </IconButton>
                    </div>
                    
                    <Input style={{width:600,height:46}} 
                        id="addnoteinput"
                        disableUnderline={true} 
                        type="text" 
                        placeholder="Take a note..." 
                        onInput={e => this.setState({ notedata: e.target.value })}

                        />

                    <div style={{width:600,height:40,marginTop:-12}}>
                        <IconButton color="primary" >
                            <img src={remindme} alt="remindme" id="noteicons"/>
                        </IconButton>
                        <IconButton color="primary" >
                            <img src={collaborator} alt="collaborator" id="noteicons"/>
                        </IconButton>

                        <IconButton color="primary" >
                            <img src={changecolor} alt="changecolor" id="noteicons"/>
                        </IconButton>

                        <IconButton color="primary" >
                            <img src={newnotewithimage} alt="newnotewithimage" id="noteicons"/>
                        </IconButton>

                        <IconButton color="primary" >
                            <img src={archive} alt="archive" id="noteicons"/>
                        </IconButton>
                        {/* <IconButton color="primary" >
                            <img src={more} alt="more" id="noteicons"/>
                        </IconButton> */}

                        <IconButton color="primary" 
                            aria-owns={anchorEl ? 'simple-menu-items' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        >
                            <img src={more} alt="more" id="noteicons" />
                        </IconButton>

                        <Menu
                            id="simple-menu-items"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Delete note</MenuItem>
                            <MenuItem onClick={this.handleClose}>Add label</MenuItem>
                        </Menu>
                        
                        <IconButton color="primary" >
                            <img src={undo} alt="undo" id="noteicons"/>
                        </IconButton>
                        <IconButton color="primary" >
                            <img src={redo} alt="redo" id="noteicons"/>
                        </IconButton>

                        <Button id="closebutton" type="submit" onClick={() => {this.addNote();this.handleClickShow()}}>Close</Button>
                    </div>
                    </Card>
                </ToggleDisplay>

                <DisplayNotes/>
               </form>
            </div>
        );
    }
}

export default Note;