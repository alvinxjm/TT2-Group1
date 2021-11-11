import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";
const InputExpense = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = () => {
    console.log("Submitted");
  };

  // const onSubmitForm = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const body = { description };
  //     const response = await fetch(
  //       "http://localhost:5000/expenses/{$project_id}",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(body),
  //       }
  //     );

  //     window.location = "/";
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  return (
    <>
      <h1 className="text-center mt-5">Expense List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
      <Form>
                <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>name</Form.Label>
                    <Form.Control 
                        required
                        type="name" 
                        placeholder="Enter Username"
                        value={username}
                        onChange={(usernameValue) =>
                          setName(usernameValue.target.value)
                        }
                        
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        required
                        type="description" 
                        placeholder="Enter Password"
                        value={description}
                        onChange={(descriptiondValue) =>
                          setAmount(descriptiondValue.target.value)
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                        required
                        type="amount" 
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(amountValue) =>
                          setDescription(amountValue.target.value)
                        }
                    />
                </Form.Group>
                <Button variant="primary" onClick={Login}>
                    Login!
                </Button>
            </Form>
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};
export default InputTodo;
