import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Trip } from "../types/trip/Trip";

type TripBasicInfo = {
  teamIdx: number;
  teamName: string;
  tripName: string;
  tripContent: string | undefined;
  tripGoalAmount: number;
  tripDay: number;
  tripImg: number;
  tripStartDay: string | undefined;
  createdBy: number;
};

type TripContextProps = {
  trip: Trip | null;
  addBasicInfo: (basicInfo: TripBasicInfo) => void;
  addCities: (cities: number[]) => void;
  addInfo: (trip: Trip) => void;
};

const TripContext = createContext<TripContextProps>({
  trip: null,
  addBasicInfo: () => {},
  addCities: () => {},
  addInfo: () => {},
});

type ReducerAction =
  | { type: "FIRST"; data: TripBasicInfo }
  | { type: "SECOND"; data: number[] }
  | { type: "CREATE"; data: Trip };

const reducer = (trip: Trip | null, action: ReducerAction) => {
  switch (action.type) {
    case "FIRST":
      return { ...action.data, cities: [] };
    case "SECOND":
      return trip && { ...trip, cities: action.data };
    case "CREATE": {
      return { ...action.data };
    }
    default:
      return trip;
  }
};

export const TripProvider = ({ children }: PropsWithChildren) => {
  const [trip, dispatch] = useReducer(reducer, null);

  const addBasicInfo = (basicInfo: TripBasicInfo) => {
    dispatch({
      type: "FIRST",
      data: { ...basicInfo },
    });
  };

  const addCities = (cities: number[]) => {
    dispatch({
      type: "SECOND",
      data: cities,
    });
  };
  const addInfo = (trip: Trip) => {
    dispatch({
      type: "CREATE",
      data: { ...trip },
    });
  };

  return (
    <TripContext.Provider value={{ trip, addBasicInfo, addCities, addInfo }}>
      {children}
    </TripContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTrip = () => useContext(TripContext);
