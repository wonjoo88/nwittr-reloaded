import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react'
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function PostTweetForm(){

    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTweet(e.target.value);
    };

    // 하나의 파일만 업로드
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (files && files.length === 1) {
        setFile(files[0]);
      }
    };

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = auth.currentUser;

        // 몇가지 조건확인하기
        if(isLoading || tweet === "" || tweet.length > 180) return // 트윗의 길이가 180자 이상인가 

        try{
            setLoading(true)
            // Firebase SDK에 포함된 addDoc 함수 사용
            // await addDoc(collection(db, "tweets"), {
            //     tweet,
            //     createdAt:Date.now(),
            //     username:user?.displayName || "Anonymous",
            //     userId:user?.uid,
            // })

            // 업로드된 파일이 tweets/(유저ID)/(문서ID)로 가도록 설정
            const doc = await addDoc(collection(db, "tweets"), {
                tweet,
                createdAt:Date.now(),
                username:user?.displayName || "Anonymous",
                userId:user?.uid,
            })

            if(file){ 
                // 이미지 첨부파일이 있다면
                // 해당 파일의 위치에 대한 reference 받기
                const locationRef = ref(storage, `tweets/${user?.uid}/${doc.id}`)
                const result = await uploadBytes(locationRef, file)
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo:url,                    
                })
            }
            setTweet('')
            setFile(null)
        }catch(e){
            console.log(e);
            
        }finally{
            setLoading(false)
        }
        
    }

    return(
        <form className='postTweetWrapper' onSubmit={onSubmit}>
            <textarea 
                required
                onChange={onChange} 
                value={tweet} 
                placeholder='what is happening?'
            />
            <label className='inputFileLabel' htmlFor='file'>
                {file ? "Photo added ✅" : "Add photo"}
            </label>
            <input 
                onChange={onFileChange}
                type="file"
                id="file"
                accept="image/*"
            />
            <button type='submit'>
                {isLoading ? "Posting..." : "Post Tweet"}
            </button>
        </form>
    )
}