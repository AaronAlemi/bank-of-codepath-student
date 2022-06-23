import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import "./App.css"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from "react"



export default function App() {

  const [isLoading, setIsLoading] = useState()
  const [transactions, setTransactions] = useState([])
  const [transfers, setTransfers] = useState([])
  const [error, setError] = useState("")
  const [filterInputValue, setFilterInputValue] = useState("")
  const [newTransactionForm, setNewTransactionForm] = useState({category:"", description:"", amount:0})
  const [isCreating, setIsCreating] = useState(false)

 

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}/>
        <main>
          <Routes>

            <Route 
              path="/" element={
                <Home 
                  isLoading={isLoading} setIsLoading={setIsLoading}
                  transactions={transactions} setTransactions={setTransactions}
                  transfers={transfers} setTransfers={setTransfers}
                  error={error} setError={setError}
                  filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}
                  newTransactionForm={newTransactionForm} setNewTransactionForm={setNewTransactionForm}
                  isCreating={isCreating} setIsCreating={setIsCreating}
                />
              }>
            </Route>
            <Route path="/transactions" element={
              <TransactionDetail transactionId/>
            }>
            </Route>

          </Routes>
          
        </main>
      </BrowserRouter>
      
    </div>
  )
}
