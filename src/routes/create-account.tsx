import { useState } from 'react'

export default function CreateAccount(){
    const [isLoading, setLoading] = useState(false); // 계정생성을 시작할 때 true
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {target:{name, value}} = e;
        if(name === "name"){
            setName(value)
        }else if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value)
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try{
            // 계정생성
            // 사용자 프로필 이름 지정
            // 홈페이지로 리디렉션
        }catch(e){

        }finally{
            setLoading(false)
        }                

        console.log(name, email, password);        
    }

    return(
        <div className='accountWrap'>
            <p className='title'>Login</p>
            <form className='accountForm' onSubmit={onSubmit} >
                <input onChange={onChange} name="name" value={name} type='text' placeholder='name' required/>
                <input onChange={onChange} name="email" value={email}  type='email' placeholder='email' required/>
                <input onChange={onChange} name="password" value={password} type='password' placeholder='password' required/>
                <input type='submit' value={isLoading? "Loding...":"Create Account"}/>
            </form>
            {error !== "" ? <span className='err'>{error}</span> : null}
        </div>
    )
}