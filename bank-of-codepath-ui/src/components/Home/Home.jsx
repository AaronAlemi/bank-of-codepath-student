import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

import axios from "axios"
import { useEffect } from "react"
import { API_BASE_URL } from "../../constants"


/*
The `Home.jsx` component should create a `filteredTransactions` array using its `transactions` prop. 
If its `filterInputValue` prop is NOT an empty string, it should filter the transactions based on 
whether or not the lowercased `description` property of a transaction contains the lowercased `filterInputValue`. 
Otherwise, it should just be the `transactions` prop. The `filteredTransactions` array should be passed to the `BankActivity` 
component as its `transactions` prop.

*/

export default function Home(props) {
  const {

  } = props;



  /*{names.filter(name => name.includes('J')).map(filteredName => (
    <li>
      {filteredName}
    </li>
  ))}*/

  

  useEffect(() => {
    async function getData() {
      props.setIsLoading(true);
      try {
        const transactions = await axios.get(API_BASE_URL + "/bank/transactions")
        console.log(transactions)
        if(transactions?.data?.transactions) {
          props.setTransactions(transactions.data.transactions)
        }
        const transfers = await axios.get(API_BASE_URL + '/bank/transfers')
        if(transfers?.data?.transfers) {
          props.setTransfers(transfers.data)
        }
      }
      catch (error) {
        props.setError(error)
        console.log(props.error)
      }
      finally {
        props.setIsLoading(false)
      }
    }

    getData();
  }, []);


  const filteredTransactions = (props.filterInputValue ? props.transactions?.filter(transaction => {
        return transaction.description.toLowerCase().includes(props.filterInputValue.toLowerCase())})
    : props.transactions)
  console.log("Filtered Transactions are " + filteredTransactions)


  /*function handleFilterTransactions() {
    let filteredTransactions = []

    if (props.filterInputValue != "") {
      //filteredTransactions = props.transactions.filter(transaction.description.toLowerCase() => (transaction.description.includes('J')))
  
      filteredTransactions = props.transactions?.filter((transaction) =>  {
        transaction.description.toLowerCase().includes(props.filterInputValue.toLowerCase())
      });
      // filteredTransactions = props.transactions.filter()
    }
    else {
      filteredTransactions = props.transactions;
    }
  } */

  function handleOnSubmitNewTransaction() {

  }

  async function handleOnCreateTransaction() {
    props.setIsCreating(true)
    axios.post(API_BASE_URL + "/bank/transactions", props.newTransactionForm)

    try {

    }
    catch (error) {

    }
    finally {
      
    }

  }

  return (
    <div className="home">
      {props.error != null ? <h2 className="error">Error message</h2> : <></>}
      <AddTransaction isCreating={props.isCreating} setIsCreating={props.setIsCreating} form={props.newTransactionForm} setForm={props.setNewTransactionForm} handleOnSubmit={handleOnSubmitNewTransaction}/>
      {props.isLoading ? <h1>Loading...</h1> : <BankActivity transactions={filteredTransactions}/>}
    </div>
  )
}
