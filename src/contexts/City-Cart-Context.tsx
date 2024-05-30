/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

type City = {
  cityIdx: number;
  nameKo: string;
  nameEn: string;
  image: string;
};

type CityCartContextProps = {
  cart: City[];
  addCity: (City: City) => void;
  removeCity: (id: number) => void;
  resetCart: () => void;
  cityIds: number[];
};

const CityCartContext = createContext<CityCartContextProps>({
  cart: [],
  addCity: () => {},
  removeCity: () => {},
  resetCart: () => {},
  cityIds: [],
});

type ReducerAction =
  | { type: "ADD"; data: City }
  | { type: "REMOVE"; targetId: number }
  | { type: "RESET" };

const reducer = (cart: City[], action: ReducerAction) => {
  switch (action.type) {
    case "ADD":
      return [...cart, action.data];
    case "REMOVE":
      return cart.filter((c) => c.cityIdx !== action.targetId);
    case "RESET":
      return [];
    default:
      return cart;
  }
};

export const CityCartProvider = ({ children }: PropsWithChildren) => {
  const [cart, dispatch] = useReducer(reducer, []);

  const addCity = ({ cityIdx, image, nameKo, nameEn }: City) => {
    dispatch({
      type: "ADD",
      data: {
        cityIdx,
        image,
        nameKo,
        nameEn,
      },
    });
  };
  const removeCity = (cityIdx: number) => {
    dispatch({
      type: "REMOVE",
      targetId: cityIdx,
    });
  };

  const resetCart = () => {
    dispatch({
      type: "RESET",
    });
  };

  const cityIds = cart.map((c) => c.cityIdx);

  return (
    <CityCartContext.Provider
      value={{ cart, addCity, removeCity, resetCart, cityIds }}
    >
      {children}
    </CityCartContext.Provider>
  );
};

export const useCityCartManager = () => useContext(CityCartContext);
