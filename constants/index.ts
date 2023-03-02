import { Task } from "../types";

export const emptyTask: Task = {
  kind: "task",
  when: null,
  if: null,
  action: null,
};

export const eventOperators = {
  risesAbove: {
    operator: "risesAbove",
    kind: "binaryop",
  },
  dropsBelow: {
    operator: "dropsBelow",
    kind: "binaryop",
  },
  becomes: {
    operator: "becomes",
    kind: "binaryop",
  },
  toggles: {
    operator: "toggles",
    kind: "unaryop",
  },
};

export const numberOperators = {
  plus: {
    operator: "plus",
    kind: "binaryop",
  },
  minus: {
    operator: "minus",
    kind: "binaryop",
  },
  multiply: {
    operator: "multiply",
    kind: "binaryop",
  },
  divide: {
    operator: "divide",
    kind: "binaryop",
  },
};

export const booleanOperators = {
  negate: {
    operator: "negate",
    kind: "unaryop",
  },
  not: {
    operator: "not",
    kind: "unaryop",
  },
  lessThan: {
    operator: "lessThan",
    kind: "binaryop",
  },
  greaterThan: {
    operator: "greaterThan",
    kind: "binaryop",
  },
  equals: {
    operator: "equals",
    kind: "binaryop",
  },
  and: {
    operator: "and",
    kind: "binaryop",
  },
  or: {
    operator: "or",
    kind: "binaryop",
  },
};

export const actionOperators = {
  ...numberOperators,
  ...booleanOperators,
};

export const devices = {
  thermostat: {
    sensors: [
      { name: "set_point", type: "number" },
      { name: "temperature", type: "number" },
    ],
    knobs: [{ name: "raise" }, { name: "lower" }],
  },
  weather_station: {
    sensors: [
      { name: "temperature", type: "number" },
      { name: "light_level", type: "number" },
    ],
    knobs: [],
  },
  living_room_window: {
    sensors: [{ name: "light_level", type: "number" }],
    knobs: [{ name: "open_blinds" }, { name: "close_blinds" }],
  },
  front_door: {
    sensors: [
      { name: "is_locked", type: "boolean" },
      { name: "is_closed", type: "boolean" },
    ],
    knobs: [{ name: "lock" }],
  },
  proximity: {
    sensors: [{ name: "num_people_home", type: "number" }],
  },
  stove: {
    sensors: [{ name: "is_off", type: "boolean" }],
    knobs: [{ name: "turn_off" }],
  },
};
