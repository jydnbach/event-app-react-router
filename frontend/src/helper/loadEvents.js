import { json } from 'react-router-dom';

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
