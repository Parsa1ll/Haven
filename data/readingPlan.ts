export interface ReadingDay {
  day: string;
  label: string;
  completed: boolean;
  isToday: boolean;
}

export interface ReadingPlan {
  name: string;
  daysUntil: number;
  streak: number;
  days: ReadingDay[];
}

export function getReadingPlan(): ReadingPlan {
  const dayOfWeek = new Date().getDay(); // 0=Sun, 1=Mon, ...
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const days: ReadingDay[] = dayLabels.map((label, index) => ({
    day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index],
    label,
    completed: index < dayOfWeek,
    isToday: index === dayOfWeek,
  }));

  return {
    name: 'Garden of Eden',
    daysUntil: 3,
    streak: 5,
    days,
  };
}
