import { useEffect, useMemo, useState } from "react";
import { freeCurrencyApiKey, requestOptions } from "../config/constant.js";

function useCurrencyExchange({ to, from }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUrl = useMemo(
    () =>
      `https://api.freecurrencyapi.com/v1/latest?apikey=${freeCurrencyApiKey}&currencies=${to}&base_currency=${from}`,
    [to, from],
  );

  useEffect(() => {
    setLoading(true);
    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchUrl]);

  return { data, loading, error };
}

export default useCurrencyExchange;
