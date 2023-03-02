import { Chip } from "@mui/material";

import { eventOperators } from "../constants";
import { BinaryOp, Expr, UnaryOp } from "../types";

type Props = {
  selectedOperator: string;
  onChange: (operator: { operator: string; kind: string }) => void;
};

export const EventChips = ({ selectedOperator, onChange }: Props) => {
  return (
    <>
      {Object.keys(eventOperators).map((key) => {
        const isCurrent = selectedOperator === key;

        return (
          <Chip
            key={key}
            style={{ marginRight: "6px" }}
            label={key}
            onClick={() => onChange(eventOperators[key])}
            variant={isCurrent ? "filled" : "outlined"}
          />
        );
      })}
    </>
  );
};
