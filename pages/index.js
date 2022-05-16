import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [listings, setListings] = useState([{ Product: "", Description: "" }]);

  useEffect(() => {
    fetchDescription();
    setListings([
      { Product: productName, Description: description },
      ...listings,
    ]);
    console.log("listings:", listings);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDescription();
  };

  async function fetchDescription() {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: productName }),
    });
    const data = await response.json();
    console.log("data:", data);
    setDescription(data.result);
    setProductName("");
  }
  const productList = listings.map((thing, index) => (
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

  return (
    <div>
      <Head>
        <title>Generate Product description</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>Generate a Product Description</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="product"
            placeholder="Enter a product name"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
          <button type="submit" value="Generate product description">
            Generate product description
          </button>
        </form>
        {productList}
      </main>
    </div>
  );
}
//TODO create a card that shows the prompt and the response
//TODO Find a way to store old prompts and descriptions
