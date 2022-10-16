import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
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
  CircularProgress,
} from "@mui/material"

export default function Results() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }, [])

  return (
    <>
      <div className="LoadingWrong">
        <CircularProgress size={40} sx={{ color: "white", marginRight: 2 }} />
        <b>404 | Seite nicht gefunden</b>
      </div>
    </>
  )
}
