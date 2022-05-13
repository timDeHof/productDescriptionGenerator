import Head from "next/head";
import { useState } from "react";
import "./index.css";

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
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
