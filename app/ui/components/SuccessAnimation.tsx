export default function SuccessAnimation(){
  return (
    <div className="successContainer">
      <svg width="400" height="400">
        <circle
          fill="none"
          stroke-width="20"
          cx="200"
          cy="200"
          r="190"
          strokeLinecap="round"
          transform="rotate(-90 200 200)"
          className="circle stroke-green-600"
        />
        <polyline
          fill="none"
          points="88,214 173,284 304,138"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tick stroke-green-600"
        />
      </svg>
    </div>
  )
}