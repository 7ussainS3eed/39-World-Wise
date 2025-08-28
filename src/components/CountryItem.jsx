/* eslint-disable react/prop-types */

import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <img
        src={country.flagUrl}
        alt={`Flag of ${country.countryName}`}
        className={styles.flag}
      />
      <span>
        {country.countryName.length > 14
          ? country.countryName.slice(0, 14) + " ..."
          : country.countryName}
      </span>
    </li>
  );
}

export default CountryItem;
