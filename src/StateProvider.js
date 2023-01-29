import React from "react";
import { createContext, useReducer, useContext } from "react";

//create context
export const StateContext = createContext();

//intialize state and state changer function
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

//using state
export const useStateValue = () => useContext(StateContext);
