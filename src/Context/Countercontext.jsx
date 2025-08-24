import { createContext, useState } from "react";


// context to is storage to send to all app data (no) local storage 


export const CounterContext = createContext()

export default function CounterContextProvider({ children }) {

    const [counter, setCounter] = useState(0)

    return <CounterContext.Provider value={{ counter, setCounter }}>
        {children}

    </CounterContext.Provider>
}