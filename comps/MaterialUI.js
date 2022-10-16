import {
  createStyles,
  fade,
  Theme,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles"
import {
  TextField,
  Button,
  InputAdornment,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  ButtonGroup,
  Box,
} from "@mui/material"

export const CssTextField = withStyles({
  root: {
    "& input": {
      color: "#5bccfc",
      filter: "brightness(1.4)",
      fontWeight: 600,
      textAlign: "end",
    },
    "& label": {
      color: "#0092d1",
      filter: "brightness(1.4) grayscale(0.5)",
      fontSize: 16,
      fontWeight: 600,
      transform: "translateY(5px)",
      textShadow: "1px 1px 2px black",
    },
    "& label.Mui-focused": {
      color: "#0092d1",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0092d1",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#0092d1",
        borderWidth: 4,
        filter: "grayscale(0.5) brightness(1.4)",
        borderRadius: 15,
        transition: "all 0.2s ease",
        width: "100%",
      },
      "&:hover fieldset": {
        borderColor: "#3dc5ff",
        borderWidth: 4,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3dc5ff",
        borderWidth: 4,
      },
      "& .MuiAutocomplete-clearIndicator": {
        color: "red",
      },
    },
  },
})(TextField)

export const CssTextFieldLight = withStyles({
  root: {
    "& input": {
      color: "#5bccfc",
      filter: "brightness(1.4)",
      fontWeight: 600,
      textAlign: "end",
    },
    "& label": {
      color: "#0092d1",
      filter: "brightness(1.4) grayscale(0.5)",
      fontSize: 16,
      fontWeight: 600,
      transform: "translateY(5px)",
      textShadow: "1px 1px 2px black",
    },
    "& label.Mui-focused": {
      color: "#0092d1",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0092d1",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ffa382",
        borderWidth: 4,
        filter:
          "grayscale(0.5) brightness(1.4) drop-shadow(1px 1px 2px #000000aa)",
        borderRadius: 15,
        transition: "all 0.2s ease",
        width: "100%",
      },
      "&:hover fieldset": {
        borderColor: "#3dc5ff",
        borderWidth: 4,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3dc5ff",
        borderWidth: 4,
      },
      "& .MuiAutocomplete-clearIndicator": {
        color: "red",
      },
    },
  },
})(TextField)

export const NewTextField = withStyles({
  root: {
    "& input": {
      color: "#aa2d22",
      filter: "brightness(1)",
      fontWeight: 600,
      textAlign: "right",
    },
    "& label": {
      color: "#ffa382",
      filter: "brightness(1) grayscale(0)",
      fontSize: 16,
      fontWeight: 600,
      textShadow: "1px 1px 2px black",
      paddingLeft: 5,
    },
    "& label.Mui-focused": {
      color: "#ffa382",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ffa382",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#aa2200",
        borderWidth: 2,
        filter: "grayscale(0) brightness(1)",
        borderRadius: 8,
        transition: "all 0.2s ease",
        width: "100%",
      },
      "&:hover fieldset": {
        borderColor: "#ffa382",
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffa382",
        borderWidth: 2,
      },
      "& .MuiAutocomplete-clearIndicator": {
        color: "red",
      },
    },
  },
})(TextField)

export const NewTextFieldLight = withStyles({
  root: {
    "& input": {
      color: "#aa2d22",
      filter: "brightness(1)",
      fontWeight: 600,
      textAlign: "right",
    },
    "& label": {
      color: "#a82d00",
      filter: "brightness(1) grayscale(0)",
      fontSize: 16,
      fontWeight: 600,

      paddingLeft: 5,
    },
    "& label.Mui-focused": {
      color: "#ffa382",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ffa382",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#aa2200",
        borderWidth: 2,
        filter: "grayscale(0) brightness(1)",
        borderRadius: 8,
        transition: "all 0.2s ease",
        width: "100%",
      },
      "&:hover fieldset": {
        borderColor: "#ffa382",
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffa382",
        borderWidth: 2,
      },
      "& .MuiAutocomplete-clearIndicator": {
        color: "red",
      },
    },
  },
})(TextField)

export const VVTextField = withStyles({
  root: {
    "& input": {
      color: "#5bccfc",
      filter: "brightness(1.4)",
      fontWeight: 600,
      textAlign: "end",
    },
    "& label": {
      color: "#0092d1",
      filter: "brightness(1.4) grayscale(0.5)",
      fontSize: 16,
      fontWeight: 600,
      textShadow: "1px 1px 2px black",
    },
    "& label.Mui-focused": {
      color: "#0092d1",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0092d1",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#0092d1",
        borderWidth: 2,
        filter: "grayscale(0.5) brightness(1.4)",
        borderRadius: 15,
        transition: "all 0.2s ease",
        width: "100%",
        height: 60,
      },
      "&:hover fieldset": {
        borderColor: "#3dc5ff",
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3dc5ff",
        borderWidth: 2,
      },
      "& .MuiAutocomplete-clearIndicator": {
        color: "red",
      },
    },
  },
})(TextField)

export const PersonalienTextFieldLight = withStyles({
  root: {
    "& input": {
      color: "white",
      filter: "brightness(1)",
      fontWeight: 400,
      fontSize: 16,
      textAlign: "start",

      "&::-webkit-inner-spin-button ": {
        appearance: "none",
      },
    },
    "& label": {
      color: "white",
      filter: "brightness(1.0) ",
      fontSize: 15,

      textShadow: "1px 1px 2px black",
    },
    "& label.Mui-focused": {
      color: "#ffa382",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0092d1",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ffa382",
        borderWidth: 2,
        filter: "grayscale(0) brightness(1) drop-shadow(1px 1px 2px #000000aa)",
        borderRadius: 10,
        transition: "all 0.2s ease",
        width: "100%",
      },
      "&:hover fieldset": {
        borderColor: "white",
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffa382",
        borderWidth: 2,
      },
      "& .MuiAutocomplete-clearIndicator": {
        color: "red",
      },
    },
  },
})(TextField)

/* Dark */
export const PersonalienTextField = withStyles({
  root: {
    "& input": {
      color: "#ffa382",
      filter: "brightness(1)",
      fontWeight: 400,
      fontSize: 16,
      textAlign: "start",

      "&::-webkit-inner-spin-button ": {
        appearance: "none",
      },
    },
    "& label": {
      color: "#ffa382",
      filter: "brightness(1.0) ",
      fontSize: 15,

      textShadow: "1px 1px 2px black",
    },
    "& label.Mui-focused": {
      color: "#ffa382",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0092d1",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#a82d00",
        borderWidth: 2,
        filter: " brightness(1.2)",
        borderRadius: 10,
        transition: "all 0.2s ease",
        width: "100%",
      },
      "&:hover fieldset": {
        borderColor: "#ffa382",
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffa382",
        borderWidth: 2,
      },
      "& .MuiAutocomplete-clearIndicator": {
        color: "red",
      },
    },
  },
})(TextField)

export const kwhTextField = withStyles({
  root: {
    "& input": {
      color: "#5bccfc",
      filter: "brightness(1.4)",
      fontWeight: 600,
      textAlign: "start",

      "&::-webkit-inner-spin-button ": {
        appearance: "none",
      },
    },
    "& label": {
      color: "#0092d1",
      filter: "brightness(1.4) ",
      fontSize: 15,

      textShadow: "1px 1px 2px black",
    },
    "& label.Mui-focused": {
      color: "#0092d1",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0092d1",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#0092d1",
        borderWidth: 2,
        filter: " brightness(1.4)",
        borderRadius: 10,
        transition: "all 0.2s ease",
        width: "100%",
      },
      "&:hover fieldset": {
        borderColor: "#3dc5ff",
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3dc5ff",
        borderWidth: 2,
      },
      "& .MuiAutocomplete-clearIndicator": {
        color: "red",
      },
    },
  },
})(TextField)

export const CssTextFieldMobil = withStyles({
  root: {
    "& input": {
      color: "#000",
      fontWeight: 600,
      textAlign: "start",
      paddingLeft: 25,
      fontSize: 15,
      transform: "translateX(-14px)",
    },
    "& label": {
      color: "#004574",

      fontSize: 12,
      minheight: 22,
      fontWeight: 400,

      top: "3px",
    },
    "& label.Mui-focused": {
      color: "#004574",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#004574",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#004574",
        borderWidth: 2,

        borderRadius: 5,
        transition: "all 0.2s ease",
      },
      "&:hover fieldset": {
        borderColor: "#004574",
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#004574",
        borderWidth: 2,
      },
      "& .MuiAutocomplete-clearIndicator": {
        color: "red",
      },
    },
  },
})(TextField)
