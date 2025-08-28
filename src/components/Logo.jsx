import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logo}>
      <img src="/icon.png" alt="World Wise logo" />
      <span>World Wise</span>
    </div>
  );
}

export default Logo;
