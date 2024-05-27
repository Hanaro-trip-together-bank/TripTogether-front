/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useContext, useReducer } from "react";
import uuid from "../utils/uuid";
import Route from "../types/Route";
import MainPage from "../pages/Main/MainPage";

type NavigationContextProp = {
  path: Route[];
  prevRoute: Route | null;
  navigateTo: (newPath: Route) => void;
  back: () => void;
  home: () => void;
  setPath: (path: Route[]) => void;
};

const BLANK_FUNC = () => {};

const NavigationContext = createContext<NavigationContextProp>({
  path: [],
  prevRoute: null,
  navigateTo: BLANK_FUNC,
  back: BLANK_FUNC,
  home: BLANK_FUNC,
  setPath: BLANK_FUNC,
});

type PathAction =
  | { type: "push"; payload: Route }
  | { type: "pop"; payload: null }
  | { type: "clear"; payload: null }
  | { type: "set"; payload: Route[] };

const reducer = (path: Route[], { type, payload }: PathAction): Route[] => {
  let newPath: Route[];
  switch (type) {
    case "push":
      newPath = [...path, payload];
      break;
    case "pop":
      newPath = [...path.slice(0, path.length - 1)];
      break;
    case "clear":
      newPath = [];
      break;
    case "set":
      newPath = [...payload];
  }
  return newPath;
};

export const NavigationProvider = ({ children }: PropsWithChildren) => {
  const [prevRoute, setPrevPage] = useState<Route | null>(null);
  const [path, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    if (path.length == 0)
      setPath([
        // { page: <MoimServiceMainPage key={uuid()} /> },
        { backgroundColor: "bg-[#e3e7e9]", page: <MainPage key={uuid()} /> },
      ]),
        [path];
  });

  const navigateTo = useCallback((newPath: Route) => {
    dispatch({ type: "push", payload: newPath });
  }, []);
  const back = useCallback(() => {
    setPrevPage(path[path.length - 1]);
    dispatch({ type: "pop", payload: null });
  }, [path]);
  const home = useCallback(() => {
    dispatch({ type: "clear", payload: null });
  }, []);
  const setPath = useCallback((path: Route[]) => {
    dispatch({ type: "set", payload: path });
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        path,
        prevRoute,
        navigateTo,
        back,
        home,
        setPath,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
