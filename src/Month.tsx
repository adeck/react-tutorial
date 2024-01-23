import React from "react";


interface MonthId {
    year: number,
    // NOTE: Javascript Date() APIs use a zero-indexed int for months,
    //          such that 0 -> january and 11 -> december. That seemed to me
    //          like a perfect recipe for off-by-one errors since there's already
    //          a standard mapping integers to month numbers (1 -> jan, 12 -> dec).
    //          So I decided that everywhere I'm using a [0, 11] month, I'd name it
    //          `monthZeroIdx` to eliminate the risk of misinterpretation.
    monthZeroIdx: number,
}
function Month({year, monthZeroIdx}: MonthId) {
    return (<table>
        <MonthHeader year={year} monthZeroIdx={monthZeroIdx} />
        <MonthBody year={year} monthZeroIdx={monthZeroIdx}/>
    </table>);
}
function MonthHeader({year, monthZeroIdx}: MonthId) {
    return (
        <thead>
        <tr>
            <th colSpan={7}>{year} {getMonthName(monthZeroIdx)}</th>
        </tr>
        <tr>{['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((e, i) => (
            <th key={i}>{e}</th>
        ))}</tr>
        </thead>
    );
}

const daysInMonth = ({year, monthZeroIdx} : MonthId) => new Date(year, monthZeroIdx + 1, 0).getDate();

function MonthBody({year, monthZeroIdx} : MonthId) {
    return (
        <tbody>
        {getMonthDayIndices({year, monthZeroIdx}).map(
            (dayIdxArr, idx) =>
                (<Week key={idx} year={year} monthZeroIdx={monthZeroIdx} days={dayIdxArr}/>))
        }
        </tbody>
    );
}

interface WeekProps {
    year: number,
    monthZeroIdx: number,
    days: number[],
}
const Week = ({year, monthZeroIdx, days}: WeekProps) => {
    return (
        <tr>
            {days.map((day, idx) => (<Day key={idx} year={year} monthZeroIdx={monthZeroIdx} day={day}/>))}
        </tr>
    );
}

interface DayProps {
    year: number,
    monthZeroIdx: number,
    day: number,
}
const Day = ({year, monthZeroIdx, day}: DayProps) => (<td>{day}</td>);

function getMonthName(monthZeroIdx: number) {
    const tmpDate = new Date(`2020-${monthZeroIdx + 1}-1`);
    return new Intl.DateTimeFormat("en-US",
        { month: "long" }).format(tmpDate);
}

function getMonthDayIndices({year, monthZeroIdx} : MonthId) : number[][] {
    const numDaysInMonth = daysInMonth({year, monthZeroIdx});
    const firstWeekPaddingLength = new Date(year, monthZeroIdx, 1).getDay();
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
