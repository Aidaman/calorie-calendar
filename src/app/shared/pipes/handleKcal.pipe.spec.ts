import {ICalendarCell} from "../interfaces/calendar-cell.interface";
import {HandleKcalPipe} from "./handleKcal.pipe";


describe('HandleTotalKiloCaloriesSummaryPipe', () => {
  const pipe = new HandleKcalPipe();

  let rightDate: any = new Date();
  rightDate.setHours(0,0,0,0);
  let wrongDate: any = new Date(rightDate.getFullYear(), rightDate.getMonth()-4, rightDate.getDate());
  wrongDate.setHours(0,0,0,0);

  rightDate = +rightDate;
  wrongDate = +wrongDate;

  const meals: ICalendarCell[] = [
    {
      id: '1',
      title: 'a',
      time: '11:00',
      kcal: 100,
      carbohydrates: 10,
      fats: 50,
      proteins: 40,
      date: rightDate
    },
    {
      id: '2',
      title: 'b',
      time: '11:00',
      kcal: 100,
      carbohydrates: 10,
      fats: 50,
      proteins: 40,
      date: rightDate
    },
    {
      id: '3',
      title: 'c',
      time: '11:00',
      kcal: 100,
      carbohydrates: 10,
      fats: 50,
      proteins: 40,
      date: rightDate
    }
  ];
  const arr: {date: Date, meals: Map<string, ICalendarCell>}[] = [
    {date: rightDate, meals: new Map().set(meals[0].time, meals[0]),},
    {date: wrongDate, meals: new Map().set(meals[1].time, meals[1]),},
    {date: rightDate, meals: new Map().set(meals[2].time, meals[2]),},
  ];

  it('should create an instance', function () {
    expect(pipe).toBeTruthy();
  });

  it('should return summary of kilo calories data', function () {
    expect(pipe.transform(rightDate, arr)).toEqual(300);
  });

  it('should return undefined', function () {
    expect(pipe.transform(wrongDate, arr)).toEqual(undefined);
  });
});
