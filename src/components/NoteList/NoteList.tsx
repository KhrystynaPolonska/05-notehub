import type { Note } from '../../types/note';
import './NoteList.module.css';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  deleteNote: (id: string) => void;
}

const NoteList = ({ notes, deleteNote }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes?.map(({ title, tag, content, id }) => {
        return (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <button onClick={() => deleteNote(id)} className={css.button}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;