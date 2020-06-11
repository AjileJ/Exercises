import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Exercise = props => {
    return(
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/" +props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id) }}>delete</a>
            </td>
        </tr>
    )
}

export default function ExercisesList(props){

    const [exercises, setExercises] = useState([])

    


    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                setExercises(res.data)
            })
            .catch(err => {
                console.log('Error', err)
            })
    })

    function deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/' +id)
            .then(res => {
                console.log(res.data)
                setExercises(exercises.filter(el => el._id != id))
            })  
            .catch(err => console.log('Error: ', err))
    }

    function exerciseList(){
        return exercises.map(currentexercise => {
            return <Exercise exercise= {currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />
        })
    }


    return(
        <div>
            <h1>Logged Exercises</h1>
            <table className= 'table'>
                <thead className='thead-light'>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    )
}