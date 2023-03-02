import { Box, Chip } from "@mui/material";
import React, { useState, useContext } from "react";

import { actionOperators } from "../constants";
import { ASTContext } from "../contexts/ast-context";

export const IfStatement = () => {
  const { ast, updateAstExpressionChild } = useContext(ASTContext);

  const onEventSelected = (selectedEvent) => {
    // setAST({
    //   ...ast,
    //   if: {
    //     ...selectedEvent,
    //     lhs: null,
    //     rhs: null,
    //   },
    // });
  };

  return (
    <div>
      {Object.keys(actionOperators).map((key) => {
        // const isCurrent = ast.if?.operator === key;

        return (
          <Chip
            key={key}
            style={{ marginRight: "6px" }}
            label={key}
            onClick={() => onEventSelected(actionOperators[key])}
            variant={false ? "filled" : "outlined"}
          />
        );
      })}
    </div>
  );
};
