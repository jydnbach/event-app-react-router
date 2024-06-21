import { loadEvents } from '../helper/loadEvents';
import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}
export default EventDetailPage;

async function loadEvent(id) {
  const res = await fetch('http://localhost:8080/events/' + id);

  if (!res.ok) {
    throw json({ message: 'error' }, { status: 500 });
  } else {
    const data = await res.json();
    return data.event;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const id = params.eventId;

  const res = await fetch('http://localhost:8080/events/' + id, {
    method: request.method,
  });
  if (!res.ok) {
    throw json({ message: 'Could not delete data.' }, { status: 500 });
  }

  return redirect('/events');
}
