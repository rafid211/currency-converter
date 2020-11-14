import React from 'react'
import App from './App';
function Converter(props) {
   
   

    return (
        <div>
             
            <input type="number" value={props.amount} className="input" onChange={props.onChangeAmount}/>
           
            <select value={props.selected} onChange={props.onChangeCurrency}>
                {/* <option value="none" selected disabled hidden> 
                    Select
                </option>  */}
                
                {props.currencyOption.map((item) => {
                     return <option key={item} value={item}>{item}</option>;
                })}
                
            </select>
            
        </div>
    )
}
export default Converter;