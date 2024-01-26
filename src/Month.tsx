import React from "react";
import {useCalendarState} from "./CalendarEvents";

function Month() {
    return (<table>
        <MonthHeader />
        <MonthBody />
    </table>);
}

function MonthHeader() {
    const {firstOfMonth} = useCalendarState();
    return (
        <thead>
        <tr>
            <th colSpan={7}>{firstOfMonth.getFullYear()} {getMonthName(firstOfMonth.getMonth())}</th>
        </tr>
        <tr>{['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((e, i) => (
            <th key={i}>{e}</th>
        ))}</tr>
        </thead>
    );
}

function MonthBody() {
    const {firstOfMonth} = useCalendarState();
    return (
        <tbody>
        {getMonthDayIndices(firstOfMonth).map(
            (week, idx) =>
                (<Week key={idx} days={week}/>))
        }
        </tbody>
    );
}

interface WeekProps {
    days: Date[],
}
const Week = ({days}: WeekProps) => {
    return (
        <tr>
            {days.map((day, idx) => (
                <Day key={idx} day={day}/>))}
        </tr>
    );
}

interface DayProps {
    day: Date,
}
function Day({day}: DayProps) {
    const {firstOfMonth} = useCalendarState();
    const inMonth = isSameMonth(day, firstOfMonth);
    const classes = `Day ${inMonth ? '' : 'notInMonth'}`;
   return <td className={classes}>
       <p>{day.getDate()}</p>
   </td>
}

function isSameMonth(d: Date, other: Date): boolean {
    return (
        d.getFullYear() === other.getFullYear()
        && d.getMonth() === other.getMonth()
    );
}

function getMonthName(monthZeroIdx: number) {
    const tmpDate = new Date(`2020-${monthZeroIdx + 1}-1`);
    return new Intl.DateTimeFormat("en-US",
        { month: "long" }).format(tmpDate);
}

function getMonthDayIndices(firstOfMonth: Date) : Date[][] {
    // First, get the list of Sundays for each month
    //      1. Get the first date of the month,
    //      2. Subtract the weekday from it to get to the Sunday of that week, that's
    //          the initial value for the list.
    //      3. Add 7 to that date to generate the next Sunday.
    //      4. Add that Sunday to the list of Sundays as long as it is not in the next month.
    const timedelta = (d: Date, daysDelta: number) => {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + daysDelta)
    }
    let sunday = timedelta(firstOfMonth, -firstOfMonth.getDay());
    let sundays : Date[] = []
    const nextMonth = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth() + 1);
    while (sunday < nextMonth) {
        sundays.push(sunday);
    }
    // Now that I have all the Sundays for each week, generate the rest of the week.
    const getWeek = (d: Date) => {
        return Array.from(Array(7)).map(
            (_, idx) => timedelta(d, idx)
        )
    }
    return sundays.map(getWeek)
}

export default Month;

