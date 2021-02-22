import axios from 'axios';

const getVideoDetails = async (youtubeId: string) => {   
    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${process.env.REACT_APP_FIREBASE_API_KEY}&part=snippet,contentDetails`)
    const video = response.data.items[0]
    const { title } = video.snippet
    const { duration }  = video.contentDetails
    const videoDetails = {
        title,
        duration,
        youtubeId
    }
    return videoDetails
}

export default getVideoDetails