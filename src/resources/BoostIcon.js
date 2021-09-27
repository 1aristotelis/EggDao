import { IconButton, Typography } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B17C01"
    }
  }
});

export default function BoostIcon(props) {
  const txId = props.tx;
  const count = props.count;
  const handleClick = (e) => {
    e.stopPropagation();
    boostContent(txId);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton disabled onClick={handleClick} color="primary">
          <StarBorderIcon style={{ color: "#696969" }} />
        </IconButton>
        <Typography className="hoverRed" component="span" variant="body1">
          {count}
        </Typography>
      </div>
    </ThemeProvider>
  );
}

async function boostContent(txid) {
  //TODO
  console.log("boost");
}
