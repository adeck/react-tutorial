import React from 'react';
import {useState} from 'react';
import Month from './Month';
import {CalendarEventsProvider} from './CalendarEvents';
import './App.css';

/*
 * This App renders the current month's calendar + two navigation arrows.
 *  The arrows allow you to navigate forward and backward in time, to see
 *  any month from any year you'd care to visit.
 */
function App() {
    const today = new Date();
    const firstOfTodaysMonth = new Date(today.getFullYear(), today.getMonth());
    const [firstOfMonth, setFirstOfMonth] = useState(firstOfTodaysMonth);
    const updateMonth = (delta: number) => () => {
        setFirstOfMonth((cur) => new Date(cur.getFullYear(), cur.getMonth() + delta));
    };
    return (<div className={"App"}>
        <div className={'Container'}>
            <NavArrow content={'<'} onClick={updateMonth(-1)} />
            <CalendarEventsProvider>
                <Month firstOfMonth={firstOfMonth} />
            </CalendarEventsProvider>
            <NavArrow content={'>'} onClick={updateMonth(+1)} />
        </div>
    </div>);
}

/*
 * These are the clickable navigation arrows, for going forward and backward in time.
 */
function NavArrow(props: {content: string, onClick: React.MouseEventHandler<HTMLDivElement>}) {
    return (<div className={'NavArrow'} onClick={props.onClick}>{props.content}</div>);
}

export default App;
