import { collection, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Tweet from './tweet';
import { Unsubscribe } from 'firebase/auth';

export interface ITweet{
    id:string;
    photo?:string;
    tweet:string;
    userId:string;
    username:string;
    createdAt:number;

}

export default function TimeLine(){

    const [tweets, setTweet] = useState<ITweet[]>([]);
    

    useEffect(()=>{
        let unsubcribe : Unsubscribe | null = null;
        const fetchTweets = async () => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createdAt", "desc"),
                limit(25)
            );
            // const snapshot = await getDocs(tweetsQuery);
            // const tweets = snapshot.docs.map((doc) => {
            //     const {photo, tweet, userId, username, createdAt} = doc.data();
            //     return{
            //         photo, tweet, userId, username, createdAt,
            //         id:doc.id
            //     }
            // });
    
            unsubcribe = await onSnapshot(tweetsQuery, (snapshot) => {  // 이벤트 리스너 연결시키는 함수
                const tweets = snapshot.docs.map((doc) => {
                    const { tweet, createdAt, userId, username, photo } = doc.data();
                    return {
                    tweet,
                    createdAt,
                    userId,
                    username,
                    photo,
                    id: doc.id,
                    };
                });
                setTweet(tweets);
            });
        }
        fetchTweets()
        return () => {
            unsubcribe && unsubcribe();
        }
    },[])

    return(
        <div className='timelineWrap'>
            {/* {JSON.stringify(tweets)} */}
            {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}/>)}
        </div>
    )
}