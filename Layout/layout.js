import styles from "../styles/Layout.module.scss"

import {
  ThemeContext,
  ScrollContext,
  TarifBlockContext,
} from "../context/DataContext"
import { useContext, useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import cominfos from "../context/cominfos.json"
import { Button } from "@mui/material"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"

import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { styled } from "@mui/material/styles"
import Switch, { SwitchProps } from "@mui/material/Switch"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Image from "next/image"

const MaterialUISwitch = styled(Switch)(({ themer }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: themer == "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: themer == "dark" ? "#003892" : "#a82d00",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: themer == "dark" ? "#ffa382" : "#aab4be",
    borderRadius: 20 / 2,
  },
}))

const Layout = ({ children }) => {
  const [themer, UpdateThemer] = useContext(ThemeContext)
  const router = useRouter()

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // dark mode
      //console.log('dark')
      setTimeout(() => {
        UpdateThemer("dark")
      }, 1000)
    } else {
      //console.log('light')
      setTimeout(() => {
        UpdateThemer("light")
      }, 1000)
    }

    // console.log( window.matchMedia('(prefers-color-scheme: light)'))
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        e.matches == true ? UpdateThemer("dark") : UpdateThemer("light")
      })
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={themer == "dark" ? styles.LayoutDark : styles.Layout}
      >
        <nav
          className={themer == "dark" ? styles.mobilNavDark : styles.mobilNav}
        >
          <div className={styles.logo}></div>
          <div className={styles.modeSelecter}>
            <FormGroup>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{
                      m: 1,
                    }}
                    style={{
                      filter: " drop-shadow(1px 2px 4px rgba(0, 0, 0, 0.493)",
                    }}
                    themer={themer}
                    checked={themer == "light" ? false : true}
                    onChange={() =>
                      themer == "light" ? setThemer("dark") : setThemer("light")
                    }
                  />
                }
              />
            </FormGroup>
          </div>
        </nav>
        <div></div>
        <motion.nav
          className={themer == "dark" ? styles.MainNavDark : styles.MainNav}
          initial={{ opacity: 0, x: 0, y: -200 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.4, delay: 0.5 }}
        >
          <div className={styles.logo}>
            <img src="j.png" alt="logo" />
          </div>

          <div className={styles.menubox}>
            <ul>
              <Link href="#home">
                <a>
                  <h1
                    className={styles.logotext}
                    style={{ textTransform: "uppercase" }}
                  >
                    JetztStrom.de
                  </h1>
                </a>
              </Link>

              <Link href="#produkte">
                <a>
                  <li className={styles.produktLink}>Produkte</li>
                </a>
              </Link>

              <Link href="#kontakt">
                <a>
                  <li>Kontakte</li>
                </a>
              </Link>
              <li>
                {" "}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <MaterialUISwitch
                        sx={{ m: 1 }}
                        themer={themer}
                        checked={themer == "light" ? false : true}
                        onChange={() => {
                          themer == "light"
                            ? UpdateThemer("dark")
                            : UpdateThemer("light")
                        }}
                      />
                    }
                  />
                </FormGroup>
              </li>
            </ul>
          </div>
        </motion.nav>
        <div className={styles.childrenFrame}>{children}</div>
      </motion.div>
    </>
  )
}

export default Layout
