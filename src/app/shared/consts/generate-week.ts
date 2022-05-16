export function generateDaysArr(monday: Date): Date[] {
  const days = []
  //first is pushing current monday, then push through cycle next 6 days
  days.push(monday);
  for (let i = 1; i < 7; i++) {
    const nextDay = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+i);
    days.push(nextDay)
  }

  return days;
}

export function decrease(monday: Date): Date[]{
  const param = new Date(monday.setDate(monday.getDate() - monday.getDay()-6));
  console.log('decrease param', param);
  return generateDaysArr(param);
}

export function increase(monday: Date): Date[]{
  const param = new Date(monday.setDate(monday.getDate() - monday.getDay()+8));
  console.log('increase param', param);
  return generateDaysArr(param);
}