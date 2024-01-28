import "./share.scss";
import img from "../../assets/img.png";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import {useMutation, useQueryClient} from 'react-query'
import {makeRequest} from "../../axios.js";

const Share = () => {
    const [file, setFile] = useState(null)
    const [content, setContent] = useState("")

    const upload = async ()=>{
        try{
            const formData = new FormData();
            formData.append("file", file);
            const res =await makeRequest.post("/upload", formData);
            return res.data;
        }catch (err){
            console.log(err)

        }

    }

    const {currentUser} = useContext(AuthContext);
    const queryClient = useQueryClient();
    const mutation = useMutation((newPost) => {
        return makeRequest.post("/posts", newPost)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"])
        },
    })
    const handleClick = async(e) =>{
        e.preventDefault();
        let imgUrl ="";
        if(file) imgUrl = await upload();
        mutation.mutate({content, picture: imgUrl})
        setContent("");
        setFile(null);
    }
    return(
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                    <img src={currentUser.profile_pic} alt=""/>
                    <input type="text" placeholder={`What's on your mind ${currentUser.user_name}?`}
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    />
                    </div>
                    <div className="right">
                        {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
                    </div>
                    </div>
                <hr/>
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{display: "none"}}
                               onChange={(e) => setFile(e.target.files[0])}/>
                        <label htmlFor="file">
                            <div className="item">
                                <img src={img} alt=""/>
                                <span>Add Image</span>
                            </div>
                        </label>

                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Share;