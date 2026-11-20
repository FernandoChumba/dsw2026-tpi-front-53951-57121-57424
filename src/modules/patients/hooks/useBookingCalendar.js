import { useState } from 'react';
import useAuth from '../../auth/hook/useAuth';
import useCreateAppointment from './useCreateAppointment';
import {
  addDays,
  getMonday,
  getToday,
  getWeekDays,
  isWeekend,
} from '../components/booking/dates';

function groupByDate(slots) {
  const groups = {};

  for (const slot of slots) {
    if (!groups[slot.date]) {
      groups[slot.date] = [];
    }

    groups[slot.date].push(slot);
  }

  return groups;
}

function sortSlots(slots) {
  return [...slots].sort((left, right) =>
    (left.date + left.startTime).localeCompare(right.date + right.startTime)
  );
}

export default function useBookingCalendar({ slots, onReload, isLoading }) {
  const { dni } = useAuth();
  const { create, isSubmitting, success, error, conflict, clearConflict } =
    useCreateAppointment();
  const sortedSlots = sortSlots(slots);
  const slotsByDate = groupByDate(sortedSlots);
  const showWeekend = sortedSlots.some((slot) => isWeekend(slot.date));
  const daysPerWeek = showWeekend ? 7 : 5;
  const currentMonday = getMonday(getToday());
  const lastMonday =
    sortedSlots.length > 0
      ? getMonday(sortedSlots[sortedSlots.length - 1].date)
      : currentMonday;
  const firstMonday =
    sortedSlots.length > 0 ? getMonday(sortedSlots[0].date) : currentMonday;
  const [monday, setMonday] = useState(firstMonday);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [mobileDate, setMobileDate] = useState(
    sortedSlots.length > 0 ? sortedSlots[0].date : firstMonday
  );
  const weekDays = getWeekDays(monday, daysPerWeek);

  function goToWeek(newMonday) {
    setMonday(newMonday);

    const firstDayWithSlots = getWeekDays(newMonday, daysPerWeek).find(
      (day) => slotsByDate[day]
    );

    setMobileDate(firstDayWithSlots ?? newMonday);
  }

  async function confirmBooking({ slot, reason }) {
    const result = await create({
      doctorId: slot?.doctor?.doctorId,
      availabilitySlotId: slot?.availabilitySlotId,
      dni,
      reason,
    });

    if (result === 'conflict') setSelectedSlot(null);
  }

  function closeConflict() {
    clearConflict();
    onReload();
  }

  return {
    weekDays,
    slotsByDate,
    showWeekend,
    mobileDate,
    mobileSlots: slotsByDate[mobileDate] ?? [],
    selectedSlot,
    canGoToPreviousWeek: monday > currentMonday,
    canGoToNextWeek: monday < lastMonday,
    goToPreviousWeek: () => goToWeek(addDays(monday, -7)),
    goToNextWeek: () => goToWeek(addDays(monday, 7)),
    selectDate: setMobileDate,
    selectSlot: setSelectedSlot,
    confirmBooking,
    closeConflict,
    isSubmitting,
    success,
    conflict,
    error: dni
      ? error
      : 'No se encontró el DNI de tu sesión. Volvé a iniciar sesión.',
    isSelectionDisabled: isSubmitting || success || conflict || isLoading,
    isBookingDisabled: !dni || success || conflict || isLoading,
  };
}
