import { ADD_ZERO_MINIMUM_VALUE, ONE_HOUR_IN_SECONDS, ONE_MINUTE_IN_SECONDS } from '@/constants';

function getTimeFromSeconds(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / ONE_HOUR_IN_SECONDS);
  const minutes = Math.floor((totalSeconds % ONE_HOUR_IN_SECONDS) / ONE_MINUTE_IN_SECONDS);
  const seconds = totalSeconds % ONE_MINUTE_IN_SECONDS;

  return { hours, minutes, seconds };
}

export function getFormmatedTimesFromSeconds(totalSeconds: number) {
  const times = getTimeFromSeconds(totalSeconds);
  let hours = `${times.hours}`;
  let minutes = `${times.minutes}`;
  let seconds = `${times.seconds}`;
  const shouldHaveZeroInHours = times.hours < ADD_ZERO_MINIMUM_VALUE;
  const shouldHaveZeroInMinutes = times.minutes < ADD_ZERO_MINIMUM_VALUE;
  const shouldHaveZeroInSeconds = times.seconds < ADD_ZERO_MINIMUM_VALUE;

  if (shouldHaveZeroInHours) hours = `0${hours}`;
  if (shouldHaveZeroInMinutes) minutes = `0${minutes}`;
  if (shouldHaveZeroInSeconds) seconds = `0${seconds}`;

  return { hours, minutes, seconds };
}
