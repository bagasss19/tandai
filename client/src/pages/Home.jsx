import React, { useEffect, useState } from 'react'
import Axios from '../config/axios'
import {
    Link,
} from "react-router-dom";

export default function Home() {
    const [data, setdata] = useState({})
    const [loading, setloading] = useState(true)
    useEffect(() => {
        Axios({
            url: '/post',
            method: 'get',
            headers: {
                token: localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                console.log(response.data, "response<<<<<<<<<<<")
                setdata(response.data)
                setloading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, [])

    if (loading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div>
                <Link to="/add">
                    <button className="button is-black"
                        style={{ marginBottom: "30px", marginTop: '30px' }}>Add Model</button>
                </Link>
                <table className="table is-hoverable is-fullwidth" style={{ marginTop: "50px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Media</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((x) => (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td><figure className="image is-32x32"> <img src={x.media} alt="img" style={{ height: "25px" }} /></figure></td>
                                <td>{x.title}</td>
                                <td>{x.content}</td>
                                <td>
                                    <Link to={`/edit/${x.id}`}><button className="button is-black" style={{ marginRight: "10px" }}>Edit</button></Link>
                                    <button className="button is-black" onClick={(e) => {
                                        e.preventDefault()
                                        Axios({
                                            url: 'http://localhost:3000/post/' + x.id,
                                            method: 'delete',
                                            headers: {
                                                token: localStorage.token
                                            }
                                        })
                                            .then(function (response) {
                                                // handle success
                                                console.log(response, "response<<<<<<<<<<< SUKSES GAKKKKKK")
                                                window.location.reload();

                                            })
                                            .catch(function (error) {
                                                // handle error
                                                console.log(error);
                                            })
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
