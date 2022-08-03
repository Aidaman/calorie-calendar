import {HandleOutputPipe} from "./handle-output.pipe";
import {ICalendarCell} from "../interfaces/calendar-cell.interface";

describe('Pipe that handle an output in the grid', ()=>{
  const pipe = new HandleOutputPipe();

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
      date: wrongDate
    },
    {
      id: '3',
      title: 'c',
      time: '11:00',
      kcal: 100,
      carbohydrates: 10,
      fats: 50,
      proteins: 40,
      date: wrongDate
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

  it('should return calendar cell data', function () {
    expect(pipe.transform(arr, "11:00", rightDate)).toEqual(meals[0]);
  });

  it('should return null', function () {
    expect(pipe.transform(arr, '21:00', wrongDate)).toEqual(null);
  });
})
