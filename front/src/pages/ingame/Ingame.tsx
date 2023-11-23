import React from 'react';
import {useParams} from 'react-router-dom';

const Ingame = () => {
    const {roomId} = useParams();
    return (
        <div>
            {roomId}
        </div>
    );
};

export default Ingame;