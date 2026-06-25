import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimer(true);
    }, 3000);

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Something went wrong");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        clearTimeout(timer);
        setLoading(false);
        setTimer(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(timer);
    };
  }, [url]);

  return { data, loading, error, timer };
};

export default useFetch;
