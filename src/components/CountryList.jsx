/* eslint-disable react/prop-types */

import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) {
    return <Message message="No countries yet!" />;
  }

  const seenCountries = new Set();
  const countries = cities.filter((obj) => {
    if (seenCountries.has(obj.countryName)) {
      return false;
    } else {
      seenCountries.add(obj.countryName);
      return true;
    }
  });

  return (
    <ul className={styles.countryList}>
      {countries.map((ele) => (
        <CountryItem country={ele} key={ele.id} />
      ))}
    </ul>
  );
}

export default CountryList;
