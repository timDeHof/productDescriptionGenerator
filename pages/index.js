import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [productInput, setProductInput] = useState("");
  const [result, setResult] = useState();
  const [things, setThings] = useState([{ Product: "", Description: "" }]);
  console.log("things:", things);
  const productList = things.map((thing, index) => (
    <div className={styles.result} key={index}>
      <ul>
        <li>
          <label>Product:</label>
          <p>{thing.Product}</p>
          <label>Description:</label>
          <p>{thing.Description}</p>
        </li>
      </ul>
    </div>
  ));

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: productInput }),
    });

    const data = await response.json();
    console.log("data:", data);
    setResult(data.result);
    setThings([{ Product: productInput, Description: result }, ...things]);
    setProductInput("");
  }
  return (
    <div>
      <Head>
        <title>Generate Product description</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>Generate a Product Description</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="product"
            placeholder="Enter a product name"
            value={productInput}
            onChange={(event) => setProductInput(event.target.value)}
          />
          <input type="submit" value="Generate product description" />
        </form>
        {productList}
      </main>
    </div>
  );
}
//TODO create a card that shows the prompt and the response
//TODO Find a way to store old prompts and descriptions
