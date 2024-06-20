import { useRouteLoaderData, json, redirect } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');

  return <EventItem event={data.event} />;
}
export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;

  const res = await fetch('http://localhost:8080/events/' + id);

  if (!res.ok) {
    throw json({ message: 'error' }, { status: 500 });
  } else {
    return res;
  }
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
