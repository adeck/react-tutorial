
import {createContext, useContext, useEffect, useState} from 'react';

// Roughly followed this tutorial in how I used these react features:
//  https://www.youtube.com/watch?v=-bEzt5ISACA

/*
// What actually needs to be passed through context.
interface CalendarState {
    firstOfMonth: Date;
    events: {[day: number]: string}
}
 */

interface CalendarEvents {
    [year: number]: {
        [month: number]: {
            [day: number]: string
        }
    }
}

export function useEvents(): CalendarEvents {
    return useContext(CalendarContext);
}

function useEventsSource() : CalendarEvents {
    const [events, setEvents] = useState<CalendarEvents>({});
    useEffect(() => {
        fetch('/events.json')
            .then((response) => response.json())
            .then((data) => setEvents(data))
    }, [])
    return events;
}


type ContextValueType = ReturnType<typeof useEvents>;
const CalendarContext = createContext<
    ContextValueType>(
        {} as unknown as ContextValueType
);

export function CalendarEventsProvider({
   children
}: {
    children: React.ReactNode;
}) {
    return <CalendarContext.Provider value={useEventsSource()}>
        {children}
    </CalendarContext.Provider>
}
