import { Box } from "@mui/material";
import { useContext } from "react";
import {
  BinaryOp,
  Expr,
  ExpressionKind,
  Literal,
  LiteralKind,
  Property,
  Section,
} from "../types";

import { v4 as uuid } from "uuid";
import { ASTContext } from "../contexts/ast-context";
import { DeviceSelect } from "./device-select";
import { EventChips } from "./event-chips";
import { ExpressionPicker } from "./expression-picker";

type Props = {
  section: Section;
  expression: Expr;
  parentId?: string | null;
  label?: string;
  renderEventChips?: boolean;
};

const createExpression = (
  kind: LiteralKind | ExpressionKind,
  opts: {
    device?: any;
    event?: { operator: string; kind: string };
    value?: string | boolean | number;
  }
): Expr => {
  switch (kind) {
    case ExpressionKind.Binaryop: {
      return {
        id: uuid(),
        kind,
        operator: opts.event.operator,
        lhs: null,
        rhs: null,
      };
    }
    case ExpressionKind.Unaryop: {
      return {
        id: uuid(),
        ...opts.event,
        kind,
        arg: null,
      };
    }
    case ExpressionKind.Property: {
      return {
        id: uuid(),
        kind,
        device: "",
        sensor: "",
      };
    }
    case LiteralKind.String:
    case LiteralKind.Number:
    case LiteralKind.Boolean: {
      return {
        id: uuid(),
        kind,
        value: opts.value,
      };
    }
  }
};

export const Expression = ({
  section,
  expression,
  label,
  parentId,
  renderEventChips = true,
}: Props) => {
  const { ast, updateAstExpressionChild, updateASTValue } =
    useContext(ASTContext);

  const onChange = (kind: LiteralKind | ExpressionKind, opts: any) => {
    console.log("adding a child");
    updateAstExpressionChild(
      section,
      parentId,
      createExpression(kind, opts),
      label.toLowerCase()
    );
  };

  const onInputChange = (e) => {
    updateASTValue(section, {
      ...expression,
      value: e.target.value,
    } as Literal);
  };

  const onBooleanChange = (e) => {
    updateASTValue(section, {
      ...expression,
      value: e.target.checked,
    } as Literal);
  };

  const onPropertyChange = (device: string, sensor: string) => {
    updateASTValue(section, {
      ...expression,
      device,
      sensor,
    } as Property);
  };

  const onOperatorChange = ({ operator }: { operator: string }) => {
    updateASTValue(section, {
      ...expression,
      operator,
    } as BinaryOp);
  };

  if (!expression || !expression.kind) {
    return <ExpressionPicker onChange={onChange} label={label} />;
  }

  switch (expression.kind) {
    case ExpressionKind.Binaryop: {
      const { lhs, rhs } = expression;

      return (
        <Box marginLeft={2}>
          {renderEventChips && (
            <Box marginTop={2}>
              <EventChips
                selectedOperator={expression.operator}
                onChange={onOperatorChange}
              />
            </Box>
          )}
          <Expression
            section={section}
            parentId={expression.id}
            expression={lhs}
            label="Left"
          />
          <Expression
            section={section}
            parentId={expression.id}
            expression={rhs}
            label="Right"
          />
        </Box>
      );
    }
    case ExpressionKind.Unaryop: {
      return <Box></Box>;
    }
    case ExpressionKind.Property: {
      return (
        <Box marginLeft={2}>
          <DeviceSelect
            startDevice={expression.device}
            startSensor={expression.sensor}
            onChange={onPropertyChange}
          />
        </Box>
      );
    }
    case LiteralKind.Boolean: {
      return (
        <Box marginLeft={2}>
          <input
            checked={expression.value as boolean}
            onChange={onBooleanChange}
            type="checkbox"
          />
        </Box>
      );
    }
    case LiteralKind.String: {
      return (
        <Box marginLeft={2}>
          <input
            value={expression.value as string}
            onChange={onInputChange}
            type="text"
          />
        </Box>
      );
    }
    case LiteralKind.Number: {
      return (
        <Box marginLeft={2}>
          <input
            value={expression.value as number}
            onChange={onInputChange}
            type="number"
          />
        </Box>
      );
    }
    default: {
      return (
        <Box marginLeft={2}>
          <ExpressionPicker onChange={onChange} label={label} />{" "}
        </Box>
      );
    }
  }
};
