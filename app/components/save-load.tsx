export function SaveLoad() {
  function load() {
    // start file selector
  }

  return (
    <div className="flex gap-2 items-center justify-center">
      <Button onClick={() => {}}>Save</Button>
      <Button onClick={() => {}}>Load</Button>

      <div className="space-y-8 font-[sans-serif] max-w-md mx-auto">
        <input
          type="file"
          className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
        />
      </div>
    </div>
  )
}
function Button({
  children,
  onClick,
}: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
