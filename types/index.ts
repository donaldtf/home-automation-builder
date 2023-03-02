export enum LiteralKind {
  Boolean = "boolean",
  Number = "number",
  String = "string",
}

export enum ExpressionKind {
  Property = "property",
  Unaryop = "unaryop",
  Binaryop = "binaryop",
}

export enum ActionKind {
  Notify = "notify",
  Actuate = "actuate",
}

export interface Literal {
  id: string;
  kind: LiteralKind;
  value: boolean | number | string;
}

// Represents the value of the specified
// sensor on the device.
export interface Property {
  id: string;
  kind: ExpressionKind.Property;
  device: string;
  sensor: string;
}

export interface UnaryOp {
  id: string;
  kind: ExpressionKind.Unaryop;
  operator: string;
  arg: Expr;
}

export interface BinaryOp {
  id: string;
  kind: ExpressionKind.Binaryop;
  operator: string;
  lhs: Expr;
  rhs: Expr;
}

export interface Notify {
  id: string;
  kind: ActionKind.Notify;
  channel: string;
  message: string;
}

// Represents actuating the specified knob on the device.
export interface Actuate {
  id: string;
  kind: ActionKind.Actuate;
  device: string;
  knob: string;
}

export type Expr = UnaryOp | BinaryOp | Property | Literal | null;
export type Action = Actuate | Notify;

export type RootExpr = BinaryOp | UnaryOp | null;

export interface Task {
  kind: "task";
  when: RootExpr; // Expr must have type Event
  if: RootExpr; // Expr must have type boolean | boolean
  action: Action;
}

export enum Section {
  When = "when",
  If = "if",
  Action = "action",
}
