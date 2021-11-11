import React, { useState } from "react";

const EditExpense = ({ expense }) => {
  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState('');
  const [descriptionV, setDescriptionV] = useState('');


  const updateDescription = () => {
    console.log("Edit button pressed");
  };

  // edit description function
  const editExpensesAPI = async (e) => {
    try {
      const body = { 
        name:name,
        amount:amount,
        description:descriptionV,
          expense_id: 1,
          
          project_id: 2,
          
          category_id: 2,

          
          updated_by: "user101"
          
          
       };
      const response = await fetch(
        `http://localhost:5000/expense`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      ).catch(error => {console.log(error)})

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {/* 
        Each button has a target that corresponds to the modal below 
        Hence the data-bs-target = {`#id${expense.id}`}
        */}
      <button
        type="button"
        class="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${expense.id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${expense.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={() => setDescription(expense.description)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Expense
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setDescription(expense.description)}
              />
            </div>
            <div class="modal-body">
              Description: <input
                type="text"
                className="form-control"
                onChange={(e) => setDescriptionV(e.target.value)}
              />
              <br/>
              name: <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
                            <br/>
              amount: <input
                type="text"
                className="form-control"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={editExpensesAPI}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => setDescription(expense.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditExpense;
