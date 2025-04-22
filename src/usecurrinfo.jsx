import {useState, useEffect} from 'react'


let useCurrinfo = (currency) =>{
    const [data, setData] = useState(null);
    
    useEffect( () =>{
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,dogecoin,bitcoin-cash,tron,eos,ripple,tether,usd-coin,binancecoin,binance-usd,cronos,solana,polygon,shiba-inu,apecoin,dai,chainlink,the-sandbox,uniswap,trumpcoin&vs_currencies=inr`)
    .then((res) => res.json())
    .then(res => {
      res[`inr`] = {inr : 1};
    return    setData(res)
    })}
    , [currency]) 
    return data;
}

export default useCurrinfo;