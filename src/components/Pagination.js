import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
    const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
    const end = activePage === totalPages ? count : beginning + rowsPerPage - 1
  
    return (
      <>
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button disabled={activePage === 1} onClick={() => setActivePage(1)} className="button-pagination">
              ⏮️ First
            </button>
          </li>
          <li className="page-item">
            <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)} className="button-pagination">
              ⬅️ Previous
            </button>
          </li>
          <li className="page-item">
            <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)} className="button-pagination">
              Next ➡️
            </button>
          </li>
          <li className="page-item">
            <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)} className="button-pagination">
              Last ⏭️
            </button>
          </li>
        </ul>
      </nav>
        <div className="pagination-footer"> 
          <p>
            Page {activePage} of {totalPages}
          </p>
          <p>
            Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
          </p>
        </div>
      </>
    )
  }