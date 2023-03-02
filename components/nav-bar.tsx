import MenuIcon from "@mui/icons-material/MenuOutlined";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { emptyTask } from "../constants";
import { ASTContext } from "../contexts/ast-context";
import { automateWindowBlinds, ensureStoveOff } from "../examples";

export const NavBar = () => {
  const { ast, replaceAst } = useContext(ASTContext);

  const onLoadExample1 = () => {
    replaceAst(ensureStoveOff);
  };

  const onLoadExample2 = () => {
    replaceAst(automateWindowBlinds);
  };

  const onReset = () => {
    replaceAst(emptyTask);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Resourcely Home Automation
        </Typography>
        <Button
          onClick={onLoadExample1}
          style={{ marginRight: "8px" }}
          variant="outlined"
          color="inherit"
        >
          Load Example 1
        </Button>
        <Button
          onClick={onLoadExample2}
          style={{ marginRight: "8px" }}
          variant="outlined"
          color="inherit"
        >
          Load Example 2
        </Button>
        <Button onClick={onReset} variant="outlined" color="inherit">
          Reset
        </Button>
      </Toolbar>
    </AppBar>
  );
};
