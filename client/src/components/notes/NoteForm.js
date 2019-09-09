import React, { useState, useContext, useEffect } from 'react';
import NoteContext from '../../context/note/noteContext';
import AlertContext from '../../context/alert/alertContext';

const NoteForm = () => {
  const noteContext = useContext(NoteContext);
  const alertContext = useContext(AlertContext);

  const { addNote, current, clearCurrent, editNote } = noteContext;

  const { setAlert } = alertContext;

  const [note, setNote] = useState({
    title: '',
    body: ''
  });

  const { title, body } = note;

  useEffect(() => {
    if (current !== null) setNote(current);
    else {
      clearAll();
    }
    //eslint-disable-next-line
  }, [current]);

  const onChange = e => setNote({ ...note, [e.target.name]: e.target.value });

  const clearAll = () => {
    clearCurrent();
    setNote({
      title: '',
      body: ''
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (current === null) {
      if (title === '' || body === '')
        return setAlert('Fill all fields', 'red');
      addNote(note);
      setAlert('Note added successfully', 'green');
    } else {
      editNote(note);
      setAlert('Note updated successfully', 'green');
    }
    clearAll();
  };

  return (
    <form className='px' onSubmit={onSubmit}>
      <div className='row'>
        <h4 className='center-align indigo-text text-darken-4'>
          {current ? 'Edit Note' : 'Add Note'}
        </h4>
        {/* title */}
        <div className='input-field my'>
          <i className='material-icons prefix'>title</i>
          <input
            id='title'
            type='text'
            className='validate '
            name='title'
            value={title}
            onChange={onChange}
          />
          <label className='active' htmlFor='title'>
            Title
          </label>
        </div>
        {/* note */}
        <div className='input-field my'>
          <i className='material-icons prefix'>mode_edit</i>

          <textarea
            id='note'
            className='materialize-textarea'
            name='body'
            value={body}
            onChange={onChange}
          ></textarea>
          <label htmlFor='note'>Note</label>
        </div>

        <button
          className='btn waves-effect waves-light indigo darken-3 right'
          type='submit'
        >
          {current ? 'Update Note' : 'Add Note'}
          <i className='material-icons right'>send</i>
        </button>
        {current && (
          <div className='col sm12'>
            <button
              onClick={clearAll}
              style={{ marginRight: 10 }}
              className='btn waves-effect waves-light red accent-4 right clear'
              type='submit'
            >
              Cancel Update
              <i className='material-icons right'>delete</i>
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
