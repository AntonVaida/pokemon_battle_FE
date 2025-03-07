export const Loader = ({width = 32, height = 32}) => {
  return (
    <div 
      className="border-transparent border-t-purple border-[3px] rounded-full animate-spin"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
    </div>
  )
}