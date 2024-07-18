import { useCallback, useMemo, useState } from "react";
import useGetSymbols from "./hooks/useGetSymbols.js";
import { BackgroundImage } from "./config/constant.js";
import { InputBox } from "./components/index.js";
import useCurrencyExchange from "./hooks/useCurrencyExchange.js";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("THB");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const { symbols, loading } = useGetSymbols();

  const exchangeData = useCurrencyExchange({ to, from });

  const swap = useCallback(() => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }, [to, from, amount, convertedAmount]);

  const handleConversion = useCallback(
    (e) => {
      e.preventDefault();

      if (exchangeData.data && exchangeData.data[to] && amount) {
        setConvertedAmount(exchangeData.data[to] * amount);
      }
    },
    [exchangeData.data, to, amount],
  );

  const memoizedBackgroundStyle = useMemo(
    () => ({
      backgroundImage: `url('${BackgroundImage}')`,
    }),
    [],
  );
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={memoizedBackgroundStyle}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-50 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={handleConversion}>
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={symbols}
                onCurrencyChange={setFrom}
                onAmountChange={setAmount}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={symbols}
                onAmountChange={setConvertedAmount}
                onCurrencyChange={setTo}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {`${from} to ${to}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
