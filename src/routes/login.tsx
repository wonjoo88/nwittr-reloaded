import { useState } from 'react'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import GithubButton from '../component/github-btn';

export default function Login(){

    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { name, value },
        } = e;
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
    };

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("")
        if(isLoading ||email === "" || password === "") return 
        // 로딩중이거나 메일과 비밀번호가 비어있는경우 함수 종료

        try{
            setLoading(true)   
            await signInWithEmailAndPassword(auth, email, password);       
            navigate("/")
        }catch(e){
            if(e instanceof FirebaseError){
                setError(e.message)   
            }
        }finally{
            setLoading(false)
        }                      
    }

    return(
        <div className='accountWrap'>
            <p className='title'>Login</p>
            <form className='accountForm' onSubmit={onSubmit} >
                <input onChange={onChange} name="email" value={email}  type='email' placeholder='email' required/>
                <input onChange={onChange} name="password" value={password} type='password' placeholder='password' required/>
                <input type='submit' value={isLoading? "Loding...":"Log in"}/>
            </form>
            {error !== "" ? <span className='err'>{error}</span> : null}

            {/* join 페이지로 이동 */}
            <span className='switcher'>
                Don't have an account? <Link to='/create-account'>Join &rarr;</Link>
            </span>

            <GithubButton/>
        </div>
    )
}