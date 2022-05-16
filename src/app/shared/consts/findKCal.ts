import {IdayKcals} from "../interfaces/dayKcal";

export const findKCal = (date: Date, arr: IdayKcals[]): IdayKcals | undefined => {
  return arr.find( res => {return res.date === date} );
}

