/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useContext, useReducer } from "react";
import uuid from "../utils/uuid";
import DemoPage from "../components/pages/DemoPage";

type NavigationContextProp = {
  path: ReactNode[];
  prevPage: ReactNode | null;
  navigateTo: (newPath: ReactNode) => void;
  back: () => void;
  home: () => void;
  setPath: (path: ReactNode[]) => void;
};
const BLANK_FUNC = () => {};

const NavigationContext = createContext<NavigationContextProp>({
  path: [],
  prevPage: null,
  navigateTo: BLANK_FUNC,
  back: BLANK_FUNC,
  home: BLANK_FUNC,
  setPath: BLANK_FUNC,
});

type PathAction =
  | { type: "push"; payload: ReactNode }
  | { type: "pop"; payload: null }
  | { type: "clear"; payload: null }
  | { type: "set"; payload: ReactNode[] };

const reducer = (
  path: ReactNode[],
  { type, payload }: PathAction
): ReactNode[] => {
  let newPath: ReactNode[];
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
  const [prevPage, setPrevPage] = useState<ReactNode | null>(null);
  const [path, dispatch] = useReducer(reducer, [<DemoPage key={uuid()} />]);
  useEffect(() => {
    if (path.length == 0) setPath([<DemoPage key={uuid()} />]), [path];
  });

  const navigateTo = useCallback((newPath: ReactNode) => {
    dispatch({ type: "push", payload: newPath });
  }, []);
  const back = useCallback(() => {
    setPrevPage(path[path.length - 1]);
    dispatch({ type: "pop", payload: null });
  }, [path]);
  const home = useCallback(() => {
    dispatch({ type: "clear", payload: null });
  }, []);
  const setPath = useCallback((path: ReactNode[]) => {
    dispatch({ type: "set", payload: path });
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        path,
        prevPage,
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
