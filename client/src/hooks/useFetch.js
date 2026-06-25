import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getTimer, setGetTimer] = useState(false);

  useEffect(() => {
    const getTimer = setTimeout(() => {
      setGetTimer(true);
    }, 2000);

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Something went wrong");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        clearTimeout(getTimer);
        setLoading(false);
        setGetTimer(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(getTimer);
    };
  }, [url]);

  return { data, loading, error, getTimer };
};

export default useFetch;
