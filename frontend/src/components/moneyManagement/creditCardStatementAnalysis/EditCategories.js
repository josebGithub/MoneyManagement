import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ListCategories from "./ListCategories";

const EditCategories = () => {
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const navigate = useNavigate();
const { id } = useParams();

useEffect(() => {
    console.log("getCategoryById...")
getCategoryById();
}, []);

const getCategoryById = async () => {
const response = await axios.get(`http://localhost:3001/statements/${id}`);
console.log(response.data.description+","+response.data.category)
setDescription(response.data.description);
setCategory(response.data.category);
};

const updateCategory = async (e) => {
  e.preventDefault();
  try { 
    await axios.patch(`http://localhost:3001/statements/${id}`, {
        description,
        category
    });
   navigate('/list')
  } catch (error) {
      console.log(error);
    }
  };

   return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={updateCategory}>
          <div className="field">
            <label className="label">Description</label>
              <input
                type="text"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
             />
          </div>
          <div className="field">
            <label className="label">Category</label>
              <input
                type="text"
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
             />
         </div>
       
          <div className="field">
            <button type="submit" className="btn btn-small">
              Update
            </button>
         </div>
        </form>
     </div>
    </div>
  );
};

export default EditCategories;