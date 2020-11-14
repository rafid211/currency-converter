import './App.css';
import Converter from './Converter';
import React,{useEffect,useState} from "react"

const API_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOption,setCurrencyOption] = useState([]);
  const [fromCurrency,setFromCurrency] = useState([]);
  const [toCurrency,setToCurrency]=useState([]);
  const [amount,setAmount] = useState(1);
  const [amountFrom,setAmountFrom]  =useState(true);
  const [exChangeRate,setExchangeRate] = useState();

   //console.log(exChangeRate)
  var toAmount,fromAmount;
  if(amountFrom){
    fromAmount = amount;
    toAmount = amount*exChangeRate;
    toAmount = toAmount.toFixed(2);
  }
  else{
    toAmount = amount;
    fromAmount = amount/exChangeRate;
    fromAmount = fromAmount.toFixed(2);
  }

  useEffect(()=>{
    fetch(API_URL)
      .then(res=>res.json())
      .then(data=>{
         const first = Object.keys(data.rates)[0];
        //var go = data.base//Object.keys(data.rates)
        setCurrencyOption([data.base,...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(first)
        setExchangeRate(data.rates[first])
        setAmountFrom(true)

      })
  },[])
  useEffect(()=>{
    if(fromCurrency!=null && toCurrency!=null){
      //const url = '${API_URL}?base=${fromCurrency}&symbol=${toCurrency}'
      fetch(`${API_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          setExchangeRate(data.rates[toCurrency])
        })
    }

  },[fromCurrency,toCurrency])

  function onChangeFuncFrom(item){
    setAmount(item.target.value)
    setAmountFrom(true)
  }
  function onChangeFuncTo(item){
    setAmount(item.target.value)
    setAmountFrom(false)
  }

  return (
      <>
        <header>
          <h1>Currency Converter</h1>
        </header>

        <div className="container">
          <div className="wrepper">
           
            <Converter 
              currencyOption={currencyOption}
              selected = {fromCurrency}
              onChangeCurrency = {item=> setFromCurrency(item.target.value)}
              amount = {fromAmount}
              onChangeAmount = {onChangeFuncFrom}

            ></Converter>

            <h1 className="con">= </h1>

            <Converter 
              currencyOption={currencyOption}
              selected = {toCurrency}
              onChangeCurrency = {item=> setToCurrency(item.target.value)}
              amount = {toAmount}
              onChangeAmount = {onChangeFuncTo}
            ></Converter>

          </div>
      </div>
    </>
  );
}

export default App;
