import { useEffect, useState } from "react";
import { freeCurrencyApiKey } from "../config/constant.js";

async function fetchSymbols(setSymbols, setLoading, setError) {
  try {
    const storeSymbols = JSON.parse(localStorage.getItem("currencySymbols"));
    if (storeSymbols) {
      setSymbols(storeSymbols);
    } else {
      const response = await fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${freeCurrencyApiKey}`);
      const data = await response.json();
      const symbolsData = Object.keys(data.data);
      localStorage.setItem("currencySymbols", JSON.stringify(symbolsData));
      setSymbols(symbolsData);
    }
  } catch (error) {
    setError(error.toString());
  } finally {
    setLoading(false);
  }
}
function useGetSymbols() {
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSymbols(setSymbols, setLoading, setError);
  }, []);

  return { symbols, loading, error };
}

export default useGetSymbols;
