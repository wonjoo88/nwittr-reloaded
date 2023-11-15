import PostTweetForm from '../component/post-tweet-form';
import TimeLine from '../component/timeline';

export default function Home(){

    return(
        <div className='homeWrap'>
            <PostTweetForm/>
            <TimeLine/>
        </div>
    )
}