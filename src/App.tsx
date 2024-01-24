import React from 'react';
import {useState} from 'react';
import Month from './Month';
import './App.css';

function App() {
    const today = new Date();
    const firstOfTodaysMonth = new Date(today.getFullYear(), today.getMonth());
    const [firstOfMonth, setFirstOfMonth] = useState(firstOfTodaysMonth);
    const updateMonth = (delta: number) => () => {
        setFirstOfMonth((cur) => new Date(cur.getFullYear(), cur.getMonth() + delta));
    };
    return (<div className={"App"}>
        <div>
            <div onClick={updateMonth(-1)}>&lt;</div>
            <Month firstOfMonth={firstOfMonth} />
            <div onClick={updateMonth(+1)}>&gt;</div>
        </div>
    </div>);
    //         <Month year={year} monthZeroIdx={monthZeroIdx} />
}


export default App;
