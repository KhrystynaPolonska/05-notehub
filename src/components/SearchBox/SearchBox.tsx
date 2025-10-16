import './SearchBox.module.css';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  setSearch: (e: string) => void;
}

const SearchBox = ({ search, setSearch }: SearchBoxProps) => {
  return (
    <>
      <input
        onChange={(e) => setSearch(e.target.value)}
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={search}
      />
    </>
  );
};

export default SearchBox;