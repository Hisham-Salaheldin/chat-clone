

const RequiredMessage = ({children,className}) => {
  return (
    <p className={ `text-sm text-red-500 ${className}`}>{children}</p>
  )
}

export default RequiredMessage