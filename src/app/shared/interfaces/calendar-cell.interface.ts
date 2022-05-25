export interface ICalendarCell {
  id: string;
  title: string;
  time: string;
  image?: string;
  kcal: number;
  carbohydrates: number;
  fats: number;
  proteins: number;
  date: Date;
}
