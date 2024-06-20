import { useLoaderData } from 'react-router-dom'; //loader data also works in children components but not upward.

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
    //..
  } else {
    return res; // return res immediately. .. where does res.json() go??
    // const data = await res.json();
    // return data.events;
  }
}
