import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { render } from 'react-dom'
import {
    Form,
    Container,
    Button,
    Table
} from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import authHeader from "./Auth.js"




function ProjectPage(){
    let history = useHistory()
    const[data,setData] = useState(null);

    useEffect(() => {
        
        const getProjectsData = async () => {
            
            const result = axios.get('http://localhost:5000/project').then((res)=>{
                setData(res.data)
                console.log(res)
                console.log(res.data)
            })  
            

            
            console.log("hi")
        }

        getProjectsData()
    }, [])

    const GoExpensesPage = (e) => {
        console.log(e.target.value)
        history.push({
            pathname: '/expenses/'+ e.target.value,
            state: {
                projectid: e.target.value
            }
        })
    }



    return(
        <div >
            <br />

            <p><b> Welcome user</b></p>
            
            <Table>
                <thead>
                    <tr>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Budget</th>
                    <th>Links</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data &&  Object.keys(data).map((key)=>
                        <tr>
                            <td>
                                {data[key]["name"]}
                            </td>
                            <td>
                                {data[key]["description"]}
                            </td>
                            <td>
                                {data[key]["budget"]}
                            </td>
                            <td>
                                <Button value = {data[key]["user_id"]} onClick = {GoExpensesPage}> Go</Button>
                            </td>
                        </tr>
                        )
                        
                    }


                </tbody>
            </Table>


        </div>

    )
}

export default ProjectPage
