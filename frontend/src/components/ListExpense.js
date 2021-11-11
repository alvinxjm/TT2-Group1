import React, { useState, useEffect } from "react";
import EditExpense from "./EditExpense";
import authHeader from "./Auth.js"

const ListExpense = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      project_id: 2,
      category_id: 2,
      name: "Server Maintenance",
      description:
        "Server maintenance and upgrading work to incorporate BC plans",
      amount: 30000,
      created_at: "2021-11-04T16:00:00.000Z",
      created_by: "Jacky",
      updated_at: "2021-11-06T16:00:00.000Z",
      updated_by: "Jacky",
    },
    {
      id: 2,
      project_id: 3,
      category_id: 4,
      name: "Consultant",
      description: "Consultancy services for integration work",
      amount: 10000,
      created_at: "2021-11-06T16:00:00.000Z",
      created_by: "Helen",
      updated_at: "2021-11-07T16:00:00.000Z",
      updated_by: "Helen",
    },
  ]);

  const deleteExpense = () => {
    console.log("delete expense");
  };

  const getExpenses = () => {
    console.log("get expense");
  };

  // const deleteExpense = async (id) => {
  //   try {
  //     const deleteExpense = await fetch(`http://localhost:5000/expense/${id}`, {
  //       method: "DELETE",
  //     });

  //     setExpenses(expenses.filter((expense) => expense.id !== id));
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

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

  useEffect(() => {
    getExpenses();
  }, []);

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
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>
                <EditExpense expense={expense} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteExpense(expense.id)}
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
