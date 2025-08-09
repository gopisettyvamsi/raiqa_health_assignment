import React, { useState, useEffect } from "react";
import Head from "next/head";
import Counter from "../components/Counter";
import ListView from "../components/ListView";

const Home: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [items, setItems] = useState<number[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedItems = localStorage.getItem("app_items");
      const savedCount = localStorage.getItem("app_count");
      const savedOrder = localStorage.getItem("app_order");

      if (savedItems) setItems(JSON.parse(savedItems));
      if (savedCount) setCount(Number(savedCount) || 0);
      if (savedOrder === "asc" || savedOrder === "desc") setOrder(savedOrder);
    } catch (err) {
      console.error("Error restoring data:", err);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("app_items", JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("app_count", count.toString());
    }
  }, [count]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("app_order", order);
    }
  }, [order]);

  const addItem = (num: number) => {
    if (items.includes(num)) return; 

    const updated = [...items, num];
    const sorted = order === "asc"
      ? updated.sort((a, b) => a - b)
      : updated.sort((a, b) => b - a);

    setItems(sorted);
  };

  const toggleSortOrder = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);

    const reSorted = [...items].sort((a, b) =>
      newOrder === "asc" ? a - b : b - a
    );
    setItems(reSorted);
  };

  const resetAll = () => {
    setItems([]);
    setCount(0);
    if (typeof window !== "undefined") {
      localStorage.removeItem("app_items");
      localStorage.removeItem("app_count");
      localStorage.removeItem("app_order");
    }
  };

  return (
    <>
      <Head>
        <title>Number Tracker App</title>
        <meta
          name="description"
          content="Track numbers with a counter, sortable list, and persistent storage."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Number Tracker (Assignment_Vamsi)
            </h1>
            <p className="text-gray-600">
              Count, store, and sort numbers — with data saved automatically.
            </p>
          </header>

          <Counter
            onSubmitCount={addItem}
            value={count}
            setValue={setCount}
          />

          <ListView
            values={items}
            onToggleSort={toggleSortOrder}
            currentOrder={order}
            onClear={resetAll}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
