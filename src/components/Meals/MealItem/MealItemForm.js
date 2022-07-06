import { useRef,useState } from "react";
import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input"
const MealItemForm=(props)=>{
    const amountInputRef=useRef();
    const [amountIsValid,setAmountIsValid]=useState(true);

    const submitHandler=event=>{
        event.preventDefault();
        
        const enteredAmount=amountInputRef.current.value;
        const enteredAmountNumber=+enteredAmount;
      
        if(enteredAmount.trim().length === 0 || enteredAmountNumber< 1 || enteredAmountNumber>5)
        {
            setAmountIsValid(false)
            return
        }
props.onAddToCart(enteredAmountNumber);
    };
return  (
 
<form className={classes.form} onSubmit={submitHandler}>

    <Input label="Amount" ref={amountInputRef} input={{
        id:'amount_'+props.id,
        type:'number',
        min:'1',
        max:'5',
        step:'1',
        defaultValue:'1'
    }} />
    <button>+add</button>
    {!amountIsValid &&<>Please enter valid amount(1-5)</>}
</form>
);
}
export default MealItemForm;