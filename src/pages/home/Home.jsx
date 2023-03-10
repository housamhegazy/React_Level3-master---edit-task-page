import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import Erroe404 from '../erroe404';
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
// Level 3
import './Home.css';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
    });
  };


  if (error) {
    return <Erroe404 />;
  }




  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}
          </style>

        </Helmet>

        <Header />

        <main>
          <h1 style={{ fontSize: "28px" }}>
            {" "}
            <span>Welcome to React Level 2 🔥🔥🔥</span>{" "}
          </h1>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue...{" "}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
  

    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }


    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home">
            {/* options(filtered data) */}
            <section className="parent-of-btns flex mt">
              <button>newest first</button>
              <button>oldest first</button>
                <select id="lang">
                  <option value="alltasks">alltasks</option>
                  <option value="completed">completed</option>
                  <option value="notcomleted">notcomleted</option>
                </select>
            </section>

            {/* show all tasks  */}
            <section className="all-tasks flex mt">
              <article dir="auto" className="one-task">
                <Link to="/edit-task">
                  <h2>new task</h2>
                  <ul>
                    <li>sub task</li>
                    <li>sub task</li>
                  </ul>
                  <p className="time">one day ago</p>
                </Link>
              </article>
            </section>


            {/* add new task  Btn */}
            <section className="mt">
              <button className="add-task-btn">
                Add new task {" "}
                <i className="fa-solid fa-plus"></i>
              </button>
            </section>
          </main>

          <Footer />
        </>
      );
    }

  }
};

export default Home;
