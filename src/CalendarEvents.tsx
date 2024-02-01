
import {createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState} from 'react';

// Roughly followed this tutorial in how I used these react features:
//  https://www.youtube.com/watch?v=-bEzt5ISACA
//

// What actually needs to be passed through context.
interface CalendarState {
    firstOfMonth: Date;
    events: CalendarEvent[];
}

export interface CalendarEvent {
    // In reality, `oid` would be assigned by the database using a `sequence` type
    oid: number,
    date: Date,
    details: string
}

export function useCalendarState(): ReturnType<typeof useCalendarStateSource> {
    return useContext(CalendarContext);
}

function useCalendarStateSource() : {
    firstOfMonth: Date,
    events: CalendarEvent[],
    updateMonth: (delta: number) => void,
    updateEvent: (orig: CalendarEvent, modified: CalendarEvent) => void
} {
    type CalendarAction =
        | {type: 'setFirstOfMonth', payload: Date}
        | {type: 'setEvents', payload: CalendarEvent[]}
    ;
    const today = new Date();
    const [maxOid, setMaxOid] = useState(1000);

    const [{firstOfMonth, events}, dispatch] = useReducer(
        (state: CalendarState, action: CalendarAction) => {
            switch (action.type) {
                case 'setFirstOfMonth':
                    return {...state, firstOfMonth: action.payload};
                case 'setEvents':
                    console.log('the new events struct is:')
                    console.log(action.payload);
                    return {...state, events: action.payload};
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
        [firstOfMonth]
    );
    const updateEvent = useCallback(
        (orig: CalendarEvent | null, modified: CalendarEvent | null) => {
            // if both are null, or if their props match, no op
            if (orig?.date === modified?.date
                && orig?.details === modified?.details) {
                    return;
            }
            let nxtEvents = events;
            if (orig !== null) {
                nxtEvents = nxtEvents.filter((e) => e.oid !== orig.oid);
            }
            if (modified !== null) {
                nxtEvents.push({...modified, oid: maxOid});
                setMaxOid((cur) => cur + 1);
                dispatch({
                    type: 'setEvents',
                    payload: nxtEvents
                });
            }
        }, [events, maxOid]
    );

    useEffect(() => {
        fetch('./events.json')
            .then((response) => response.json())
            .then((data) => dispatch({type: 'setEvents', payload: data.toSorted()}))
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
    return {events: filteredEvents, firstOfMonth, updateMonth, updateEvent};
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
