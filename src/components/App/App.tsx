
import NoteList from '../NoteList/NoteList'
import css from './App.module.css';
import Pagination from '../Pagination/Pagination';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import type { Note } from '../../types/note';
import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal';
import type { NoteResponse } from "../../types/note"


export default function App() {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebounce(search, 500);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const perPage = 12;

	const { data, isLoading, isError, error } = useQuery<NoteResponse, Error>({
		queryKey: ["notes", page, debouncedSearch],
		queryFn: () => fetchNotes(page, perPage, debouncedSearch),
		placeholderData: (prev) => prev, 
	  });

   const notes: Note[] = data?.notes ?? [];

   if (isLoading) return <p>Loading...</p>;
   if (isError) return <p>Error loading notes: {error?.message}</p>;


   const handleSearch = (value:string) => {
	setSearch(value);
	setPage(1);
   };
return (
  <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox onSearch={handleSearch} searchQuery={search}/>
		{data?.totalPages && data.totalPages > 1 && (
		<Pagination 
		page={page}
		setPage={setPage}
		totalPages={data.totalPages}
		/>
	)}
		<button className={css.button}
		onClick={() => setIsModalOpen(true)}
		>
			Create note +</button>
			
{isModalOpen && (
  <Modal onClose={() => setIsModalOpen(false)}>
    <NoteForm onClose={() => setIsModalOpen(false)} />
  </Modal>
)}
  </header>
  <NoteList  notes = {notes} />

</div>
);
}