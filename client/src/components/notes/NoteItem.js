import React, { Fragment, useState, useContext, useEffect } from 'react';

import NoteContext from '../../context/note/noteContext';
import AlertContext from '../../context/alert/alertContext';

const NoteItem = ({ note }) => {
  const noteContext = useContext(NoteContext);
  const alertContext = useContext(AlertContext);

  const { deleteNote, setCurrent, clearCurrent } = noteContext;
  const { setAlert } = alertContext;

  const [seeMore, setSeeMore] = useState(false);
  const { id, title, body, date, edited } = note;

  useEffect(() => {
    setSeeMore(false);
  }, [edited]);

  const onDelete = () => {
    setSeeMore(false);

    deleteNote(id);
    setAlert('Note delated successfully', 'red');
    clearCurrent();
  };

  return (
    <Fragment>
      <div className='card grey lighten-4 my'>
        <div className='card-content  '>
          <span className='card-title py-min'>{title}</span>
          {seeMore ? <p>{body}</p> : <p>{body.slice(0, 50) + '...'}</p>}{' '}
          <span className='right '>
            {edited ? 'Last modified' : 'created at'} {date}
          </span>
        </div>
        <div className='card-action '>
          {seeMore ? (
            <Fragment>
              <button
                onClick={() => setCurrent(note)}
                style={{ marginRight: 20 }}
                className='btn waves-effect waves-light indigo accent-4'
                type='submit'
              >
                Edit
                <i className='material-icons right'>edit</i>
              </button>
              <button
                onClick={onDelete}
                className='btn waves-effect waves-light red accent-4'
                type='submit'
              >
                Delete
                <i className='material-icons right'>delete</i>
              </button>
            </Fragment>
          ) : (
            <button
              onClick={() => setSeeMore(true)}
              className='btn waves-effect waves-light red accent-4'
              type='submit'
            >
              See More
              <i className='material-icons right'>send</i>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default NoteItem;
