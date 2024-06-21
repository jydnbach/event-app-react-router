import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom'; //loader data also works in children components but not upward.

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

export async function loadEvents() {
  const res = await fetch('http://localhost:8080/events');

  if (!res.ok) {
    // throw new Response(
    //   JSON.stringify({ message: 'Could not fetch data.' }, { status: 500 })
    // );
    throw json({ message: 'Could not fetch data.' }, { status: 500 });
  } else {
    // return res; // return res immediately. .. where does res.json() go??
    // const data = await res.json();
    // return data.events;
    const data = await res.json();
    return data.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
