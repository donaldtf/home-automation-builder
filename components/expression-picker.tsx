import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

import { LiteralKind, ExpressionKind } from "../types";
import { EventChips } from "./event-chips";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

type Props = {
  onChange: (
    kind: LiteralKind | ExpressionKind,
    opts: { device?: any; event?: { operator: string; kind: string } }
  ) => void;
  label?: string;
};

export const ExpressionPicker = ({ label = "Operator", onChange }: Props) => {
  const [pickedExpression, setPickedExpression] = useState<
    LiteralKind | ExpressionKind
  >();
  const [operator, setOperator] = useState<string>();

  const onTypeSelected = (kind: string) => {
    console.log("here????", kind);
    setPickedExpression(kind as LiteralKind | ExpressionKind);
    if (
      kind === LiteralKind.String ||
      kind === LiteralKind.Boolean ||
      kind === LiteralKind.Number ||
      kind === ExpressionKind.Property
    ) {
      onChange(kind, {});
    }
  };

  const onOperatorChange = (event: { operator: string; kind: string }) => {
    onChange(pickedExpression, { event });
  };

  return (
    <>
      <Box marginTop={2}>
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            value={ExpressionKind.Binaryop}
            label={label}
            onChange={(e) => onTypeSelected(e.target.value.toLowerCase())}
          >
            {Object.keys(LiteralKind).map((kind) => {
              return (
                <MenuItem key={kind} value={kind}>
                  {capitalizeFirstLetter(kind)}
                </MenuItem>
              );
            })}
            {Object.keys(ExpressionKind).map((kind) => {
              return (
                <MenuItem key={kind} value={kind}>
                  {capitalizeFirstLetter(kind)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      {pickedExpression === ExpressionKind.Binaryop && (
        <Box marginTop={2}>
          <EventChips selectedOperator={operator} onChange={onOperatorChange} />
        </Box>
      )}
    </>
  );
};
