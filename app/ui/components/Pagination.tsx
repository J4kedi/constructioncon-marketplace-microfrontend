
'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} 
        className="px-4 py-2 rounded-md bg-secondary/20 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-primary text-white' : 'bg-secondary/20'} cursor-pointer`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-secondary/20 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        Próximo
      </button>
    </div>
  );
};
