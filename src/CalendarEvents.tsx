
import {createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState} from 'react';

// Roughly followed this tutorial in how I used these react features:
//  https://www.youtube.com/watch?v=-bEzt5ISACA

// What actually needs to be passed through context.
interface CalendarState {
    firstOfMonth: Date;
    events: CalendarEvent[];
}

interface CalendarEvent {
    date: string,
    details: string
}

export function useCalendarState(): ReturnType<typeof useCalendarStateSource> {
    return useContext(CalendarContext);
}

function useCalendarStateSource() : {
    firstOfMonth: Date,
    events: CalendarEvent[],
    updateMonth: (delta: number) => void
} {
    type CalendarAction =
        | {type: 'setFirstOfMonth', payload: Date}
        | {type: 'setEvents', payload: CalendarEvent[]}
    ;
    const today = new Date();
    const [{firstOfMonth, events}, dispatch] = useReducer(
        (state: CalendarState, action: CalendarAction) => {
            switch (action.type) {
                case 'setEvents':
                    return {...state, events: action.payload};
                case 'setFirstOfMonth':
                    return {...state, firstOfMonth: action.payload};
            }
        }, {
            firstOfMonth: new Date(today.getFullYear(), today.getMonth()),
            events: [] as CalendarEvent[]
        }
    );
    const updateMonth = useCallback(
        (delta: number) => {
            const cur = firstOfMonth;
            const nxt = new Date(cur.getFullYear(), cur.getMonth() + delta);
            dispatch({
                type: 'setFirstOfMonth',
                payload: nxt
            })
        },
        []
    );
    useEffect(() => {
        fetch('/events.json')
            .then((response) => response.json())
            .then((data) => dispatch({type: 'setEvents', payload: data}))
    }, [])

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const eventDate = new Date(event.date);
            const year = (d: Date) => d.getFullYear();
            const month = (d: Date) => d.getMonth();
            return (year(eventDate) === year(firstOfMonth)
                && month(eventDate) === month(firstOfMonth));
        })
    }, [events, firstOfMonth]);
    return {events: filteredEvents, firstOfMonth, updateMonth};
}


type ContextValueType = ReturnType<typeof useCalendarState>;
const CalendarContext = createContext<
    ContextValueType>(
        {} as unknown as ContextValueType
);

export function CalendarEventsProvider({
   children
}: {
    children: React.ReactNode;
}) {
    return <CalendarContext.Provider value={useCalendarStateSource()}>
        {children}
    </CalendarContext.Provider>
}
