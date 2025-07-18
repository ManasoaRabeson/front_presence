export function Pagination({ setCurrentPage, currentPage, lastPage, totalItems }){
  const goToPage = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  // Génère un tableau [1, 2, ..., lastPage]
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <>
    <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between w-full">
        {/* Texte info */}
        <div>
          <p className="text-lg leading-5 text-gray-800 dark:text-gray-400">
            Page <span className="font-medium">{currentPage}</span> sur{" "}
            <span className="font-medium">{lastPage}</span> (
            <span className="font-medium">{totalItems}</span> éléments)
          </p>
        </div>

        {/* Pagination */}
        <div>
          <span className="relative z-0 inline-flex gap-2 rounded-md shadow-sm rtl:flex-row-reverse">
            {/* Bouton précédent */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 rounded-l-md dark:bg-gray-800 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="&laquo; Previous"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Boutons pages */}
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`relative inline-flex items-center px-3 py-2 -ml-px text-sm font-medium leading-5 border border-gray-300 rounded-md ${
                  currentPage === page
                    ? "bg-[#A462A4] text-gray-100 cursor-default"
                    : "text-gray-700 bg-white hover:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}

            {/* Bouton suivant */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === lastPage}
              className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 rounded-r-md hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:active:bg-gray-700 dark:focus:border-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next &raquo;"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </nav>
        </>
    )
}