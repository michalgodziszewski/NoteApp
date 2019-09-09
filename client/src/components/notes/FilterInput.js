import React, { useState, useContext, useEffect } from 'react';
import NoteContext from '../../context/note/noteContext';

const FilterInput = () => {
  const noteContext = useContext(NoteContext);

  const { filter, clearFilter } = noteContext;

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search.length === 0) {
      clearFilter();
    } else {
      filter(search);
    }
    //eslint-disable-next-line
  }, [search]);

  const searchNote = e => {
    setSearch(e.target.value);
  };

  return (
    <div className='input-field'>
      <i className='material-icons prefix'>search</i>
      <input
        type='text'
        className='validate'
        value={search}
        onChange={searchNote}
        placeholder='Search note...'
      />
    </div>
  );
};

export default FilterInput;
