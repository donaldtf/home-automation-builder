import { Box } from "@mui/material";
import React, { useContext } from "react";

import { ASTContext } from "../contexts/ast-context";

export const HumanPreview = () => {
  const { ast } = useContext(ASTContext);

  const prettyPrintJson = JSON.stringify(ast, null, 1);

  return (
    <Box
      padding="32px"
      height="100vh"
      width="50%"
      style={{ backgroundColor: "#cccccc" }}
    >
      {prettyPrintJson}
    </Box>
  );
};
