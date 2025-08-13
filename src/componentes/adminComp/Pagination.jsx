import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 my-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        &lt;
      </button>
      <span className="font-semibold">{page} / {totalPages}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
