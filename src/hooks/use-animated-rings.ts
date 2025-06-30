import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import duration from 'dayjs/plugin/duration';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { useState, useRef, useEffect } from 'react';

dayjs.extend(duration);
dayjs.extend(isLeapYear);
dayjs.extend(dayOfYear);

export type Ring = { name: string; value: number; color: string };
export type Elapsed = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateRings = (originDate: dayjs.Dayjs, now: dayjs.Dayjs) => {
  const diffDuration = dayjs.duration(now.diff(originDate));

  const totalSeconds = diffDuration.asSeconds();
  const totalMinutes = diffDuration.asMinutes();
  const totalHours = diffDuration.asHours();
  const totalDays = diffDuration.asDays();
  const totalYears = diffDuration.asYears();

  const years = Math.floor(totalYears);
  const days = Math.floor(totalDays) % 365;
  const hours = Math.floor(totalHours) % 24;
  const minutes = Math.floor(totalMinutes) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  const daysInYear = now.isLeapYear() ? 366 : 365;
  const daysInCurrentMonth = now.daysInMonth();

  const startOfMonth = now.startOf('month');

  const daysElapsedThisMonth = originDate.isBefore(startOfMonth)
    ? now.diff(startOfMonth, 'seconds') / 86400
    : now.diff(originDate, 'seconds') / 86400;

  const minute = ((totalSeconds % 60) / 60) * 100;
  const hour = ((totalMinutes % 60) / 60) * 100;
  const day = ((totalHours % 24) / 24) * 100;
  const week = ((totalDays % 7) / 7) * 100;
  const month = (daysElapsedThisMonth / daysInCurrentMonth) * 100;
  const year = ((totalDays % daysInYear) / daysInYear) * 100;

  const rings = [
    { name: 'Minute', value: minute, color: 'cyan.5' },
    { name: 'Hour', value: hour, color: 'teal.5' },
    { name: 'Day', value: day, color: 'blue.5' },
    { name: 'Week', value: week, color: 'indigo.5' },
    { name: 'Month', value: month, color: 'violet.5' },
    { name: 'Year', value: year, color: 'grape.5' },
  ];

  return {
    rings,
    elapsed: { years, days, hours, minutes, seconds },
  };
};

const areRingsEqual = (a: Ring[], b: Ring[]) =>
  a.length === b.length &&
  a.every((r, i) => Math.abs(r.value - b[i].value) < 0.01);

const isElapsedEqual = (a: Elapsed, b: Elapsed) =>
  a.years === b.years &&
  a.days === b.days &&
  a.hours === b.hours &&
  a.minutes === b.minutes &&
  a.seconds === b.seconds;

export const useAnimatedRings = (originDate: dayjs.Dayjs | null) => {
  const [animatedRings, setAnimatedRings] = useState<Ring[]>([]);
  const [elapsed, setElapsed] = useState<Elapsed>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const prevRingsRef = useRef<Ring[]>([]);
  const prevElapsedRef = useRef<Elapsed>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!originDate) return;

    const update = () => {
      const now = dayjs();
      const { rings, elapsed } = calculateRings(originDate, now);

      if (!areRingsEqual(rings, prevRingsRef.current)) {
        setAnimatedRings(rings);
        prevRingsRef.current = rings;
      }

      if (!isElapsedEqual(elapsed, prevElapsedRef.current)) {
        setElapsed(elapsed);
        prevElapsedRef.current = elapsed;
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [originDate]);

  return { animatedRings, elapsed };
};
