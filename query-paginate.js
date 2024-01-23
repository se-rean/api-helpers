module.exports = paginate = (
  query,
  { page: _page = DEFAULT_PAGE, page_size: _page_size = DEFAULT_PAGE_SIZE }
) => {
  const page = parseInt(_page, 10);
  const page_size = parseInt(_page_size, 10);

  const offset = (page - 1) * page_size;
  const limit = page_size;

  return {
    ...query,
    offset,
    limit,
    distinct: true,
  };
};