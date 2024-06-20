import { useLoaderData, json } from 'react-router-dom'; //loader data also works in children components but not upward.

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();
  const { events } = data;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  const res = await fetch('http://localhost:8080/events');

  if (!res.ok) {
    // throw new Response(
    //   JSON.stringify({ message: 'Could not fetch data.' }, { status: 500 })
    // );
    throw json({ message: 'Could not fetch data.' }, { status: 500 });
  } else {
    return res; // return res immediately. .. where does res.json() go??
    // const data = await res.json();
    // return data.events;
  }
}
