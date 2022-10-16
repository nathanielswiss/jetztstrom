import { VariableSizeList } from "react-window"
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
import {
  useState,
  forwardRef,
  useContext,
  createContext,
  useRef,
  useEffect,
} from "react"
import { withStyles } from "@material-ui/core/styles"

import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete"
import useMediaQuery from "@mui/material/useMediaQuery"
import Popper from "@mui/material/Popper"
import { useTheme, styled } from "@mui/material/styles"

import Typography from "@mui/material/Typography"
import LocationOn from "@mui/icons-material/LocationOn"

import {
  ShareLocation,
  AccountBox,
  Business,
  ElectricalServices,
  Today,
} from "@mui/icons-material"
import CircularProgress from "@mui/material/CircularProgress"
import * as React from "react"
import PropTypes from "prop-types"

const CssTextField = withStyles({
  root: {
    "& input": {
      color: "#a82d00",
      fontWeight: 600,
    },
    "& label": {
      color: "#a82d00",
      filter: "brightness(1.2) grayscale(0)",
      fontSize: 16,
      fontWeight: 600,
      padding: "0 5px",
    },
    "& label.Mui-focused": {
      color: "#aa2d00",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0092d1",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#aa2d00",
        borderWidth: 2,
        filter: "grayscale(0.1) brightness(1.1)",
        borderRadius: 8,
        transition: "all 0.2s ease",
        width: "100%",
      },
      "&:hover fieldset": {
        borderColor: "#ffa382",
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#aa2d00",
        filter: " grayscale(0.2) brightness(1.2)",
        borderWidth: 3,
      },
      "& .MuiAutocomplete-clearIndicator": {
        color: "red",
      },
    },
  },
})(TextField)

const LISTBOX_PADDING = 8 // px
const OuterElementContext = createContext({})

const OuterElementType = forwardRef((props, ref) => {
  const outerProps = useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})
OuterElementType.displayName = "search"

function renderRow(props) {
  const { data, index, style } = props
  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      <ShareLocation style={{ marginRight: 30 }} /> {dataSet[1]}
    </Typography>
  )
}

function useResetCache(data) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

// Adapter for react-window
const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props
  const itemData = []
  children.forEach((item) => {
    itemData.push(item)
    itemData.push(...(item.children || []))
  })

  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  })

  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = (child) => {
    if (child.hasOwnProperty("group")) {
      return 48
    }

    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
          style={{ borderRadius: 0 }}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

ListboxComponent.propTypes = {
  children: PropTypes.node,
}

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,

      color: "#5e0a03",
      filter: "brightness(1.4) grayscale(0.5)",
    },
    "& li:hover": {
      backgroundColor: "#5e0a03",
      color: "white",
    },
  },
})

const AutoCompleteOrtlight = ({
  newOrt,
  Classer,
  ortselect,
  ortErr,
  load,
  value,
  label,
}) => {
  return (
    <Autocomplete
      id="virtualize-demo"
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={newOrt}
      sx={{
        width: "100%",
        height: "100%",
        svg: { color: "#a82d00", filter: "brightness(1)" },
      }}
      renderInput={(params) => (
        <CssTextField
          {...params}
          label={label}
          required
          variant="outlined"
          style={{ marginLeft: 0 }}
          placeholder={
            ortErr == true
              ? "Ortschaft nicht gefunden"
              : "Wählen Sie Ihren Ortschaft aus"
          }
          error={ortErr == true ? true : false}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {load == false ? (
                  <LocationOn
                    style={{
                      color: "red",
                      transform: "scale(1.3) translateY(0px)",
                      filter: "grayscale(0.4) brightness(1.3) ",
                    }}
                  />
                ) : (
                  <CircularProgress sx={{ color: "#FFFFFF" }} size={25} />
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => [props, option]}
      renderGroup={(params) => params}
      onChange={(e, v) => {
        ortselect(v)
      }}
      value={value}
    />
  )
}

export default AutoCompleteOrtlight
