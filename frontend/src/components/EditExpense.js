import React, { useState } from "react";

const EditExpense = ({ expense }) => {
  const [description, setDescription] = useState(expense.description);

  const updateDescription = () => {
    console.log("Edit button pressed");
  };

  // edit description function
  // const updateDescription = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const body = { description };
  //     const response = await fetch(
  //       `http://localhost:5000/expenses/${expense.id}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(body),
  //       }
  //     );

  //     window.location = "/";
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

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
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={(e) => updateDescription(e)}
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
