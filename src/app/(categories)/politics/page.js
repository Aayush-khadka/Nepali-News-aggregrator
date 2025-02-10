// src/app/(categories)/politics/page.js

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PoliticsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/category/politics"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        // Access the data array from the response
        if (result.statuscode === 200 && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          setError("Expected an array but got something else.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center text-black">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Politics Data</h1>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item._id} className="p-4 border rounded shadow">
            <Link href={`/article/${item._id}`}>
              <h2 className="text-xl font-semibold text-black cursor-pointer">
                {item.title}
              </h2>
            </Link>
            <p className="text-black">{item.summary}</p>
            <a href={item.articleLink} className="text-blue-500 underline">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
