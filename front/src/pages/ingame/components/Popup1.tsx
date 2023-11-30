import React from 'react';
import style from './Popup.module.css';
const Popup1 = () => {
    return (
        <div className={style.Wrapper}>
            <img width={500} height={375} alt='hof' style={{border:'1px solid'}}/>
            
            <div className={style.navi}>
                <img width={80} height={60} alt='hof' style={{ border: '1px solid' }} />
                <img width={80} height={60} alt='hof' style={{ border: '1px solid' }} />
                <img width={80} height={60} alt='hof' style={{ border: '1px solid' }} />
            </div>
        </div>
    );
};

export default Popup1;