import React from 'react';
import {useState} from 'react';
import Month from './Month';
import './App.css';

function App() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    // The month value is zero-indexed; January is 0, December is 11.
    const [monthZeroIdx, setMonthZeroIdx] = useState(today.getMonth());
    return (<div className={"App"}>
        {Array.from(Array(12).keys()).map((monthIdx) => (
            <Month key={monthIdx} year={year} monthZeroIdx={monthIdx} />
        ))}
    </div>);
    //         <Month year={year} monthZeroIdx={monthZeroIdx} />
}


export default App;
