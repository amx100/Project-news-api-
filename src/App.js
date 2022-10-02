import { BrowserRouter ,Routes,Route } from "react-router-dom";

import Artikl from "./Components/Article";

import ContextProvide from "./Components/context";
import Articles from "./Components/Article";
import Home from "./Components/Home";


function App1 ()
{


  return (

      <BrowserRouter>

    <ContextProvide>
      <Routes>




        <Route path="/" element={<Home/>} />
        <Route path="article" element={<Articles/>}/>


      </Routes>
    </ContextProvide>
    </BrowserRouter>
  )
}

export default App1;