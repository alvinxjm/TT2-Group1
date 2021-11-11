import React, { useState, useEffect } from "react";
import EditExpense from "./EditExpense";
import authHeader from "./Auth.js"
import { useHistory, useLocation } from 'react-router-dom'

import axios from 'axios'

const ListExpense = () => {


  const location = useLocation();
  

  const [expenses, setExpenses] = useState([]);

  const deleteExpense = () => {
    console.log("delete expense");
  };

  const getExpenses = () => {
    console.log("get expense");
    console.log(location.state.projectid)
  };

  useEffect(() => {
        
    const getExpensesData = async () => {
      
        const result = axios.get('http://localhost:5000/expense/'+location.state.projectid).then((res)=>{
          console.log(expenses)
            setExpenses(res.data)
            console.log(res)
            console.log(res.data)
        })  
        

    }

    getExpensesData()
}, [])






  const deleteExpenses = async (id) => {
    try {
      const deleteExpense = await fetch(`http://localhost:5000/expense/delete/${id}`, {
        method: "DELETE",
      });

      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // const getExpenses = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/expenses/${project_id}"
  //     );
  //     const jsonData = await response.json();

  //     setExpenses(jsonData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };



  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length>0 && expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>
                <EditExpense expense={expense} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteExpenses(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListExpense;
