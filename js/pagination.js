export const getTotalPages = (items, itemsPerPage) => {
    return Math.max(Math.ceil(items.length / itemsPerPage), 1);
}

export const getPaginatedItems = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return items.slice(startIndex, endIndex);
}