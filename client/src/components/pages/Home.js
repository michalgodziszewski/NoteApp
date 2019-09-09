import React from 'react';
import NoteForm from '../notes/NoteForm';
import NoteList from '../notes/NoteList';
import FilterInput from '../notes/FilterInput';

const Home = () => {
  return (
    <div className='row'>
      <div className='col s12 l6'>
        <NoteForm />
      </div>
      <div className='col s12 l6'>
        <FilterInput />
        <NoteList />
      </div>
    </div>
  );
};

export default Home;
