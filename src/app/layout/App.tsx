import { useState } from 'react';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import Navbar from './nav/Navbar';
import { AppEvent } from '../../lib/types';

function App() {
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleFormToggle = (event: AppEvent | null) => {
    if (formOpen) {
      setFormOpen(false);
      setTimeout(() => {
        setSelectedEvent(event);
        setFormOpen(true);
      }, 300);
    } else {
      setSelectedEvent(event);
      setFormOpen(true);
    }
  };

  return (
    <div>
      <Navbar formToggle={handleFormToggle} />
      <div className="container mx-auto px-10 mt-24">
        <EventDashboard
          formToggle={handleFormToggle}
          selectedEvent={selectedEvent}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
        />
      </div>
    </div>
  );
}

export default App;
