import {IdayKcals} from "../interfaces/dayKcal";

export const findKCal = (date: string, arr: IdayKcals[]): IdayKcals | undefined => {
  return arr.find( res => {return res.date === date} );
}

