import "./Home.scss";
import Posts from "../../components/posts/Posts.jsx";
import Share from "../../components/share/Share.jsx";
const Home=()=>{
    return(
        <div className="home">
                <Share/>
                <Posts/>

        </div>
    )
};

export default Home;