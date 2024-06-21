import { redirect, json } from 'react-router-dom';
import EventForm from '../components/EventForm';

function NewEventPage() {
  return <EventForm />;
}
export default NewEventPage;

export async function action({ request, params }) {
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  const res = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (res.status === 422) {
    return res;
  }

  if (!res.ok) {
    throw json({ message: 'error' }, { status: 500 });
  }

  return redirect('/events');
}
