import {ShortPipe} from "./short.pipe";

describe('HandleTotalKiloCaloriesSummaryPipe', () => {
  const pipe = new ShortPipe();
  //Length 14
  const title = 'Delicious food'
  //Length > 14. 15-th symbol is 'c'
  const longerTitle = 'The most Delicious food in the world'
  //Length > 14. 15-th symbol is 'u'
  const spacelessTitle = 'ThemostDeliciousfoodintheworld'

  it('should create an instance', function () {
    expect(pipe).toBeTruthy();
  });

  it('should save relatively short title as it is', () => {
    expect(pipe.transform(title)).toEqual(title);
  });

  it('should short longer title to last space in range of maximum (15)', () => {
    expect(pipe.transform(longerTitle)).toEqual('The most');
  });

  it('should short longer title to last letter in range of maximum (15) and put an ellipsis', () => {
    expect(pipe.transform(spacelessTitle)).toEqual('ThemostDel...');
  });
});
