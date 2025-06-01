export default function PaginationDpad({ page, setPage, total, limit }) {
  const totalPages = Math.ceil(total / limit);

  const handleLeft = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleRight = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleDown = () => {
    setPage(() => Math.max(0, totalPages - 1));
  };

  const handleUp = () => {
    setPage(0);
  };

  return (
    <div className="mt-4 flex items-center">
      <div className="bg-black text-green-400 text-sm px-4 py-2 rounded mb-2 pixel-corners">
      Page: {page + 1} / {totalPages} | Total: {total} 
      </div>

      <div className="dpad">
        <button
          className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6"
          onClick={handleUp}
          aria-label="Up"
        />
        <button
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6"
          onClick={handleDown}
          aria-label="Down"
        />
        <button
          className="absolute top-1/2 left-0 -translate-y-1/2 w-6 h-6"
          onClick={handleLeft}
          aria-label="Previous page"
        />
        <button
          className="absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6"
          onClick={handleRight}
          aria-label="Next page"
        />
      </div>
    </div>
  );
}