export function generateDaysArr(monday: Date): Date[] {
  const days = []
  //first is pushing current monday, then push through cycle next 6 days
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+i);
    nextDay.setHours(0,0,0,0);
    days.push(nextDay)
  }
  return days;
}

export function decreaseWeek(monday: Date): Date[]{
  const param = new Date(monday.setDate(monday.getDate() - monday.getDay()-6));
  return generateDaysArr(param);
}

export function increaseWeek(monday: Date): Date[]{
  const param = new Date(monday.setDate(monday.getDate() - monday.getDay()+8));
  return generateDaysArr(param);
}
