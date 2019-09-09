import React, { useContext } from 'react';
import NoteItem from './NoteItem';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import NoteContext from '../../context/note/noteContext';

const NoteList = () => {
  const noteContext = useContext(NoteContext);

  const { notes, filtered } = noteContext;

  if (notes.length === 0)
    return (
      <h4 className='center-align indigo-text text-darken-4'>
        Please add notes...
      </h4>
    );

  return (
    <div className='row'>
      <TransitionGroup className='todo-list'>
        {filtered !== null
          ? filtered.map(note => (
              <CSSTransition key={note.id} timeout={500} classNames='item'>
                <NoteItem note={note} />
              </CSSTransition>
            ))
          : notes.map(note => (
              <CSSTransition key={note.id} timeout={500} classNames='item'>
                <NoteItem note={note} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </div>
  );
};

export default NoteList;
