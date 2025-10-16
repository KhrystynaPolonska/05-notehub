import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useToggle } from '../../hooks/useToggle';
import { createNote, deleteNote, fetchNotes } from '../../services/noteService';
import Modal from '../Modal/Modal';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import './App.module.css';
import css from './App.module.css';

const App = () => {
  const [params, setParams] = useState({
    page: 1,

    perPage: 12,

    search: '',
  });

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebounce(search, 500); //

  const [isOpen, toggle] = useToggle(false);

  const queryClient = useQueryClient();

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', params.page, debouncedSearch],
    queryFn: () => {
      return fetchNotes({ ...params, search: debouncedSearch });
    },
    placeholderData: keepPreviousData,
  });

  const addNote = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toggle();
    },
  });

  const removeNote = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const { notes = [], totalPages = 1 } = data ?? {};

  const handlePageChange = ({ selected }: { selected: number }) => {
    setParams((prev) => ({ ...prev, page: selected + 1 }));
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={setSearch} />
        {totalPages > 1 && (
          <Pagination
            pageParams={params}
            totalPages={totalPages}
            onChangePage={handlePageChange}
          />
        )}
        <button onClick={toggle} className={css.button}>
          Create note +
        </button>
      </header>
      {isSuccess && (
        <>
          <NoteList
            notes={notes}
            deleteNote={(id: string) => removeNote.mutate(id)}
          />
        </>
      )}

      {isOpen && (
        <Modal onClose={toggle} onSubmit={(values) => addNote.mutate(values)} />
      )}
    </div>
  );
};

export default App;