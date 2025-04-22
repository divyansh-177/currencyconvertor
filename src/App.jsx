// src/App.js
import React, { useState } from 'react';
import InputBox from './components/IB';
import useCurrinfo from './usecurrinfo';

function App() {
  const [amount, setAmount] = useState(0.00);
  const [from, setFrom] = useState("tether");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrinfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];
  const swap = () => {
   
    const tempCurrency = from;
    setFrom(to);
    setTo(tempCurrency);
  
    const amt = Number(amount) || 0;
  const conv = Number(convertedAmount) || 0;
    const newAmount        = parseFloat(conv.toFixed(2));
    const newConvertedAmt  = parseFloat(amt  .toFixed(2));
    setAmount(newAmount);
    setConvertedAmount(newConvertedAmt);
  };
  
  

  const convert = () => {
    if(from == 'inr') 
    setConvertedAmount(amount * (1/currencyInfo[to]["inr"] ));
    else 
    setConvertedAmount(amount * currencyInfo[from]["inr"]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url("satta.jpeg")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={e => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOption={options}
                onCurrencyChange={setFrom}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOption={options}
                onCurrencyChange={setTo}
                selectCurrency={to}
                amountDisabled
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
