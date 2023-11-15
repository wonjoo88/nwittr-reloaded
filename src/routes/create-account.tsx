import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

export default function CreateAccount(){

    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false); // 계정생성을 시작할 때 true
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { name, value },
        } = e;
        if (name === "name") {
          setName(value);
        } else if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
    };

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("")
        if(isLoading || name === "" || email === "" || password === "") return

        try{
            // 계정생성
            setLoading(true)
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            // 사용자 프로필 이름 지정
            await updateProfile(credentials.user, {
                displayName : name
            })
            // 홈페이지로 리디렉션
            navigate("/")

        }catch(e){
            // setError
            console.log(e);
            if(e instanceof FirebaseError){
                setError(e.message)
                // console.log("e.code :", e.code, "|", "e.message :",e.message); 
                // e.code : auth/email-already-in-use | e.message:Firebase: Error (auth/email-already-in-use).
                
            }
        }finally{
            setLoading(false)
        }                
        console.log(name, email, password);        
    }

    return(
        <div className='accountWrap'>
            <p className='title'>Join</p>
            <form className='accountForm' onSubmit={onSubmit} >
                <input onChange={onChange} name="name" value={name} type='text' placeholder='name' required/>
                <input onChange={onChange} name="email" value={email}  type='email' placeholder='email' required/>
                <input onChange={onChange} name="password" value={password} type='password' placeholder='password' required/>
                <input type='submit' value={isLoading? "Loding...":"Create Account"}/>
            </form>
            {error !== "" ? <span className='err'>{error}</span> : null}
            {/* Loin 페이지로 이동 */}
            <span className='switcher'>
                Already have an account? <Link to='/login'>Login &rarr;</Link>
            </span>
        </div>
    )
}