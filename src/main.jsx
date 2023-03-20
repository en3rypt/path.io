import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Error from './components/Error'
import Compare from './components/Compare'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import {BrowserRouter,Route,Routes} from 'react-router-dom';


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <Error />,
//   },{
//     path: '/compare',
//     element: <Compare />,
//     errorElement: <Error />,
//   }
// ]);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <RouterProvider router={router}/>
  // </React.StrictMode>,
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/compare" element={<Compare />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

serviceWorkerRegistration.register();