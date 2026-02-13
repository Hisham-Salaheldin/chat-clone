const Container = ({className,children}) => {
  return (
    <div className={`max-w-[1000px] px-5 md:px-10 mx-auto ${className}`}>
        {children}
    </div>
  )
}

export default Container