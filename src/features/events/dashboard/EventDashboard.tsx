import { useEffect, useState } from 'react';
import { events } from '../../../lib/data/sampleData';
import EventForm from '../form/EventForm';
import EventCard from './EventCard';
import { AppEvent } from '../../../lib/types';
import { AnimatePresence, motion } from 'motion/react';

type Props = {
  formOpen: boolean;
  setFormOpen: (isOpen: boolean) => void;
  formToggle: (event: AppEvent | null) => void;
  selectedEvent: AppEvent | null;
};

export default function EventDashboard({
  formOpen,
  setFormOpen,
  formToggle,
  selectedEvent,
}: Props) {
  const [appEvent, setAppEvents] = useState<AppEvent[]>([]);

  const handleCreateEvent = (event: AppEvent) => {
    setAppEvents((prevState) => [...prevState, event]);
  };

  const handleDeleteEvent = (eventId: string) => {
    setAppEvents((prevstate) => prevstate.filter((e) => e.id !== eventId));
  };
  const handleUpdateEvent = (updatedEvent: AppEvent) => {
    setAppEvents((prevstate) => {
      return prevstate.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e,
      );
    });
  };
  useEffect(() => {
    setAppEvents(events);

    return () => {
      setAppEvents([]);
    };
  }, []);

  return (
    <div className="flex flex-row w-full gap-6 overflow-hidden">
      <div className="w-3/5">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.3, type: 'easeInout' }}
          >
            <div className=" flex flex-col gap-4 ">
              {appEvent.map((event) => (
                <EventCard
                  deleteEvent={handleDeleteEvent}
                  formToggle={formToggle}
                  key={event.id}
                  event={event}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-2/5">
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.3, type: 'easeInout' }}
            >
              <EventForm
                updateEvent={handleUpdateEvent}
                key={selectedEvent?.id || 'new'}
                selectedEvent={selectedEvent}
                setFormOpen={setFormOpen}
                createEvent={handleCreateEvent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
