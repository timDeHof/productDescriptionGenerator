import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [productInput, setProductInput] = useState("");
  const [result, setResult] = useState();

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
    setResult(data.result);
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
        <div className={styles.result}>
          //TODO create a card that shows the prompt and the response
          {result}
          //TODO Find a way to store old prompts and descriptions
        </div>
      </main>
    </div>
  );
}
