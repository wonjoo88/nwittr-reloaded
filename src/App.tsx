import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './component/layout'
import Home from './routes/home'
import Profile from './routes/profile'
import Login from './routes/login'
import CreateAccount from './routes/create-account'
import { useEffect, useState } from 'react'
import LoadingScreen from './component/loading-screen'
import { auth } from './firebase'

const router  = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"profile",
        element:<Profile/>
      }
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/create-account",
    element:<CreateAccount/>
  }

])

function App() {

  // 사용자가 로그인했는지 여부를 Firebase가 체크하는 동안 로딩 화면을 보여지게 하기위해 생성  
  const [isLoading, setLoading] = useState(true); 

  const init =async () => {
    // 파이어베이스가 준비될때까지 기다림
    await auth.authStateReady();
    // 파이어베이스가 준비되면 loading을 false로 바꿔줌
    setLoading(false);    
    //setTimeout(()=>setIsLoading(false),2000)
  }

  useEffect(()=>{
    init()
  },[])

  return (
    <>
      {isLoading? <LoadingScreen/> : <RouterProvider router={router}/>}
    </>
  )
}

export default App
