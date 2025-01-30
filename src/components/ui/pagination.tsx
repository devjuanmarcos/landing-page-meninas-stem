import { useSort } from "@/context/SortContext";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const { setPagination } = useSort();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPagination((prev) => ({ ...prev, pageIndex: page }));
    }
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(event.target.value);
    setPagination({ pageSize: newItemsPerPage, pageIndex: 1 });
  };

  const itemsPerPageOptions = totalItems < 8 ? [totalItems] : [8, 15, 20, 50, 100, 250, 500];

  return (
    <div className="flex flex-wrap justify-center items-center p-4 gap-8 w-full">
      <div className="flex items-center">
        <span className="mr-2">Itens por página</span>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-2 py-1 border border-gray-200 rounded-md"
        >
          {itemsPerPageOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {totalItems && <span className="ml-2">Total: {totalItems}</span>}
      </div>
      <div className="flex items-center">
        <span className="mr-2">
          Página {currentPage} de {totalPages} {/* Atualizar para refletir o índice 1 */}
        </span>
        <button
          className="mx-1 p-2 border border-gray-200 rounded-md"
          onClick={() => handlePageChange(1)} // Primeiro item agora é 1
          disabled={currentPage === 1}
          aria-label="Ir para a primeira página"
        >
          <FaAnglesLeft />
        </button>
        <button
          className="mx-1 p-2 border border-gray-200 rounded-md"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1} // Desabilitado quando a página é 1
          aria-label="Ir para a página anterior"
        >
          <FaAngleLeft />
        </button>
        <button
          className="mx-1 p-2 border border-gray-200 rounded-md"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Ir para a próxima página"
        >
          <FaAngleRight />
        </button>
        <button
          className="mx-1 p-2 border border-gray-200 rounded-md"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Ir para a última página"
        >
          <FaAnglesRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
