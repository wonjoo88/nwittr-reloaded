import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { ITweet } from './timeline';
import { deleteObject, ref } from 'firebase/storage';

export default function Tweet({username, photo, tweet, userId, id}:ITweet){

    
    const user = auth.currentUser;
    const onDelete = async () => {
        const ok = confirm("Are you sure you want to delete this tweet?");
        if (!ok || user?.uid !== userId) return;
        try {
        await deleteDoc(doc(db, "tweets", id));
        if (photo) {
            const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
            await deleteObject(photoRef);
        }
        } catch (e) {
        console.log(e);
        } finally {
        //
        }
    };


    return(
        <div className='tweetWrap'>
           <div className='column'>
                <span className='username'>{username}</span>
                <p className='payload'>{tweet}</p>
                {/* 로그인한 userId와 트윗 userId 가 일치하는 경우 삭제버튼 보임 */}
                {user?.uid === userId ? 
                    <button onClick={onDelete} className='deleteBtn'>Delete</button> 
                    : null
                }
           </div>

           {photo?(
                <div className='column'>
                    <img className='photo' src={photo}/>
                </div>
           ) : null}
        </div>
    )

}