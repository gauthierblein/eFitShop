import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectPreviousURL } from '../../redux/slice/cartSlice';
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
  } from "firebase/auth";
  import { auth } from "../../firebase/config";
//STYLE
import styles from './auth.module.scss'
//COMPONENTS
import Card from '../../components/card/Card'
import Loader from "../../components/loader/Loader";

// ASSETS
import loginImg from "../../assets/login.png";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    // Check URL from redux and redirect
    const previousURL = useSelector(selectPreviousURL)
    const redirectUser = () => {
      if (previousURL.includes("cart")) {
        return navigate("/cart")
      } else {
        navigate("/")
      }
    }
  

    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // const user = userCredential.user;
            setIsLoading(false);
            toast.success("Login Successful...");
            redirectUser()
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error(error.message);
          });
      };
    // LogIn with Google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          //const user = result.user;
          toast.success("Login Successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
        redirectUser()
    };

    return (
        <>
        {isLoading && <Loader />}
        <ToastContainer />
        
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImg} alt="Login" width="400" />
            </div>
            <Card >
                <div className={styles.form}>
                <h2>Login</h2>
                <form onSubmit={loginUser}>
                <input
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="--btn --btn-primary --btn-block">
                    Login
                </button>
                <div className={styles.links}>
                    <Link to="/reset">Reset Password</Link>
                </div>
                <p>-- or --</p>
                </form>
                <button 
                  className="--btn --btn-danger --btn-block"
                  onClick={signInWithGoogle}
                >
                    <FaGoogle color="#fff" style={{marginRight:10}}/>Login With Google
                </button>
                <span className={styles.register}>
                <p>Don't have an account?</p>
                <Link to="/register">Register</Link>
                </span>
            </div>
          </Card>
        </section>
        </>
    )
}

export default Login;