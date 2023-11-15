import { GithubAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function GithubButton(){
    
    const navigate = useNavigate()
    const onClick = async () => {
     try{
        const provider = new GithubAuthProvider();
        await signInWithPopup(auth, provider) 
        // 팝업으로 로그인
        // await signInWithRedirect(auth, provider)
        // 리다이렉트 로그인
        navigate('/')
     }catch(error){
        console.error(error);        
     } 
    }
    return(
        <span className='gitButton' onClick={onClick}>
            <img src="public/github-logo.png"/>
            Continue with Github
        </span>
    )
}