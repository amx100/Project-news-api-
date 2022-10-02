import { useState } from "react";
import { createContext } from "react";

const myContext = createContext();
export { myContext };
export default function ContextProvide({ children }) {
  const [sentNews, setSentNews] = useState([]);

  return (
    <myContext.Provider value={{ sentNews, setSentNews }}>
      {children}
    </myContext.Provider>
  );
}