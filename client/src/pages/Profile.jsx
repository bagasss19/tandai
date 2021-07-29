import React, { useState } from 'react'

export default function Profile() {
    const [title, settitle] = useState("null")
    const [content, setcontent] = useState("undefineda")
    return (
        <div>
            <figure class="image is-128x128" style={{ margin: "auto", marginTop: "75px" }}>
                <img class="is-rounded" alt="profil" src="https://stickerly.pstatic.net/sticker_pack/hlmWGXRBp4SiGY7Y5ZqCHQ/VQG4JY/2/aa5ea56b-64ad-4779-9e30-0af35c43def3.png" />
            </figure>

            <div style={{ width: "50%", margin: "auto" }}>
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
            </div>
        </div>
    )
}
