import "./Home.scss";
import Stories from "../../components/stories/stories.jsx";
import Posts from "../../components/posts/Posts.jsx";
import storyPic from "../../assets/istockphoto-1460007178-1024x1024.jpg"
const Home=()=>{
    return(
        <div className="home">
            <Stories/>
                <Posts/>
        </div>
    )
};

export default Home;