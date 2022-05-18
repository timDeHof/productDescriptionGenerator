import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [isRefreshPage, setIsRefreshPage] = useState(0);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setListings([
      { Product: productName, Description: description },
      ...listings,
    ]);
    setProductName("");
  }, [isRefreshPage]);

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
    setDescription(data.result);
    setIsRefreshPage(Math.random());
  }
  const productList = listings.map((thing, index) => {
    return (
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
    );
  });

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
