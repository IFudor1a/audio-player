import React, {useEffect, useState} from 'react';
import {Data} from "../Data";
import {PlayFill, SkipBackwardFill,SkipForwardFill, Pause } from "react-bootstrap-icons";

const Player = ({current, setCurrent}) => {
    const [isPlaying, setPlaying] = useState(true)
    const [previous, setPrevious] = useState()
    const [ct, setCT] = useState();
    const [duration, setDuration] = useState()

    const AppropriateTime = (time, cb) => {
        const minutes = time / 60 < 10 ? '0' + parseInt(time / 60, 10) : parseInt(time / 60, 10)
        const seconds = time % 60 < 10 ? '0' + parseInt(time % 60, 10) : parseInt(time % 60, 10)
        cb(`${minutes} : ${seconds}`)
    }

    const nextAlbum = () => {
       const index = Data.findIndex(album => album.title === current.title)
        current.music.pause()
        if (index === Data.length-1)
        {
            setCurrent(Data[0])
        }
        else
        {
            setCurrent(Data[index + 1])
        }
        setCT(`00:00`)
    }

    const prevAlbum = () => {
        const index = Data.findIndex(album => album.title === current.title)
        current.music.pause()
        if (index === 0)
        {
            setCurrent(Data[Data.length - 1])
        }
        else
        {
            setCurrent(Data[index - 1])
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
           AppropriateTime(current.music.currentTime, setCT)
        }, 1000)

        return () => clearInterval(interval)
    }, [current.music.currentTime])

    useEffect(() => {
        setPrevious(current)
        AppropriateTime(current.music.duration, setDuration)
        isPlaying ? current.music.play() : current.music.pause()
    }, [isPlaying])

    useEffect(() => {
        if(previous) {
            previous.music.pause()
            setPlaying(false)
            setPrevious(current)
            current.music.currentTime = 0
        }
    }, [current])
    return (
        <div className='Player'>
            <img src={current.image}/>
            <div className='border'>
                <div className='title'>{current.title}</div>
                <div className='author'>{current.author}</div>
                <input type='range' min={0} max={current.music.duration} step='any' value={current.music.currentTime} onChange={(e) => current.music.currentTime = e.target.value} />
                <div>{ct} / {duration}</div>
                <div className='controllers'>
                 <SkipBackwardFill size={40} onClick={() => prevAlbum()}/>
                    { isPlaying ?
                        <Pause size={40} onClick={() => setPlaying(!isPlaying)}/>
                     :
                        <PlayFill size={40} onClick={() => setPlaying(!isPlaying)}/>
                    }
                    <SkipForwardFill size={40} onClick={() => nextAlbum()}/>
                </div>
            </div>
        </div>
    );
};

export default Player;