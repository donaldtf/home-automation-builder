import { Task, ExpressionKind, LiteralKind, ActionKind } from "../types";

// Close the blinds when it gets too hot outside and the sun is shining in.
export const automateWindowBlinds: Task = {
  kind: "task",
  when: {
    id: "0",
    kind: ExpressionKind.Binaryop,
    operator: "risesAbove",
    lhs: {
      id: "1",
      kind: ExpressionKind.Property,
      device: "weather_station",
      sensor: "temperature",
    },
    rhs: {
      id: "3",
      kind: ExpressionKind.Property,
      device: "thermostat",
      sensor: "temperature",
    },
  },
  if: {
    id: "7",
    kind: ExpressionKind.Binaryop,
    operator: "greaterThan",
    lhs: {
      id: "4",
      kind: ExpressionKind.Property,
      device: "living_room_window",
      sensor: "light_level",
    },
    rhs: {
      id: "5",
      kind: LiteralKind.Number,
      value: 40,
    },
  },
  action: {
    id: "6",
    kind: ActionKind.Actuate,
    device: "living_room_window",
    knob: "close_blinds",
  },
};

// Turns off stove if no one is home after front door gets locked.
export const ensureStoveOff: Task = {
  kind: "task",
  when: {
    id: "0",
    kind: ExpressionKind.Binaryop,
    operator: "becomes",
    lhs: {
      id: "1",
      kind: ExpressionKind.Property,
      device: "front_door",
      sensor: "is_locked",
    },
    rhs: {
      id: "2",
      kind: LiteralKind.Boolean,
      value: true,
    },
  },
  if: {
    id: "6",
    kind: ExpressionKind.Binaryop,
    operator: "equals",
    lhs: {
      id: "3",
      kind: ExpressionKind.Property,
      device: "proximity",
      sensor: "num_people_home",
    },
    rhs: {
      id: "4",
      kind: LiteralKind.Number,
      value: 0,
    },
  },
  action: {
    id: "5",
    kind: ActionKind.Actuate,
    device: "stove",
    knob: "turn_off",
  },
};
