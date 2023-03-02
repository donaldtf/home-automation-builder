import { Box, Chip } from "@mui/material";
import React, { useState, useContext } from "react";

import { eventOperators } from "../constants";
import { ASTContext } from "../contexts/ast-context";

export const ActionStatement = () => {
  const { ast } = useContext(ASTContext);

  const onEventSelected = (selectedEvent) => {
    // setAST({
    //   ...ast,
    //   when: {
    //     ...selectedEvent,
    //     lhs: null,
    //     rhs: null,
    //   },
    // });
  };

  return (
    <div>
      {Object.keys(eventOperators).map((key) => {
        const isCurrent = ast.when?.operator === key;

        return (
          <Chip
            key={key}
            style={{ marginRight: "6px" }}
            label={key}
            onClick={() => onEventSelected(eventOperators[key])}
            variant={isCurrent ? "filled" : "outlined"}
          />
        );
      })}
    </div>
  );
};
