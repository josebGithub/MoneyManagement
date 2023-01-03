import React, {useState, useEffect} from "react"
import axios from "axios"
import { Link} from "react-router-dom";
import '../../../assets/css/main.css'
import Navigation from "../../Navigation";
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const ListCategories = () => {
    const [categories, setCategories] = useState([]);
    
        useEffect(() => {
        getCategories();
        });

        
        const getCategories = async () => {
        const response = await axios.get("http://localhost:3001/statements");
        setCategories(response.data);
        };
    
        const deleteCategory = async (id) => {
            try {
                await axios.delete(`http://localhost:3001/statements/delete/${id}`);
                getCategories();
                } catch (error) {
                console.log(error);
            }
        };

        const submitDelete = (id) => {

            confirmAlert({
              title: 'Confirm to submit',
              message: 'Are you sure to do this.',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteCategory(id)
                },
                {
                  label: 'No',
                  onClick: () => getCategories()
                }
              ]
            });
          }
        
        return (
    <section id='cardanalysis'>
        <div>
        <Navigation></Navigation>
        <div>
        <table >
            <thead>
            <tr>
                <th></th>
                <th>Description</th>
                <th>Category</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {categories.map((category, index) => (
                    <tr>
                    <td>{index + 1}</td>
                    <td>{category.description}</td>
                    <td>{category.category}</td>
                    <td>
                        <Link
                            to={`../edit/${category._id}`}>
                             Edit
                        </Link>
                    </td>
                    <td> 
                        <button
                            onClick={()=> submitDelete(category._id)}
                            className="btn"
                            >
                            Delete
                        </button>
                    </td>
                
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
  </section>
    
        );
    };

    export default ListCategories;