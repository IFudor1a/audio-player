import React from 'react';
import {Data} from "../Data";
import {PlayCircle} from 'react-bootstrap-icons'

const List = ({setCurrent}) => {

    return (
        <div className="list">
            {Data && Data.map((album, idx) => (
                <div className="album">
                    <img src={album.image} alt={album.title}/>
                    <div className="description">
                        <div className="title">{album.title}</div>
                        <div className="author">{album.author}</div>
                    </div>
                    <div className='PlyBtn' onClick={() => setCurrent(album)} >
                    <PlayCircle  size={40} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default List;