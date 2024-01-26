import React from "react";

interface MonthProps {
    firstOfMonth: Date,
}
function Month({firstOfMonth} : MonthProps) {
    return (<table>
        <MonthHeader firstOfMonth={firstOfMonth} />
        <MonthBody firstOfMonth={firstOfMonth} />
    </table>);
}

function MonthHeader({firstOfMonth} : MonthProps) {
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

const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

function MonthBody({firstOfMonth} : MonthProps) {
    return (
        <tbody>
        {getMonthDayIndices(firstOfMonth).map(
            (dayIdxArr, idx) =>
                (<Week key={idx} firstOfMonth={firstOfMonth} days={dayIdxArr}/>))
        }
        </tbody>
    );
}

interface WeekProps {
    firstOfMonth: Date,
    days: number[],
}
const Week = ({firstOfMonth, days}: WeekProps) => {
    return (
        <tr>
            {days.map((day, idx) => (
                <Day key={idx} firstOfMonth={firstOfMonth} day={day}/>))}
        </tr>
    );
}

interface DayProps {
    firstOfMonth: Date,
    day: number,
}
const Day = ({firstOfMonth, day}: DayProps) => (<td>{day === -1 ? '' : day}</td>);

function getMonthName(monthZeroIdx: number) {
    const tmpDate = new Date(`2020-${monthZeroIdx + 1}-1`);
    return new Intl.DateTimeFormat("en-US",
        { month: "long" }).format(tmpDate);
}

function getMonthDayIndices(firstOfMonth: Date) : number[][] {
    const numDaysInMonth = daysInMonth(firstOfMonth);
    const firstWeekPaddingLength = firstOfMonth.getDay();
    const lastWeekPaddingLength = (7 - (firstWeekPaddingLength + numDaysInMonth) % 7) % 7;
    console.log(`${firstWeekPaddingLength} ${numDaysInMonth} ${lastWeekPaddingLength}`);
    const padding = (length: number) => Array(length).fill(-1);
    const dayIdxArray = [
        ...padding(firstWeekPaddingLength),
        ...Array.from(Array(numDaysInMonth).keys()).map((n) => n + 1),
        ...padding(lastWeekPaddingLength),
    ];
    const weeks : number[][] = [];
    for (let i = 0; i < dayIdxArray.length / 7; i++) {
        weeks.push(dayIdxArray.slice(i * 7, i * 7 + 7));
    }
    return weeks;
}

export default Month;

