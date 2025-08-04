import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Liquidation from "./pages/Liquidation .jsx"
import MainPage from "./pages/mainpage.jsx"
import Portfolio from "./pages/portfolio.jsx"
import SinglePage from "./pages/singlePage.jsx"
import MainLayout from './layout/mainLayout.jsx'
import CryptoCurrencies from './pages/CryptoCurrencies.jsx'
import {QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import WatchList from './pages/WatchList.jsx'
import News from './pages/news.jsx'
import Community from './pages/Community.jsx'
import { ToastContainer } from 'react-toastify'
import LiveChart from './pages/liveChart.jsx'
const queryClient=new QueryClient()

const router=createBrowserRouter([
  {
    path:"/",element:<MainLayout/>,
    children:[
      {path:"/",element:<MainPage/>},
      {path:"/liquidation",element:<Liquidation/>},
      {path:"/portfolio",element:<Portfolio/>},
      {path:"/crypto",element:<CryptoCurrencies/>},
      {path:"/watchlist",element:<WatchList/>},
      {path:"/news",element:<News/>},
      {path:"/community",element:<Community/>},
      {path:"/livechart",element:<LiveChart/>},
      {path:"/coins/:slug",element:<SinglePage/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <QueryClientProvider  client={queryClient} >
      <ToastContainer position="bottom-right" autoClose={3000} />
      <RouterProvider  router={router} />

    </QueryClientProvider >
    
  </StrictMode>,
)
