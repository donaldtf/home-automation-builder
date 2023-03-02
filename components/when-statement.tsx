import { useContext } from "react";

import { v4 as uuid } from "uuid";
import { ASTContext } from "../contexts/ast-context";
import { Section } from "../types";
import { EventChips } from "./event-chips";
import { Expression } from "./expression";

export const WhenStatement = () => {
  const { ast, updateAstExpressionChild } = useContext(ASTContext);

  const { when } = ast;

  const onEventSelected = (selectedEvent) => {
    updateAstExpressionChild(Section.When, null, {
      id: uuid(),
      ...selectedEvent,
      lhs: null,
      rhs: null,
    });
  };

  return (
    <div>
      <EventChips
        selectedOperator={when?.operator}
        onChange={onEventSelected}
      />
      {when?.kind && (
        <Expression
          renderEventChips={false}
          section={Section.When}
          expression={when}
        />
      )}
    </div>
  );
};
