/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

type Country = {
  countryGeoId: number;
  image: string;
  nameKo: string;
};

type CountryCartContextProps = {
  cart: Country[];
  addCountry: (country: Country) => void;
  removeCountry: (id: number) => void;
  resetCart: () => void;
  countryIds: number[];
};

const CountryCartContext = createContext<CountryCartContextProps>({
  cart: [],
  addCountry: () => {},
  removeCountry: () => {},
  resetCart: () => {},
  countryIds: [],
});

type ReducerAction =
  | { type: "ADD"; data: Country }
  | { type: "REMOVE"; targetId: number }
  | { type: "RESET" };

const reducer = (cart: Country[], action: ReducerAction) => {
  switch (action.type) {
    case "ADD":
      return [...cart, action.data];
    case "REMOVE":
      return cart.filter((c) => c.countryGeoId !== action.targetId);
    case "RESET":
      return [];
    default:
      return cart;
  }
};

export const CountryCartProvider = ({ children }: PropsWithChildren) => {
  const [cart, dispatch] = useReducer(reducer, []);

  const addCountry = ({ countryGeoId, image, nameKo }: Country) => {
    dispatch({
      type: "ADD",
      data: {
        countryGeoId,
        image,
        nameKo,
      },
    });
  };
  const removeCountry = (countryGeoId: number) => {
    dispatch({
      type: "REMOVE",
      targetId: countryGeoId,
    });
  };

  const resetCart = () => {
    dispatch({
      type: "RESET",
    });
  };

  const countryIds = cart.map((c) => c.countryGeoId);

  return (
    <CountryCartContext.Provider
      value={{ cart, addCountry, removeCountry, resetCart, countryIds }}
    >
      {children}
    </CountryCartContext.Provider>
  );
};

export const useCountryCartManager = () => useContext(CountryCartContext);
