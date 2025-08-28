import styles from "./Product.module.css";
import PageNav from "../components/PageNav"

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav/>
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About World Wise.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Illo est dicta illum vero culpa cum quaerat architecto 
            sapiente eius non soluta, molestiae nihil laborum, 
            placeat debitis, laboriosam at fuga perspiciatis?
          </p>
        </div>
      </section>
    </main>
  );
}