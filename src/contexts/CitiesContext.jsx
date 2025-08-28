/*eslint-disable*/

import { createContext, useEffect, useContext, useReducer, useCallback } from "react";

const CitiesContext = createContext();

const STORAGE_KEY = "cities_data";

const initialState = {
  cities: [],
  isLoading: true,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/added":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((el) => el.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  function saveToStorage(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  useEffect(function () {
    dispatch({ type: "loading" });

    setTimeout(() => {
      try {
        const storedCities = loadFromStorage();
        dispatch({ type: "cities/loaded", payload: storedCities });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities!",
        });
      }
    }, 500);
  }, []);

  const getCity = useCallback(
    function getCity(id) {
      dispatch({ type: "loading" });

      setTimeout(() => {
        try {
          const city = cities.find((c) => c.id === Number(id));
          if (!city) throw new Error();
          dispatch({ type: "city/loaded", payload: city });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error loading city!",
          });
        }
      }, 500);
    },
    [cities]
  );

  function createCity(newCity) {
    dispatch({ type: "loading" });

    setTimeout(() => {
      try {
        const updatedCities = [...cities, newCity];
        saveToStorage(updatedCities);
        dispatch({ type: "city/added", payload: newCity });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error adding city!",
        });
      }
    }, 500);
  }

  function deleteCity(id) {
    dispatch({ type: "loading" });

    setTimeout(() => {
      try {
        const updatedCities = cities.filter((el) => el.id !== id);
        saveToStorage(updatedCities);
        dispatch({ type: "city/deleted", payload: id });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error deleting city!",
        });
      }
    }, 500);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
        dispatch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return value;
}

export { CitiesProvider, useCities };
