import { loadEvents } from '../helper/loadEvents';
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

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
