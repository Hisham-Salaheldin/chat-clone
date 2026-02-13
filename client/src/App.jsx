import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import MainLayouts from "src/layouts/MainLayouts/MainLayouts"
// import Home from "src/pages/home/Home"
// import About from "src/pages/about/About"
// import NotFound from "src/pages/notfound/NotFound"
import Auth from '@/layout/auth/Auth'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
// import {useEffect, useState} from 'react'
import {useLocalStorage} from './hooks/useLocalStorage'
import MainLayout from '@/layout/mainlayout/MainLayout'

function App() {
  const [userId, setUserId] = useLocalStorage('id')
  // useEffect(() => {
  //   localStorage.setItem('userId', userId)
  // }, [userId])

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<MainLayouts />}>
    //        <Route index element={<Home />} />
    //       <Route path="about" element={<About />} /> */}

    //     </Route>

    //   </Routes>
    // </BrowserRouter>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home userId={userId} />} />
        </Route>
        <Route path="/auth" element={<Auth onIdSubmit={setUserId} />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
