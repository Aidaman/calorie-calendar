import {ColorFillPipe} from "./color-fill.pipe";
import {IUser} from "../interfaces/user";

describe('ColorFillPipe', () => {
  const pipe = new ColorFillPipe();
  const user: IUser = {
    carbohydrates: 0,
    fats: 0,
    gender: "male",
    heightCm: 175,
    maxCal: 1590,
    minCal: 2090,
    proteins: 0,
    weightkg: 60,
    id: '1'
  }
  it('create an instance', () => {
    const pipe = new ColorFillPipe();
    expect(pipe).toBeTruthy();
  });
  it('works with normal amount', () => {
    expect(pipe.transform(1600, user)).toEqual('text-blue');
  });
  it('works with less than normal amount', () => {
    console.log(pipe.transform(750, user));
    expect(pipe.transform(750, user)).toEqual('text-yellow');
  });
  it('works with innormal amount', () => {
    expect(pipe.transform(2200, user)).toEqual('text-red');
  });
});
