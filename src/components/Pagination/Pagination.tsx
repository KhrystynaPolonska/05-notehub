import ReactPaginate from "react-paginate";
import type { apiParams } from "../../services/noteService";
import "./Pagination.module.css";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageParams: apiParams;
  totalPages: number;
  onChangePage: (event: { selected: number }) => void;
}

const Pagination = ({
  pageParams,
  totalPages,
  onChangePage,
}: PaginationProps) => {
  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={pageParams.perPage}
        marginPagesDisplayed={1}
        onPageChange={onChangePage}
        forcePage={(pageParams.page as number) - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    </>
  );
};

export default Pagination;