import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Input, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
// import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DialogTitle from '@material-ui/core/DialogTitle';
import pinnote from '../../../assets/icons/bluepinnote.svg';
import pickdate from '../../../assets/icons/peakdate.svg';
import pickplace from '../../../assets/icons/peakplace.svg';
import newnotewithimage from '../../../assets/icons/newnotewithimage.svg';
import collaborator from '../../../assets/icons/collaborator.svg';
import changecolor from '../../../assets/icons/changecolor.svg';
import archive from '../../../assets/icons/archive.svg';
import more from '../../../assets/icons/more.svg';
import undo from '../../../assets/icons/undo.svg';
import remindme from '../../../assets/icons/reminder.svg';
import redo from '../../../assets/icons/redo.svg';
import axios from 'axios';
import $ from 'jquery';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

class PinNote extends Component {
    constructor() {
        super();

        this.state = {
            anchorEl: null,
            anchorElRemind: null,
            anchorElAddLabel: null,
            anchorElColor: null,
            notes: [],
            title: null,
            notedata: null,
            labels: [],
            color: true,
        }
        this.handleClickLabel = this.handleClickLabel.bind(this);
        this.handleCloseLabel = this.handleCloseLabel.bind(this);
        this.handleClickColor = this.handleClickColor.bind(this);
        this.handleCloseColor = this.handleCloseColor.bind(this);
    }

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

    handleClickColor(event) {
        this.setState({ anchorElColor: event.currentTarget });
    }

    handleCloseColor = () => {
        this.setState({ anchorElColor: null });
    };

    handleClickLabel(event) {
        this.setState({
            anchorElAddLabel: event.currentTarget
        });
    }

    handleCloseLabel() {
        this.setState({ anchorElAddLabel: null });
    }


    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClickClose = () => {
        this.setState({ open: false });
    };

    handleClickReminder = event => {
        this.setState({ anchorElRemind: event.currentTarget });
    };

    handleCloseReminder = () => {
        this.setState({ anchorElRemind: null });
    };

    handleDelete(key, data) {
        // noteCtrl.removeReminder(key, data);
    }

    handleDeleteLabel(key, data) {
        // labelCtrl.removeLabel(key, data);
    }

    // onClickEdit(title, notedata, key, data) {
    //     console.log("onClickEdit");
    //     if (title !== null || notedata !== null) {
    //         data = {
    //             title: title,
    //             notedata: notedata
    //         }
    //         noteCtrl.updateNote(key, data);
    //         window.location.href = '/home/notes';
    //     }
    //     else {
    //         alert("Enter data to update");
    //     }
    // }

    getToday(key, data) {
        // noteCtrl.getToday(key, data);
    }

    getTomorrow(key, data) {
        // noteCtrl.getTomorrow(key, data);
    }

    getNextWeek(key, data) {
        // noteCtrl.getNextWeek(key, data);
    }

    changeColor(key, data, btn) {
        // noteCtrl.changeColor(key, data, btn);
    }

    getLabel(key, data, labelName) {
        // labelCtrl.getLabelData(key, data, labelName);
    }

    render() {
        const { anchorEl } = this.state;
        const { anchorElRemind } = this.state;
        const { anchorElAddLabel } = this.state;
        const { anchorElColor } = this.state;
        // var pinnedNotesCount = [];
        return (
            this.state.notes.map((note) => {
                if(note.ispin === true) {
                // if (data.isPin === true) {
                    // pinnedNotesCount.push(data);
                    // localStorage.setItem("pinnedNotesCount", pinnedNotesCount.length);
                    return (
                        <form>
                             <div className="display-notes-div">
                            {/* <div> */}
                            <div id="div_element" className="displaynotes column ">
                                <Card style={{ width: '100%',borderRadius:0 }}>
                                    <div style={{width: '90%', marginTop: 10, marginLeft: 10, fontWeight: 'bolder', position: 'relative' }}>
                                        <div style={{ width: '80%', paddingBottom: 20, paddingTop: 10 }} onClick={this.handleClickOpen}>
                                            {note.notetitle}
                                        </div>
                                        <div id="note-btns" >
                                            <Tooltip title="Unpin note">
                                                <IconButton style={{ height: 30, width: 30, position: 'absolute', display: 'inline-flex', top: -5, right: '-7%' }}
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => this.isPinNote(note._id, note)}
                                                >
                                                    <img src={pinnote} alt="pinnote" id="noteicons" style={{opacity:1}}/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <div onClick={this.handleClickOpen} style={{ width: '100%', marginLeft: 10, marginBottom: 20,fontSize:20,opacity:0.7}}>{note.notedata}</div>

                                    {/* {data.reminder ?
                                        <Chip
                                            avatar={
                                                <img src={pickdate} alt="pickdate" id="avtarremindermenuicons" />
                                            }
                                            label={data.reminder}
                                            // onClick={handleClick}
                                            onDelete={() => this.handleDelete(key, data)}
                                            style={{ borderRadius: 1, height: 24, marginLeft: 10, fontSize: 11 }}
                                        />
                                        :
                                        null
                                    }

                                    {data.label ?
                                        <Chip
                                            label={data.label}
                                            onDelete={() => this.handleDeleteLabel(key, data)}
                                            style={{ borderRadius: 1, height: 24, marginLeft: 10, fontSize: 11 }}
                                        />
                                        :
                                        null
                                    } */}

                                    <div id="note-btns" style={{ width: 240, height: 40 }}>
                                        <Tooltip title="Reminde me">
                                            <IconButton color="primary" id="notebuttons"
                                                aria-owns={anchorElRemind ? 'simple-menu' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClickReminder}
                                            >
                                                <img src={remindme} alt="remindme" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorElRemind}
                                            open={Boolean(anchorElRemind)}
                                            onClose={this.handleCloseReminder}
                                        >

                                            <div id="reminderdiv" >Reminder : </div>
                                            <MenuItem id="menuitems" onClick={() => { this.handleCloseReminder()}}>Later Today<div id="remindermenu">8:00 PM</div></MenuItem>
                                            <MenuItem id="menuitems" onClick={() => { this.handleCloseReminder()}}>Tomorrow<div id="remindermenu">8:00 AM</div></MenuItem>
                                            <MenuItem id="menuitems" onClick={() => { this.handleCloseReminder() }}>Next Week<div id="remindermenu">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Mon, 8:00 AM</div></MenuItem>
                                            <MenuItem id="menuitems" onClick={this.handleCloseReminder}>
                                                <img src={pickdate} alt="pickdate" id="remindermenuicons" />
                                                Pick date & time
                                        </MenuItem>
                                            <MenuItem id="menuitems" onClick={this.handleCloseReminder}>
                                                <img src={pickplace} alt="pickplace" id="remindermenuicons" />
                                                Pick place
                                        </MenuItem>
                                        </Menu>

                                        <Tooltip title="Collaborator">
                                            <IconButton color="primary" id="notebuttons">
                                                <img src={collaborator} alt="collaborator" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Change color">
                                            <IconButton color="primary" id="notebuttons" className="change-color-btn"
                                                aria-owns={anchorElColor ? 'color-menu' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClickColor}
                                            >
                                                <img src={changecolor} alt="changecolor" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        {/* <div id="change-color-div"> */}
                                        <Menu
                                            id="color-menu"
                                            position="right top"
                                            anchorEl={anchorElColor}
                                            open={Boolean(anchorElColor)}
                                            onClose={this.handleCloseColor}
                                        >
                                            <Tooltip title="White">
                                            <IconButton id="color-btn" 
                                                style={{ backgroundColor: "white" }}
                                                onClick={() => { this.handleCloseColor() }} />
                                            </Tooltip>
                                            <Tooltip title="Red">
                                                <IconButton id="color-btn" 
                                                    style={{ backgroundColor: "rgb(255, 138, 128)" }} 
                                                    onClick={() => { this.handleCloseColor()}} />
                                            </Tooltip>
                                            <Tooltip title="Orange">
                                                <IconButton id="color-btn" 
                                                    style={{ backgroundColor: "rgb(255, 209, 128)" }} 
                                                    onClick={() => { this.handleCloseColor() }} />
                                            </Tooltip>
                                            <Tooltip title="Yellow">
                                                <IconButton id="color-btn" 
                                                    style={{ backgroundColor: "rgb(255, 255, 141)" }} 
                                                    onClick={() => { this.handleCloseColor()}} />
                                            </Tooltip>
                                            <br></br>
                                            <Tooltip title="Green">
                                                <IconButton id="color-btn" 
                                                    style={{ backgroundColor: "rgb(204, 255, 144)" }} 
                                                    onClick={() => { this.handleCloseColor() }} />
                                            </Tooltip>
                                            <Tooltip title="Teal">
                                                <IconButton id="color-btn" 
                                                    style={{ backgroundColor: "rgb(167, 255, 235)" }}
                                                    onClick={() => { this.handleCloseColor()}} />
                                            </Tooltip>
                                            <Tooltip title="Blue">
                                                <IconButton id="color-btn" 
                                                    style={{ backgroundColor: "rgb(128, 216, 255)" }} 
                                                    onClick={() => { this.handleCloseColor() }} />
                                            </Tooltip>
                                            <Tooltip title="Dark blue">
                                                <IconButton id="color-btn" 
                                                    style={{ backgroundColor: "rgb(130, 177, 255)" }} 
                                                    onClick={() => { this.handleCloseColor()}} />
                                            </Tooltip>
                                            <br></br>
                                            <Tooltip title="Purple">
                                                <IconButton id="color-btn"  
                                                    style={{ backgroundColor: "rgb(179, 136, 255)" }} 
                                                    onClick={() => { this.handleCloseColor()}} />
                                            </Tooltip>
                                            <Tooltip title="Pink">
                                                <IconButton id="color-btn" 
                                                    style={{ backgroundColor: "rgb(248, 187, 208)" }} 
                                                    onClick={() => { this.handleCloseColor()}} />
                                            </Tooltip>
                                            <Tooltip title="Brown">
                                                <IconButton id="color-btn" 
                                                    style={{ backgroundColor: "rgb(215, 204, 200)" }} 
                                                    onClick={() => { this.handleCloseColor() }} />
                                            </Tooltip>
                                            <Tooltip title="Gray">
                                                <IconButton id="color-btn" 
                                                    style={{ backgroundColor: "rgb(207, 216, 220)" }} 
                                                    onClick={() => { this.handleCloseColor() }} />
                                            </Tooltip>
                                        </Menu>


                                        <Tooltip title="Add image">
                                            <IconButton color="primary" id="notebuttons">
                                                <img src={newnotewithimage} alt="newnotewithimage" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Archive">
                                            <IconButton id="notebuttons"
                                                color="primary" 
                                                type="submit"
                                                onClick={() => {this.isPinNote(note._id, note);this.isArchiveNote(note._id, note)}}
                                            >
                                                <img src={archive} alt="archive" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="More">
                                            <IconButton  color="primary" id="notebuttons"
                                                aria-owns={anchorEl ? 'simple-menu' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                            >
                                                <img src={more} alt="more" id="noteicons" />
                                            </IconButton>
                                        </Tooltip>

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={this.handleClose}
                                        >
                                            <Button id="note-menu-btn" onClick={() => { this.handleClose(); this.isPinNote(note._id, note); this.isTrashNote(note._id, note) }}>Delete note</Button>
                                            <br></br>
                                            <Button style={{ paddingLeft: 2 }}
                                                id="note-menu-btn"
                                                aria-owns={anchorElAddLabel ? 'simple-menu-add-label' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClickLabel}>
                                                Add label
                                        </Button>
                                        </Menu>
                                    </div>
                                </Card>

                            </div>
                            {/* ----------------------- Edit Note Implementation -------------------- */}
                            <div>
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClickClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        <Input style={{ width: 500, height: 43 }}
                                            className="addnotetitleinput"
                                            disableUnderline={true}
                                            type="text"
                                            defaultValue={note.notetitle}
                                            onInput={e => this.setState({ title: e.target.value })}
                                        />
                                    </DialogTitle>
                                    <DialogContent>
                                        <Input
                                            className="addnotetitleinput"
                                            disableUnderline={true}
                                            type="text"
                                            defaultValue={note.notedata}
                                            onInput={e => this.setState({ notedata: e.target.value })}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <div style={{ width: 600, height: 40, marginTop: -12 }}>
                                            <IconButton color="primary" >
                                                <img src={remindme} alt="remindme" id="noteicons" />
                                            </IconButton>
                                            <IconButton color="primary" >
                                                <img src={collaborator} alt="collaborator" id="noteicons" />
                                            </IconButton>

                                            <IconButton color="primary" >
                                                <img src={changecolor} alt="changecolor" id="noteicons" />
                                            </IconButton>

                                            <IconButton color="primary" >
                                                <img src={newnotewithimage} alt="newnotewithimage" id="noteicons" />
                                            </IconButton>

                                            <IconButton color="primary" >
                                                <img src={archive} alt="archive" id="noteicons" />
                                            </IconButton>

                                            <IconButton color="primary" id="notebuttons"
                                                aria-owns={anchorEl ? 'simple-menu-items' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                            >
                                                <img src={more} alt="more" id="noteicons" />
                                            </IconButton>

                                            <Menu
                                                id="simple-menu-items"
                                            // anchorEl={anchorEl}
                                            // open={Boolean(anchorEl)}
                                            // onClose={this.handleClose}
                                            >
                                                <MenuItem>Delete note</MenuItem>
                                                <MenuItem>Add label</MenuItem>
                                            </Menu>

                                            <IconButton color="primary" >
                                                <img src={undo} alt="undo" id="noteicons" />
                                            </IconButton>
                                            <IconButton color="primary" >
                                                <img src={redo} alt="redo" id="noteicons" />
                                            </IconButton>

                                            <Button id="closebutton" >Close</Button>
                                        </div>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            {/* ----------------------- Add Label On Note -------------------- */}
                            {/* <Menu
                                id="simple-menu-add-label"
                                anchorEl={anchorElAddLabel}
                                open={Boolean(anchorElAddLabel)}
                                onClose={this.handleCloseLabel}
                            >
                                <div id="label-note">Label note</div>
                                <Input
                                    id="label-search"
                                    disableUnderline={true}
                                    type="text"
                                    placeholder="Enter label name"
                                />
                                {Object.keys(this.state.labels).map((label) => {
                                    var labelKey = label;
                                    var labelName = this.state.labels[labelKey];
                                    return (
                                        <div>
                                            <FormControlLabel
                                                id="add-label-note"
                                                control={
                                                    <Checkbox
                                                        style={{ width: 36, height: 36, padding: 5 }}
                                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}

                                                        color="default"
                                                        onClick={() => this.getLabel(key, data, labelName.label)}
                                                    />
                                                }
                                                label={labelName.label}
                                            />
                                        </div>
                                    );
                                })
                                }
                            </Menu> */}
                        </div> 
                        </form>
                    );
                }
                else {
                    return (
                        <div>
                        </div>
                    )
                }
            })
        );
    }
}

export default PinNote;