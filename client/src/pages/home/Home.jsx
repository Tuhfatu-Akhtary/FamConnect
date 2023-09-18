import "./Home.scss";
import Stories from "../../components/stories/stories.jsx";
import Posts from "../../components/posts/Posts.jsx";
const Home=()=>{
    return(
        <div className="home">
            <Stories/>
                <Posts/>

        </div>
    )
};

export default Home;