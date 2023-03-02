import React, { createContext, useState } from "react";
import { emptyTask } from "../constants";
import {
  Task,
  Expr,
  Section,
  RootExpr,
  ExpressionKind,
  Literal,
} from "../types";

export const ASTContext = createContext<{
  ast: Task;
  updateAstExpressionChild: (
    section: Section,
    parentId: string | null,
    expression: Expr,
    side?: string // should be set to 'left' | 'right in the future
  ) => void;
  updateASTValue: (section: Section, expression: Expr) => void;
  replaceAst: (task: Task) => void;
}>(null);

const findObject = (current: Expr, id: string): Expr | null => {
  if (current.id === id) {
    return current;
  }

  if (current.kind === ExpressionKind.Binaryop) {
    const left = findObject(current.lhs, id);
    if (left) return left;

    const right = findObject(current.rhs, id);
    if (right) return right;
  }

  if (current.kind === ExpressionKind.Unaryop) {
    const arg = findObject(current.arg, id);
    if (arg) return arg;
  }

  return null;
};

const updateASTChild = (
  task: Task,
  section: Section,
  parentId: string | null,
  expression: Expr,
  side?: string
): Task => {
  const copy = structuredClone(task);
  console.log({ copy, section });

  if (!parentId) {
    (copy[section] as RootExpr) = expression as RootExpr;
  } else {
    const object = findObject(copy[section] as RootExpr, parentId);

    if (!object) {
      console.warn("parentId not found");
      return copy;
    }

    // Parents can only be binary or unary ops
    if (object.kind === ExpressionKind.Binaryop) {
      if (!side) {
        console.warn("attempting to update binary with no side argument");
        return copy;
      } else if (side === "left") {
        object.lhs = expression;
      } else {
        object.rhs = expression;
      }
    } else if (object.kind === ExpressionKind.Unaryop) {
      object.arg = expression;
    }
  }

  return copy;
};

const updateValue = (
  task: Task,
  section: Section,
  expression: Literal
): Task => {
  const copy = structuredClone(task);
  console.log({ copy });

  const object = findObject(
    copy[section] as RootExpr,
    expression.id
  ) as Literal;

  if (!object) {
    console.warn("object not found");
    return copy;
  }

  Object.keys(object).forEach((key) => {
    object[key] = expression[key];
  });

  return copy;
};

const ASTProvider = (props) => {
  const [ast, setAST] = useState<Task>(emptyTask);

  const updateAstExpressionChild = (
    section: Section,
    parentId: string | null,
    expression: Expr,
    side: "left" | "right"
  ) => {
    const newAst = updateASTChild(ast, section, parentId, expression, side);

    setAST(newAst);
  };

  const updateASTValue = (section: Section, literal: Literal) => {
    const newAst = updateValue(ast, section, literal);

    setAST(newAst);
  };

  return (
    <ASTContext.Provider
      value={{
        ast,
        updateAstExpressionChild,
        updateASTValue,
        replaceAst: setAST,
      }}
    >
      {props.children}
    </ASTContext.Provider>
  );
};

export { ASTProvider };
