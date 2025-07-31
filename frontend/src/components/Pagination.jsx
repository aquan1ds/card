import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  className = '' 
}) => {
  if (totalPages <= 1) return null

  const generatePageNumbers = () => {
    const pages = []
    const showPages = 5 // Number of page numbers to show

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    let endPage = Math.min(totalPages, startPage + showPages - 1)

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1)
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push('...')
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage && onPageChange) {
      onPageChange(page)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1)
    }
  }

  const pages = generatePageNumbers()

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-2 rounded-lg border transition-colors duration-200 ${
          currentPage === 1
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
        }`}
      >
        <ChevronLeft size={16} className="mr-1" />
        <span className="hidden sm:inline">Trước</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            disabled={page === '...'}
            className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
              page === currentPage
                ? 'bg-primary-500 text-white border border-primary-500'
                : page === '...'
                ? 'text-gray-400 cursor-default'
                : 'text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-2 rounded-lg border transition-colors duration-200 ${
          currentPage === totalPages
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
        }`}
      >
        <span className="hidden sm:inline">Sau</span>
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  )
}

export default Pagination