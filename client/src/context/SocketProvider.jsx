import {createContext, 
  useEffect, 
  // useEffect, 
  // useState, 
  useMemo} from 'react'
import {io} from 'socket.io-client'

const SocketContext = createContext()
const SocketProvider = ({id, children}) => {
  // const [socket, setSoket] = useState()
  const socket = useMemo(() => {
    if (!id) return null
    const newSocket = io('http://localhost:8081', {query: { id },})

    return newSocket 
  }, [id])

  useEffect(()=>{
    if(!socket) return
    return () => socket.close
  },[socket])

  // useEffect(() => {
  //   const newSocket = io('http://localhost:8081', {query: {id}})
  //   setSoket(newSocket)
  //   return () => newSocket.close()
  // }, [id])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
export {SocketProvider, SocketContext}
