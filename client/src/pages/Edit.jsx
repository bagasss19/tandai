import React, { useState, useEffect } from 'react'
import '../App.css'
import Axios from '../config/axios'
// import ImageUploader from 'react-images-upload';
import {
    useParams
} from "react-router-dom";

export default function Edit(props) {
    let { id } = useParams();
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    // const [media, setmedia] = useState(null)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        Axios({
            url: '/post/' + id,
            method: 'get',
            headers: {
                token: localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                settitle(response.data.title)
                setcontent(response.data.content)
                // setmedia(response.data.media)
                setloading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error, "<<<<<<<<<<<ERRORRR");
            });
    }, [id])


    // function onDrop(picture) {
    //     console.log(picture[0], "<<<<<ada gak???")
    //     setmedia(picture[0])
    // }

    function edit() {
        const input = {title, content}

        Axios({
            url: '/post/' + id,
            method: 'put',
            data: input,
            headers: {
                token: localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                console.log(response, "response<<<<<<<<<<< SUKSES GAKKKKKK")
                props.history.push('/')

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    if (loading) {
        return (<h1>Loading...</h1>)
    }

    else {
        return (
            <>
                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Edit Reimbursment</h1>
                <form className="form" style={{ marginTop: "100px", width: "50%", marginLeft: "300px" }}
                    encType="multipart/form-data"
                    onSubmit={(e) => {
                        e.preventDefault()
                        edit()
                    }
                    }>

                    <div className="field">
                        <label className="label is-family-code">Title</label>
                        <input className="input" type="text" name="Title"
                            style={{ marginBottom: "30px" }}
                            defaultValue={title}
                            placeholder="Title" onChange={e => settitle(e.target.value)} />
                    </div>

                    <div className="field">
                        <label className="label is-family-code">Content</label>
                        <input className="input" type="text" name="Content"
                            style={{ marginBottom: "30px" }}
                            defaultValue={content}
                            placeholder="Content" onChange={e => setcontent(e.target.value)} />
                    </div>

                    {/* <ImageUploader
                        style={{ marginBottom: "30px" }}
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                        singleImage={true}
                        defaultImage={media}
                    /> */}

                    <button className="button is-black" type="submit">Submit</button>
                </form>
            </>
        )
    }
}