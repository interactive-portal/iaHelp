"use client"
import { createContext, useRef, useState } from "react";

type PropsContextType = {
  data?: any;
  setData?: any;
};

const PageContext = createContext<PropsContextType>({});

export const PageStore = ({ children }: { children?: any }) => {
  const [data, setData] = useState([]); 
  const [kkk, setKkk] = useState({}); 

  const { current: killer } = useRef([]);


  return (
    <PageContext.Provider
      value={{
        data,
        setData
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
const Comment = createContext<PropsContextType>({});

export default PageContext;
