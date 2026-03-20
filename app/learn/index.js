import day01 from "./day-01";
import day02 from "./day-02";
import day03 from "./day-03";
import day04 from "./day-04";
import day05 from "./day-05";
import day06 from "./day-06";

export const learningDays = [day01, day02, day03, day04, day05, day06];

export const learningDayIds = learningDays.map((day) => day.id);

export function getLearningDay(dayId) {
  return learningDays.find((day) => day.id === dayId);
}

export function getLearningDayHref(dayId) {
  return `/content/${dayId}`;
}
