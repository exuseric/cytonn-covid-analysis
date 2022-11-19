export default function paginate({ items, activePage, maxEntries }) {
  let currentPage = activePage || 1;
  let entries = maxEntries || 25;
  let offset = (currentPage - 1) * entries;

  const paginatedItems = items?.slice(offset).slice(0, entries);
  const totalPages = Math.ceil(items?.length / entries);

  return {
    page: currentPage,
    entries,
    prevPage: currentPage < 1 ? page - 1 : null,
    nextPage: totalPages > currentPage ? currentPage + 1 : null,
    total: items?.length,
    totalPages,
    data: paginatedItems,
  };
}
