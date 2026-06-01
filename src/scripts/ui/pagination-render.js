export function renderPagination(currentPage, totalPages) {
  const repos = document.querySelector(".repos");
  const paginationContainer = repos.querySelector(".pagination");

  let paginationButtonsHtml = "";

  if (paginationContainer) paginationContainer.remove();

  if (totalPages > 1) {
    if (totalPages > 8) {
      if (totalPages - 4 <= currentPage) {
        for (let i = totalPages - 8; i <= totalPages; i++) {
          if (i === currentPage)
            paginationButtonsHtml += `<span class="pagination-button active">${i}</span>`;
          else if (i === totalPages - 8)
            paginationButtonsHtml += `<span class="pagination-button">1</span>`;
          else if (i === totalPages - 7)
            paginationButtonsHtml += `<span class="pagination-button ellipsis">...</span>`;
          else if (i === totalPages)
            paginationButtonsHtml += `<span class="pagination-button">${totalPages}</span>`;
          else
            paginationButtonsHtml += `<span class="pagination-button">${i}</span>`;
        }
      } else if (currentPage >= 6 && totalPages > 10) {
        for (let i = currentPage - 4; i <= currentPage + 4; i++) {
          if (i === currentPage)
            paginationButtonsHtml += `<span class="pagination-button active">${i}</span>`;
          else if (i === currentPage - 4)
            paginationButtonsHtml += `<span class="pagination-button">1</span>`;
          else if (i === currentPage - 3 || i === currentPage + 3)
            paginationButtonsHtml += `<span class="pagination-button ellipsis">...</span>`;
          else if (i === currentPage + 4)
            paginationButtonsHtml += `<span class="pagination-button">${totalPages}</span>`;
          else
            paginationButtonsHtml += `<span class="pagination-button">${i}</span>`;
        }
      } else {
        for (let i = 1; i <= 9; i++) {
          if (i === currentPage)
            paginationButtonsHtml += `<span class="pagination-button active">${i}</span>`;
          else if (i === 8)
            paginationButtonsHtml += `<span class="pagination-button ellipsis">...</span>`;
          else if (i === 9)
            paginationButtonsHtml += `<span class="pagination-button">${totalPages}</span>`;
          else
            paginationButtonsHtml += `<span class="pagination-button">${i}</span>`;
        }
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage)
          paginationButtonsHtml += `<span class="pagination-button active">${i}</span>`;
        else
          paginationButtonsHtml += `<span class="pagination-button">${i}</span>`;
      }
    }

    const paginationHtml = `<div class="pagination">
              <span class="pagination-button previous-button ${currentPage === 1 ? `disabled` : ""}"
                ><i data-feather="chevron-left" class="previous-button-icon"></i
                >Anterior</span
              >
              ${paginationButtonsHtml}
              <span class="pagination-button next-button ${currentPage === totalPages ? `disabled` : ""}"
                >Próximo<i
                  data-feather="chevron-right"
                  class="next-button-icon"
                ></i
              ></span>
            </div>`;

    repos.insertAdjacentHTML("beforeend", paginationHtml);
    feather.replace();
  }
}
