export function Outlet({ amount }: { amount: number }) {
  return (
    <g>
      {Array.from({ length: amount }).map((_, index) => (
        <g
          key={`outlet-${
            // biome-ignore lint/suspicious/noArrayIndexKey: There is no unique ID for the amount of outlets
            index
          }`}
          stroke="currentColor"
          fill="none"
          transform={`translate(${index * 12},0)`}
        >
          <line x1="0" y1="10" x2="12" y2="10" />
          <path d="M 20 2 A 1 1 0 0 0 20 18" />
          {/* Aarding */}
          <line x1="12" y1="2" x2="12" y2="18" />
          {/* Kinderbescherming */}
          <line x1="20" y1="0" x2="20" y2="2" />
          <line x1="20" y1="18" x2="20" y2="20" />
        </g>
      ))}
    </g>
  )
}
