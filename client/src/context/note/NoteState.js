import React, { useReducer } from 'react';
import NoteContext from './noteContext';
import noteReducer from './noteReducer';
import uuid from 'uuid';

import {
  ADD_NOTE,
  DELETE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  EDIT_NOTE,
  FILTER_NOTES,
  CLEAR_FILTER
} from '../types';

const NoteState = props => {
  const initialState = {
    notes: [
      {
        id: 1,
        title: 'Lekarz',
        body: 'Wizyta u lekarza 3 listopada',
        date: new Date().toLocaleString(),
        edited: false
      },
      {
        id: 2,
        title: 'Pies',
        body: 'Wyprowadzic psa na spacer jutro',
        date: new Date().toLocaleString(),
        edited: false
      },
      {
        id: 3,
        title: 'Praca',
        body: 'Pujsc do pracy',
        date: new Date().toLocaleString(),
        edited: false
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(noteReducer, initialState);

  //Add note

  const addNote = note => {
    note.id = uuid.v4();
    note.date = new Date().toLocaleString();
    note.edited = false;
    dispatch({
      type: ADD_NOTE,
      payload: note
    });
  };

  // Delete note

  const deleteNote = id => {
    dispatch({
      type: DELETE_NOTE,
      payload: id
    });
  };

  // Set current

  const setCurrent = note => {
    dispatch({
      type: SET_CURRENT,
      payload: note
    });
  };

  // clear current

  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  const editNote = note => {
    note.date = new Date().toLocaleString();
    note.edited = true;
    dispatch({
      type: EDIT_NOTE,
      payload: note
    });
  };

  const filter = text => {
    dispatch({
      type: FILTER_NOTES,
      payload: text
    });
  };

  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        current: state.current,
        filtered: state.filtered,
        addNote,
        deleteNote,
        setCurrent,
        clearCurrent,
        editNote,
        filter,
        clearFilter
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
