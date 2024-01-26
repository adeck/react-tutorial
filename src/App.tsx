import React from 'react';
import Month from './Month';
import {CalendarEventsProvider, useCalendarState} from './CalendarEvents';
import './App.css';

/*
 * This App renders the current month's calendar + two navigation arrows.
 *  The arrows allow you to navigate forward and backward in time, to see
 *  any month from any year you'd care to visit.
 */
function App() {
    return (<div className={"App"}>
        <div className={'Container'}>
            <CalendarEventsProvider>
                <NavArrow forward={false} />
                <Month />
                <NavArrow forward={true} />
            </CalendarEventsProvider>
        </div>
    </div>);
}

/*
 * These are the clickable navigation arrows, for going forward and backward in time.
 */
function NavArrow(props: {forward: boolean}) {
    const {updateMonth} = useCalendarState();
    const content = props.forward ? '>' : '<';
    const delta = props.forward ? 1 : -1;
    return (<div className={'NavArrow'} onClick={() => updateMonth(delta)}>{content}</div>);
}

export default App;
