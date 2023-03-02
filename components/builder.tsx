import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { ASTProvider } from "../contexts/ast-context";
import { WhenStatement } from "./when-statement";
import { IfStatement } from "./if-statement";
import { ActionStatement } from "./action-statement";
import { HumanPreview } from "./human-preview";
import { NavBar } from "./nav-bar";

enum RadioOption {
  When = "when",
  If = "if",
  Action = "action",
}

export const Builder = () => {
  const [selectedRadio, setSelectedRadio] = useState(RadioOption.When);

  const onRadioSelected = (event: React.FormEvent<HTMLInputElement>) => {
    setSelectedRadio(event.currentTarget.value as RadioOption);
  };

  return (
    <ASTProvider>
      <NavBar />
      <Box display="flex" height="100%" justifyContent="space-between">
        <Box height="100%" width="50%" padding={4}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Automation Builder
            </FormLabel>
            <RadioGroup value={selectedRadio} row onChange={onRadioSelected}>
              <Box justifyContent="space-between">
                <FormControlLabel
                  value={RadioOption.When}
                  control={<Radio />}
                  label="When"
                />
                <FormControlLabel
                  value={RadioOption.If}
                  control={<Radio />}
                  label="If"
                />
                <FormControlLabel
                  value={RadioOption.Action}
                  control={<Radio />}
                  label="Action"
                />
              </Box>
            </RadioGroup>
          </FormControl>
          {selectedRadio === RadioOption.When && <WhenStatement />}
          {selectedRadio === RadioOption.If && <IfStatement />}
          {selectedRadio === RadioOption.Action && <ActionStatement />}
        </Box>
        <HumanPreview />
      </Box>
    </ASTProvider>
  );
};
