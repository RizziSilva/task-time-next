import { Times } from '@/types';
import { getFormmatedTimesFromSeconds } from './timer.utils';

describe('Timer util tests', () => {
  it('Get time from 10 seconds with success', () => {
    const timeSpent: number = 10;
    const expectedResult: Times = {
      hours: '00',
      minutes: '00',
      seconds: '10',
    };
    const result: Times = getFormmatedTimesFromSeconds(timeSpent);

    expect(result).toEqual(expectedResult);
  });

  it('Get time from 60 seconds with success', () => {
    const timeSpent: number = 60;
    const expectedResult: Times = {
      hours: '00',
      minutes: '01',
      seconds: '00',
    };
    const result: Times = getFormmatedTimesFromSeconds(timeSpent);

    expect(result).toEqual(expectedResult);
  });

  it('Get time from 50 minutes with success', () => {
    const timeSpent: number = 3000;
    const expectedResult: Times = {
      hours: '00',
      minutes: '50',
      seconds: '00',
    };
    const result: Times = getFormmatedTimesFromSeconds(timeSpent);

    expect(result).toEqual(expectedResult);
  });

  it('Get time from 60 minutes with success', () => {
    const timeSpent: number = 3600;
    const expectedResult: Times = {
      hours: '01',
      minutes: '00',
      seconds: '00',
    };
    const result: Times = getFormmatedTimesFromSeconds(timeSpent);

    expect(result).toEqual(expectedResult);
  });

  it('Get time from 10 hours with success', () => {
    const timeSpent: number = 36000;
    const expectedResult: Times = {
      hours: '10',
      minutes: '00',
      seconds: '00',
    };
    const result: Times = getFormmatedTimesFromSeconds(timeSpent);

    expect(result).toEqual(expectedResult);
  });
});
