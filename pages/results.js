import { useEffect, useState, useContext, useRef } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
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

import { ThemeContext, DataContext } from "../context/DataContext"
import stylesNorm from "../styles/Norm/MainNorm.module.scss"

import styles from "../styles/Home.module.scss"
import HorizontalScroll from "react-scroll-horizontal"
import Orte from "../public/ort.json"
import AutoCompleteOrt from "../comps/AutoCompleteOrt"
import AutoCompleteOrtlight from "../comps/AutoCompleteOrtlight"
import { NewTextField, NewTextFieldLight } from "../comps/MaterialUI"
import {
  ShareLocation,
  AccountBox,
  Business,
  ElectricalServices,
  Today,
} from "@mui/icons-material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess"
import BoltIcon from "@mui/icons-material/Bolt"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import HeadTag from "../comps/HeadTag"
import FooterDesktop from "../comps/desktop/FooterDesktop"

const theme = createTheme({
  palette: {
    test: {
      light: "#ffa382",
      main: "#aa2d00",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#aa2d00",
    },

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
})

export default function Results() {
  const [daten, setDaten] = useContext(DataContext)
  const [sessionAccept, setSessionAccept] = useState("")
  const [sessionData, setSessionData] = useState("")
  const router = useRouter()
  const [themer, UpdateThemer] = useContext(ThemeContext)

  const [ortErr, setOrtErr] = useState(false)
  const [kwhJahrErr, setkWhJahrErr] = useState(false)
  const newOrt = Orte.map((e) => e.city)
  const [ort, setOrt] = useState()

  const [kundentyp, setKundenTyp] = useState()
  const [produktTyp, setProduktTyp] = useState()
  const [kWhJahr, setkWhJahr] = useState()
  const [battery, setBattery] = useState()
  const [batteryValue, setBatteryValue] = useState()
  const batteryRef = useRef()

  const [TarifResponse, setTarifResponse] = useState("test")
  const [monthAuswahl, UpdateMonthAuswahl] = useState("all")
  const [filterCard, UpdateFilterCard] = useState("")
  const [firstLoad, setFirstLoad] = useState(false)

  /* Functions */
  const onRadioChanged = (e) => {
    const kwhJahrInput = parseFloat(e.target.value)
    setkWhJahr(kwhJahrInput)
  }

  useEffect(() => {
    const sessionData1 = sessionStorage.length

    if (sessionData1 > 0) {
      setSessionAccept(true)
      setSessionData(JSON.parse(JSON.stringify(sessionStorage)))
    } else {
      setSessionAccept(false)

      setTimeout(() => {
        router.push("/404")
      }, 1000)
    }
  }, [])

  useEffect(() => {
    setOrt(sessionData.ortschaft)
    setProduktTyp(sessionData.produktTyp)
    setKundenTyp(sessionData.kundenTyp)
    setkWhJahr(sessionData.kwhAuswahl)
    setBattery(sessionData.battery)
    setBatteryValue(sessionData.battery)
    batteryRef.current = sessionData.battery

    if (window.localStorage.DataResponse) {
      const data = JSON.parse(window.localStorage.DataResponse)
      if (
        sessionData.ortschaft !== ort ||
        sessionData.kwhAuswahl !== kWhJahr ||
        sessionData.produktTyp !== produktTyp ||
        sessionData.kundenTyp !== kundentyp
      ) {
        TarifRequest(sessionData, "Sessionstorage")
      } else {
        setTarifResponse(data.Tarife)
        UpdateFilterCard(data.Tarife)
      }
    } else {
      TarifRequest(sessionData, "Sessionstorage")
    }
    //
  }, [sessionData])

  const TarifRequest = async (postdata, x) => {
    console.log(postdata, x)
    console.log("TarifRequest")
    try {
      var formBody = []

      for (var property in postdata) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(postdata[property])
        formBody.push(encodedKey + "=" + encodedValue)
      }

      formBody = formBody.join("&")
      const Request = await fetch(
        `${process.env.NEXT_PUBLIC_URL_MAIN}/api/tarifrechner`,
        {
          method: "POST",
          body: formBody,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: `Bearer ${sessionStorage.token}`,
          },
        }
      )

      const RequestData = await Request.json()

      /* dsa */
      if (RequestData) {
        setTarifResponse(RequestData.Tarife)
        UpdateFilterCard(RequestData.Tarife)
        // setDaten(RequestData, postdata)
        await window.localStorage.removeItem("DataResponse")
        await window.localStorage.setItem(
          "DataResponse",
          JSON.stringify(RequestData)
        )

        if (postdata) {
          sessionStorage.setItem("plz", postdata.plz)
          sessionStorage.setItem("kundenTyp", postdata.kundenTyp)
          sessionStorage.setItem("produktTyp", postdata.produktTyp)
          sessionStorage.setItem("kwhAuswahl", postdata.kwhAuswahl)
          console.log(postdata, x, RequestData)
        } else {
          console.log("fehler")
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <HeadTag title={`JetztStrom.de | Tarife`} />
      {sessionAccept && (
        <div className={stylesNorm.MainNorm}>
          <section id="home">
            <div className={stylesNorm.ResultsPage}>
              <motion.div
                initial={{ opacity: 0, x: -300, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ ease: "easeOut", duration: 0.7, delay: 0.4 }}
                viewport={{ once: false, amount: 0.35 }}
                exit={{ opacity: 0, x: 300, y: 0 }}
                className={
                  themer == "light"
                    ? stylesNorm.Research
                    : stylesNorm.ResearchDark
                }
              >
                <motion.div className={stylesNorm.searchBar}>
                  {themer == "dark" ? (
                    <AutoCompleteOrt
                      label={
                        ortErr
                          ? "Eingabe fehlerhaft..."
                          : "Ortschaft auswählen..."
                      }
                      ortErr={ortErr}
                      value={sessionData && sessionData.ortschaft}
                      load={false}
                      newOrt={newOrt}
                      ortselect={(value) => {
                        setOrt(value)
                        console.log(value)
                      }}
                    />
                  ) : (
                    <AutoCompleteOrtlight
                      label={
                        ortErr
                          ? "Eingabe fehlerhaft..."
                          : "Ortschaft auswählen..."
                      }
                      ortErr={ortErr}
                      load={false}
                      value={sessionData && sessionData.ortschaft}
                      newOrt={newOrt}
                      ortselect={(value) => {
                        setOrt(value)
                        console.log(value)
                      }}
                    />
                  )}
                </motion.div>
                <div
                  className={stylesNorm.MonateAuswahl}
                  data-title={"Kunden Typ..."}
                >
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="kundentyp"
                      name="kundentyp"
                      className={stylesNorm.kundenradio}
                    >
                      <FormControlLabel
                        value="private"
                        control={
                          <Radio
                            checked={kundentyp == "private"}
                            onChange={(e) => {
                              const kwh =
                                produktTyp == "electric" ? 2500 : 10000

                              setKundenTyp("private")

                              produktTyp == "electric"
                                ? setkWhJahr(2500)
                                : setkWhJahr(10000)

                              setTarifResponse("")
                              setkWhJahr(kwh)

                              const postdata = {
                                plz: new String(ort).slice(0, 5),
                                kwhAuswahl: kwh,
                                produktTyp: produktTyp,
                                kundenTyp: "private",
                                battery: battery,
                              }

                              TarifRequest(postdata, "place3")
                            }}
                            sx={
                              themer == "light"
                                ? {
                                    color: "#aa2d00",

                                    "&.Mui-checked": {
                                      color: "#a82d00",
                                    },
                                  }
                                : {
                                    color: "#aa2d00",

                                    "&.Mui-checked": {
                                      color: "#ffa382",
                                    },
                                  }
                            }
                          />
                        }
                        label={
                          <div
                            style={
                              themer == "light"
                                ? { display: "flex", gap: 3, color: "#a82d00" }
                                : { display: "flex", gap: 3, color: "#ffa382" }
                            }
                          >
                            <AccountBox
                              sx={
                                themer == "light"
                                  ? {
                                      filter: "grayscale(0.4) brightness(1.4)",
                                      color: "#a82d00",
                                    }
                                  : {
                                      filter: "grayscale(0.4) brightness(1.4)",
                                      color: "#c01607",
                                    }
                              }
                            />
                            <p>Privat</p>
                          </div>
                        }
                      />
                      <FormControlLabel
                        value="company"
                        control={
                          <Radio
                            checked={kundentyp == "company"}
                            onChange={(e) => {
                              const kwh =
                                produktTyp == "electric" ? 20000 : 40000

                              setKundenTyp("company")

                              produktTyp == "electric"
                                ? setkWhJahr(20000)
                                : setkWhJahr(40000)
                              setFirstLoad(true)
                              setTarifResponse("")

                              setkWhJahr(kwh)

                              const postdata = {
                                plz: new String(ort).slice(0, 5),
                                kwhAuswahl: kwh,
                                produktTyp: produktTyp,
                                kundenTyp: "company",
                                battery: battery,
                              }

                              TarifRequest(postdata, "place4")
                            }}
                            sx={
                              themer == "light"
                                ? {
                                    color: "#aa2d00",

                                    "&.Mui-checked": {
                                      color: "#a82d00",
                                    },
                                  }
                                : {
                                    color: "#aa2d00",

                                    "&.Mui-checked": {
                                      color: "#ffa382",
                                    },
                                  }
                            }
                          />
                        }
                        label={
                          <p
                            style={
                              themer == "light"
                                ? { display: "flex", gap: 3, color: "#a82d00" }
                                : { display: "flex", gap: 3, color: "#ffa382" }
                            }
                          >
                            <Business
                              sx={
                                themer == "light"
                                  ? {
                                      filter: "grayscale(0.4) brightness(1.4)",
                                      color: "#a82d00",
                                    }
                                  : {
                                      filter: "grayscale(0.4) brightness(1.4)",
                                      color: "#c01607",
                                    }
                              }
                            />{" "}
                            <p>Gewerbe</p>
                          </p>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div
                  className={
                    themer == "light"
                      ? stylesNorm.Personen
                      : stylesNorm.PersonenDark
                  }
                >
                  <div>
                    {produktTyp == "electric" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "tween", duration: 0.5 }}
                        className={stylesNorm.kwhAuswahl}
                        style={
                          kundentyp == "private" && produktTyp == "electric"
                            ? {
                                transform: "translateY(0)",
                                filter: "grayscale(0)",
                                pointerEvents: "all",
                              }
                            : {
                                transform: "translateY(0)",
                                filter: "grayscale(1)",
                                pointerEvents: "none",
                              }
                        }
                      >
                        <div className={stylesNorm.personenAnzahl}>
                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person1"
                            onChange={onRadioChanged}
                            value="1500"
                            checked={
                              kWhJahr == "1000" ||
                              kWhJahr == "1001" ||
                              kWhJahr == "1500" ||
                              kWhJahr == "2000"
                            }
                          />
                          <label htmlFor="person1" data-person="Ein Person">
                            <i className="fas fa-male" />
                          </label>

                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person2"
                            onChange={onRadioChanged}
                            value="2500"
                            checked={
                              kWhJahr == "2001" ||
                              kWhJahr == "2500" ||
                              kWhJahr == "3000"
                            }
                          />
                          <label htmlFor="person2" data-person="2 Personen">
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                          </label>

                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person3"
                            value="3500"
                            onChange={onRadioChanged}
                            checked={
                              kWhJahr == "3001" ||
                              kWhJahr == "3500" ||
                              kWhJahr == "4000"
                            }
                          />
                          <label htmlFor="person3" data-person="3 Personen">
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                          </label>

                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person4"
                            value="4500"
                            onChange={onRadioChanged}
                            checked={
                              kWhJahr == "4001" ||
                              kWhJahr == "4500" ||
                              kWhJahr == "5000"
                            }
                          />
                          <label htmlFor="person4" data-person="4 Personen">
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                          </label>

                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person5"
                            onChange={onRadioChanged}
                            value="5500"
                            checked={
                              kWhJahr == "5001" ||
                              kWhJahr == "5500" ||
                              kWhJahr == "6000"
                            }
                          />
                          <label htmlFor="person5" data-person="5 Personen">
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                          </label>

                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person6"
                            value="6500"
                            onChange={onRadioChanged}
                            checked={
                              kWhJahr == "6001" ||
                              kWhJahr == "6500" ||
                              kWhJahr == "7000"
                            }
                          />
                          <label htmlFor="person6" data-person="6 Personen">
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                            <i className="fas fa-male" />
                          </label>
                        </div>
                        <div className={stylesNorm.batteryFrame}>
                          <div className={stylesNorm.battery}>
                            <div className={stylesNorm.Rahmen}>
                              <div className={stylesNorm.filling}>
                                <div
                                  style={
                                    kWhJahr > 7200
                                      ? { height: "100%" }
                                      : (battery == 1 && {
                                          height: "10%",
                                          borderRadius: "0 0 6px 6px",
                                        }) ||
                                        (battery == 2 && {
                                          height: "52%",
                                          borderRadius: "0 0 6px 6px",
                                        }) ||
                                        (battery == 3 && { height: "100%" })
                                  }
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className={stylesNorm.range}>
                            <div className={stylesNorm.rangeInput}>
                              <input
                                type="range"
                                min={1}
                                max={3}
                                value={kWhJahr > 7200 ? 3 : battery}
                                onChange={(e) => {
                                  setBattery(e.target.value)

                                  if (batteryRef.current == 3) {
                                    if (e.target.value == 2) {
                                      setkWhJahr(parseFloat(kWhJahr) - 500)
                                    }
                                  }

                                  if (batteryRef.current == 2) {
                                    if (e.target.value == 3) {
                                      setkWhJahr(parseFloat(kWhJahr) + 500)
                                    }

                                    if (e.target.value == 1) {
                                      setkWhJahr(parseFloat(kWhJahr) - 499)
                                    }
                                  }

                                  if (batteryRef.current == 1) {
                                    if (e.target.value == 2) {
                                      setkWhJahr(parseFloat(kWhJahr) + 499)
                                    }
                                  }

                                  if (e.target.value == 1) {
                                    setBatteryValue(parseFloat(-499))
                                    batteryRef.current = 1
                                  }

                                  if (e.target.value == 2) {
                                    setBatteryValue(parseFloat(+0))
                                    batteryRef.current = 2
                                  }

                                  if (e.target.value == 3) {
                                    setBatteryValue(parseFloat(+500))
                                    batteryRef.current = 3
                                  }
                                }}
                              />
                            </div>
                            <div
                              className={stylesNorm.rangeTxt}
                              style={
                                kWhJahr > 7200
                                  ? { top: "7%" }
                                  : (battery == 1 && { top: "77%" }) ||
                                    (battery == 2 && { top: "41%" }) ||
                                    (battery == 3 && { top: "7%" })
                              }
                            >
                              <div
                                data-verbrauchrange={
                                  kWhJahr > 7200
                                    ? "Schwer"
                                    : (battery == 1 && "Niedrig") ||
                                      (battery == 2 && "Normal") ||
                                      (battery == 3 && "Schwer")
                                }
                              ></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {produktTyp && kundentyp && produktTyp == "gas" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "tween", duration: 0.5 }}
                        className={stylesNorm.kwhAuswahlGas}
                        style={
                          kundentyp == "private" && produktTyp == "gas"
                            ? {
                                transform: "translateY(0)",
                                filter: "grayscale(0)",
                                pointerEvents: "all",
                              }
                            : {
                                transform: "translateY(0)",
                                filter: "grayscale(1)",
                                pointerEvents: "none",
                              }
                        }
                      >
                        <div className={stylesNorm.personenAnzahl2}>
                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person1"
                            onChange={onRadioChanged}
                            value="6000"
                            checked={
                              kWhJahr == "4000" ||
                              kWhJahr == "6000" ||
                              kWhJahr == "8000"
                            }
                          />
                          <label htmlFor="person1" data-person="50m²">
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon}
                            />
                          </label>

                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person2"
                            onChange={onRadioChanged}
                            value="12000"
                            checked={
                              kWhJahr == "10000" ||
                              kWhJahr == "12000" ||
                              kWhJahr == "14000"
                            }
                          />
                          <label
                            htmlFor="person2"
                            data-person="100m²"
                            className={stylesNorm.gasLevel2}
                          >
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon}
                            />
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon2}
                            />
                          </label>

                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person3"
                            value="20000"
                            onChange={onRadioChanged}
                            checked={
                              kWhJahr == "18000" ||
                              kWhJahr == "20000" ||
                              kWhJahr == "22000"
                            }
                          />
                          <label htmlFor="person3" data-person="150m²">
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon}
                            />
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon2}
                            />
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon3}
                            />
                          </label>

                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person4"
                            value="25000"
                            onChange={onRadioChanged}
                            checked={
                              kWhJahr == "23000" ||
                              kWhJahr == "25000" ||
                              kWhJahr == "27000"
                            }
                          />
                          <label
                            htmlFor="person4"
                            data-person="200m²"
                            className={stylesNorm.person4Gas}
                          >
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon}
                            />
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon2}
                            />
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon3}
                            />{" "}
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon4}
                            />
                          </label>

                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person5"
                            onChange={onRadioChanged}
                            value="30000"
                            checked={
                              kWhJahr == "28000" ||
                              kWhJahr == "30000" ||
                              kWhJahr == "32000"
                            }
                          />
                          <label
                            htmlFor="person5"
                            data-person="250m²"
                            className={stylesNorm.person5Gas}
                          >
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon}
                            />
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon2}
                            />
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon3}
                            />{" "}
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon4}
                            />
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon5}
                            />
                          </label>

                          <input
                            type="radio"
                            name="personenAnzahl"
                            id="person6"
                            value="40000"
                            onChange={onRadioChanged}
                            checked={
                              kWhJahr == "38000" ||
                              kWhJahr == "40000" ||
                              kWhJahr == "42000"
                            }
                          />
                          <label
                            htmlFor="person6"
                            data-person="350m²"
                            className={stylesNorm.person6Gas}
                          >
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon}
                            />{" "}
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon2}
                            />{" "}
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon3}
                            />{" "}
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon4}
                            />{" "}
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon5}
                            />{" "}
                            <LocalFireDepartmentIcon
                              className={stylesNorm.FireIcon6}
                            />
                          </label>
                        </div>
                        <div className={stylesNorm.batteryFrame}>
                          {kWhJahr < 45000 && (
                            <>
                              {batteryRef.current == 1 && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={stylesNorm.FireBlock}
                                >
                                  {themer == "light" ? (
                                    <i className="fas fa-fire fire1" />
                                  ) : (
                                    <i className="fas fa-fire fire1Dark" />
                                  )}
                                </motion.div>
                              )}

                              {batteryRef.current == 2 && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={stylesNorm.FireBlock}
                                >
                                  {themer == "light" ? (
                                    <>
                                      <i className="fas fa-fire fire1" />
                                      <i className="fas fa-fire fire2" />
                                    </>
                                  ) : (
                                    <>
                                      <i className="fas fa-fire fire1Dark" />
                                      <i className="fas fa-fire fire2Dark" />
                                    </>
                                  )}
                                </motion.div>
                              )}

                              {batteryRef.current == 3 && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={stylesNorm.FireBlock}
                                >
                                  <i className="fas fa-fire fire1" />
                                  <i className="fas fa-fire fire2" />
                                  <i className="fas fa-fire fire3" />
                                </motion.div>
                              )}

                              {kWhJahr > 45000 && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={stylesNorm.FireBlock}
                                >
                                  <i className="fas fa-fire fire1" />
                                  <i className="fas fa-fire fire2" />
                                  <i className="fas fa-fire fire3" />
                                </motion.div>
                              )}
                            </>
                          )}

                          {kWhJahr > 45000 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={stylesNorm.FireBlock}
                            >
                              <i className="fas fa-fire fire1" />
                              <i className="fas fa-fire fire2" />
                              <i className="fas fa-fire fire3" />
                            </motion.div>
                          )}

                          <div className={stylesNorm.range}>
                            <div className={stylesNorm.rangeInput}>
                              <input
                                type="range"
                                min={1}
                                max={3}
                                value={kWhJahr > 45000 ? 3 : battery}
                                onChange={(e) => {
                                  setBattery(e.target.value)

                                  if (batteryRef.current == 3) {
                                    if (e.target.value == 2) {
                                      setkWhJahr(parseFloat(kWhJahr) - 2000)
                                    }
                                  }

                                  if (batteryRef.current == 2) {
                                    if (e.target.value == 3) {
                                      setkWhJahr(parseFloat(kWhJahr) + 2000)
                                    }

                                    if (e.target.value == 1) {
                                      setkWhJahr(parseFloat(kWhJahr) - 2000)
                                    }
                                  }

                                  if (batteryRef.current == 1) {
                                    if (e.target.value == 2) {
                                      setkWhJahr(parseFloat(kWhJahr) + 2000)
                                    }
                                  }

                                  if (e.target.value == 1) {
                                    setBatteryValue(parseFloat(-2000))
                                    batteryRef.current = 1
                                  }

                                  if (e.target.value == 2) {
                                    setBatteryValue(parseFloat(+0))
                                    batteryRef.current = 2
                                  }

                                  if (e.target.value == 3) {
                                    setBatteryValue(parseFloat(+2000))
                                    batteryRef.current = 3
                                  }
                                }}
                              />
                            </div>
                            <div
                              className={stylesNorm.rangeTxt}
                              style={
                                kWhJahr > 45000
                                  ? { top: "7%" }
                                  : (battery == 1 && { top: "81%" }) ||
                                    (battery == 2 && { top: "41%" }) ||
                                    (battery == 3 && { top: "2%" })
                              }
                            >
                              <div
                                data-verbrauchrange={
                                  kWhJahr > 45000
                                    ? "Schwer"
                                    : (battery == 1 && "Niedrig") ||
                                      (battery == 2 && "Normal") ||
                                      (battery == 3 && "Schwer")
                                }
                              ></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div></div>
                </div>
                <div className={stylesNorm.RangeGrid}>
                  {kundentyp == "private" && produktTyp == "electric" && (
                    <div className={stylesNorm.kWhRange}>
                      <div className={stylesNorm.KwhRangeInput}>
                        <input
                          type="range"
                          name="kwhJahrRange"
                          step="500"
                          min={1000}
                          max={15000}
                          value={kWhJahr}
                          onChange={(e) => setkWhJahr(e.target.value)}
                        />
                      </div>
                      <div className={stylesNorm.kwhField}>
                        {themer == "light" ? (
                          <NewTextFieldLight
                            error={kwhJahrErr == true ? true : false}
                            label={
                              <div style={{ display: "flex", gap: 5 }}>
                                <p>kWh pro Jahr</p>
                                <Today
                                  style={{
                                    color: "#a82d00",
                                    transform: "scale(1.3) translateY(0px)",
                                  }}
                                />
                              </div>
                            }
                            type="text"
                            name="kwhJahrInput"
                            value={kWhJahr}
                            onChange={(e) => setkWhJahr(e.target.value)}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <ElectricalServices
                                    sx={{
                                      color: "#c01607",
                                      transform: "scale(1.3) translateY(0px)",
                                      filter: "brightness(0.8) ",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <p
                                    style={{
                                      color: "#c01607",
                                      transform: "scale(1) translateY(0px)",
                                      filter: "brightness(0.8) ",
                                    }}
                                  >
                                    kWh
                                  </p>
                                </InputAdornment>
                              ),
                            }}
                          />
                        ) : (
                          <NewTextField
                            error={kwhJahrErr == true ? true : false}
                            label={
                              <div style={{ display: "flex", gap: 5 }}>
                                <p>kWh pro Jahr</p>
                                <Today
                                  style={{
                                    color: "#aa2d00",
                                    transform: "scale(1.3) translateY(0px)",
                                  }}
                                />
                              </div>
                            }
                            type="text"
                            name="kwhJahrInput"
                            value={kWhJahr}
                            onChange={(e) => setkWhJahr(e.target.value)}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <ElectricalServices
                                    sx={{
                                      color: "#ffa382",
                                      transform: "scale(1.3) translateY(0px)",
                                      filter: "brightness(0.8) ",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <p
                                    style={{
                                      color: "#ffa382",
                                      transform: "scale(1) translateY(0px)",
                                      filter: "brightness(0.8) ",
                                    }}
                                  >
                                    kWh
                                  </p>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {/* #range2 test*/}
                  {kundentyp == "company" && produktTyp == "electric" && (
                    <div className={stylesNorm.kWhRange}>
                      <div className={stylesNorm.KwhRangeInput}>
                        <input
                          type="range"
                          name="kwhJahrRange"
                          step="1000"
                          min={5000}
                          max={250000}
                          value={kWhJahr}
                          onChange={(e) => setkWhJahr(e.target.value)}
                        />
                      </div>
                      <div className={stylesNorm.kwhField}>
                        <NewTextField
                          error={kwhJahrErr == true ? true : false}
                          label={
                            <div style={{ display: "flex", gap: 5 }}>
                              <p>kWh pro Jahr</p>
                              <Today
                                style={{
                                  color: "#aa2d00",
                                  transform: "scale(1.3) translateY(0px)",
                                }}
                              />
                            </div>
                          }
                          type="text"
                          name="kwhJahrInput"
                          value={kWhJahr}
                          onChange={(e) => setkWhJahr(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ElectricalServices
                                  sx={{
                                    color: "#ffa382",
                                    transform: "scale(1.3) translateY(0px)",
                                    filter: "brightness(0.8) ",
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <p
                                  style={{
                                    color: "#ffa382",
                                    transform: "scale(1) translateY(0px)",
                                    filter: "brightness(0.8) ",
                                  }}
                                >
                                  kWh
                                </p>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* #r1 gas Range */}
                  {kundentyp == "private" && produktTyp == "gas" && (
                    <div className={stylesNorm.kWhRange}>
                      <div className={stylesNorm.KwhRangeInput}>
                        <input
                          type="range"
                          name="kwhJahrRange"
                          step="1000"
                          min={3000}
                          max={60000}
                          value={kWhJahr}
                          onChange={(e) => setkWhJahr(e.target.value)}
                        />
                      </div>
                      <div className={stylesNorm.kwhField}>
                        <NewTextField
                          error={kwhJahrErr == true ? true : false}
                          label={
                            <div style={{ display: "flex", gap: 5 }}>
                              <p>kWh pro Jahr</p>
                              <Today
                                style={{
                                  color: "#aa2d00",
                                  transform: "scale(1.3) translateY(0px)",
                                }}
                              />
                            </div>
                          }
                          type="text"
                          name="kwhJahrInput"
                          value={kWhJahr}
                          onChange={(e) => setkWhJahr(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {produktTyp == "electric" ? (
                                  <ElectricalServices
                                    sx={{
                                      color: "#ffa382",
                                      transform: "scale(1.3) translateY(0px)",
                                      filter: "brightness(0.8) ",
                                    }}
                                  />
                                ) : (
                                  <LocalFireDepartmentIcon
                                    sx={{
                                      color: "orange",
                                      transform: "scale(1.3) translateY(0px)",
                                      filter: "brightness(0.8)",
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <p
                                  style={{
                                    color: "#ffa382",
                                    transform: "scale(1) translateY(0px)",
                                    filter: "brightness(0.8) ",
                                  }}
                                >
                                  kWh
                                </p>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* #r2 gas */}
                  {kundentyp == "company" && produktTyp == "gas" && (
                    <div className={stylesNorm.kWhRange}>
                      <div className={stylesNorm.KwhRangeInput}>
                        <input
                          type="range"
                          name="kwhJahrRange"
                          step="1000"
                          min={5000}
                          max={250000}
                          value={kWhJahr}
                          onChange={(e) => setkWhJahr(e.target.value)}
                        />
                      </div>
                      <div className={stylesNorm.kwhField}>
                        <NewTextField
                          error={kwhJahrErr == true ? true : false}
                          label={
                            <div style={{ display: "flex", gap: 5 }}>
                              <p>
                                {kwhJahrErr == true
                                  ? `kWh pro Jahr`
                                  : `Keine Eingabe...`}
                              </p>
                              {kwhJahrErr == false && (
                                <Today
                                  style={{
                                    color: "#aa2d00",
                                    transform: "scale(1.3) translateY(0px)",
                                  }}
                                />
                              )}
                            </div>
                          }
                          type="text"
                          name="kwhJahrInput"
                          value={kWhJahr}
                          onChange={(e) => setkWhJahr(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {produktTyp == "electric" ? (
                                  <ElectricalServices
                                    sx={{
                                      color: "#ffa382",
                                      transform: "scale(1.3) translateY(0px)",
                                      filter: "brightness(0.8) ",
                                    }}
                                  />
                                ) : (
                                  <LocalFireDepartmentIcon
                                    sx={{
                                      color: "orange",
                                      transform: "scale(1.3) translateY(0px)",
                                      filter: "brightness(0.8) ",
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <p
                                  style={{
                                    color: "#ffa382",
                                    transform: "scale(1) translateY(0px)",
                                    filter: "brightness(0.8) ",
                                  }}
                                >
                                  kWh
                                </p>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={stylesNorm.MonateAuswahl}
                  data-title={"Vertragsdauer..."}
                  style={
                    TarifResponse
                      ? { pointerEvents: "all" }
                      : { pointerEvents: "none" }
                  }
                >
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="kundentyp"
                      name="kundentyp"
                      className={stylesNorm.kundenradio}
                    >
                      <FormControlLabel
                        value="all"
                        control={
                          <Radio
                            checked={monthAuswahl == "all"}
                            onChange={(e) => {
                              UpdateFilterCard(TarifResponse)
                              UpdateMonthAuswahl("all")
                            }}
                            sx={
                              themer == "light"
                                ? {
                                    color: "#aa2d00",

                                    "&.Mui-checked": {
                                      color: "#aa2d00",
                                    },
                                  }
                                : {
                                    color: "#aa2d00",

                                    "&.Mui-checked": {
                                      color: "#ffa382",
                                    },
                                  }
                            }
                          />
                        }
                        label={
                          <div
                            style={{
                              display: "flex",
                              gap: 3,
                              color: "#ffa382",
                            }}
                          >
                            <FormatListBulletedIcon
                              sx={
                                themer == "light"
                                  ? {
                                      filter: "grayscale(0.3)",
                                      color: "#a82d00",
                                    }
                                  : { filter: "grayscale(0.3)", color: "white" }
                              }
                            />
                            <p
                              style={
                                themer == "light"
                                  ? { color: "#a82d00" }
                                  : { color: "#ffa382" }
                              }
                            >
                              Alle
                            </p>
                          </div>
                        }
                      />
                      <FormControlLabel
                        value="company"
                        control={
                          <Radio
                            checked={monthAuswahl == "12month"}
                            onChange={async (e) => {
                              const filter = await TarifResponse.filter(
                                (cards) => cards.optTerm == "12"
                              )

                              UpdateMonthAuswahl("12month")
                              UpdateFilterCard(filter)
                            }}
                            sx={
                              themer == "light"
                                ? {
                                    color: "#aa2d00",

                                    "&.Mui-checked": {
                                      color: "#aa2d00",
                                    },
                                  }
                                : {
                                    color: "#aa2d00",

                                    "&.Mui-checked": {
                                      color: "#ffa382",
                                    },
                                  }
                            }
                          />
                        }
                        label={
                          <div
                            style={{
                              display: "flex",
                              gap: 3,
                              color: "#ffa382",
                            }}
                          >
                            <UnfoldLessIcon
                              sx={
                                themer == "light"
                                  ? {
                                      filter: "grayscale(0.3)",
                                      color: "#a82d00",
                                    }
                                  : { filter: "grayscale(0.3)", color: "white" }
                              }
                            />
                            <p
                              style={
                                themer == "light"
                                  ? { color: "#a82d00" }
                                  : { color: "#ffa382" }
                              }
                            >
                              12 Monate
                            </p>
                          </div>
                        }
                      />
                      <FormControlLabel
                        value="company"
                        control={
                          <Radio
                            checked={monthAuswahl == "24month"}
                            onChange={async (e) => {
                              const filter = await TarifResponse.filter(
                                (cards) => cards.optTerm == "24"
                              )

                              UpdateMonthAuswahl("24month")
                              UpdateFilterCard(filter)
                            }}
                            sx={
                              themer == "light"
                                ? {
                                    color: "#aa2d00",

                                    "&.Mui-checked": {
                                      color: "#aa2d00",
                                    },
                                  }
                                : {
                                    color: "#aa2d00",

                                    "&.Mui-checked": {
                                      color: "#ffa382",
                                    },
                                  }
                            }
                          />
                        }
                        label={
                          <div
                            style={{
                              display: "flex",
                              gap: 3,
                              color: "#ffa382",
                            }}
                          >
                            <UnfoldMoreIcon
                              sx={
                                themer == "light"
                                  ? {
                                      filter: "grayscale(0.3)",
                                      color: "#a82d00",
                                    }
                                  : { filter: "grayscale(0.3)", color: "white" }
                              }
                            />
                            <p
                              style={
                                themer == "light"
                                  ? { color: "#a82d00" }
                                  : { color: "#ffa382" }
                              }
                            >
                              24 Monate
                            </p>
                          </div>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div
                  className={stylesNorm.MonateAuswahl}
                  data-title={"Produktauswahl..."}
                >
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="kundentyp"
                      name="kundentyp"
                      className={stylesNorm.produktradio}
                    >
                      <FormControlLabel
                        value="electric"
                        control={
                          <Radio
                            checked={produktTyp == "electric"}
                            onChange={(e) => {
                              setProduktTyp(e.target.value)
                              kundentyp == "private"
                                ? setkWhJahr(2500)
                                : setkWhJahr(20000)

                              setTarifResponse("")
                              const kwh = kundentyp == "private" ? 2500 : 20000
                              setkWhJahr(kwh)
                              setProduktTyp(e.target.value)

                              const postdata = {
                                plz: new String(ort).slice(0, 5),
                                kwhAuswahl: kwh,
                                produktTyp: "electric",
                                kundenTyp: kundentyp,
                                battery: battery,
                              }

                              TarifRequest(postdata, "place electric")
                            }}
                            sx={{
                              color: "#aa2d00",

                              "&.Mui-checked": {
                                color: "yellow",
                                filter: "drop-shadow(0px 1px 1px black)",
                              },
                            }}
                          />
                        }
                        label={
                          <p
                            style={{
                              display: "flex",
                              gap: 3,
                              alignItems: `center`,
                            }}
                          >
                            <BoltIcon
                              sx={{
                                color: "yellow",
                                transform: "scale(1.3)",

                                stroke: "#a82d00aa",
                                strokeWidth: 1,
                              }}
                            />
                            <p>Strom</p>
                          </p>
                        }
                      />
                      <FormControlLabel
                        value="gas"
                        control={
                          <Radio
                            checked={produktTyp == "gas"}
                            onChange={(e) => {
                              setProduktTyp(e.target.value)
                              kundentyp == "private"
                                ? setkWhJahr(6000)
                                : setkWhJahr(30000)

                              setTarifResponse("")
                              const kwh = kundentyp == "private" ? 6000 : 30000
                              setkWhJahr(kwh)
                              const postdata = {
                                plz: new String(ort).slice(0, 5),
                                kwhAuswahl: kwh,
                                produktTyp: "gas",
                                kundenTyp: kundentyp,
                                battery: battery,
                              }

                              TarifRequest(postdata, "place ort")
                            }}
                            sx={{
                              color: "#aa2d00",

                              "&.Mui-checked": {
                                color: "orange",
                                filter: "drop-shadow(0px 1px 1px black)",
                              },
                            }}
                          />
                        }
                        label={
                          <p style={{ display: "flex", gap: 3 }}>
                            <LocalFireDepartmentIcon sx={{ color: "orange" }} />
                            <p>Gas</p>
                          </p>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </motion.div>
              <HorizontalScroll
                reverseScroll={true}
                style={{
                  width: "100%",
                }}
                pageLock={false}
              >
                {!TarifResponse && (
                  <motion.div
                    initial={
                      firstLoad == false
                        ? { opacity: 0, y: 200 }
                        : { opacity: 1, y: 0 }
                    }
                    className={stylesNorm.cardsloader}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: { delay: 0.8 },
                    }}
                    exit={{ opacity: 0, y: 100, transition: { delay: 0 } }}
                  >
                    <div
                      className={
                        themer == "light"
                          ? stylesNorm.card
                          : stylesNorm.cardDark
                      }
                    >
                      <div
                        className={stylesNorm.svglogo}
                        dangerouslySetInnerHTML={{
                          __html: "test",
                        }}
                      ></div>
                      <span>
                        <p>Testpaket</p>
                        <div>12 Monate</div>
                      </span>
                      <div className={stylesNorm.kwhkosten}>
                        <fieldset>
                          <legend>{`kWh Kosten : ${kWhJahr} kwh/Jahr`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.grundkosten}>
                        <fieldset>
                          <legend>{`Grundkosten...`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.Total}>
                        <div className={stylesNorm.totalPrice}>1000 €</div>
                        <div className={stylesNorm.Terms}></div>
                      </div>
                      <div className={stylesNorm.TotalMonat}>
                        <h1>00.00 €</h1>
                      </div>
                      <div className={stylesNorm.btnCard}>
                        <Button
                          startIcon={
                            <CircularProgress size={25} color="success" />
                          }
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,

                            "&.MuiButton-outlined": {
                              color: "#ffa382",
                              border: "none",
                            },
                          }}
                          variant="outlined"
                        >
                          Lädt..
                        </Button>
                      </div>
                    </div>
                    <div
                      className={
                        themer == "light"
                          ? stylesNorm.card
                          : stylesNorm.cardDark
                      }
                    >
                      <div
                        className={stylesNorm.svglogo}
                        dangerouslySetInnerHTML={{
                          __html: "test",
                        }}
                      ></div>
                      <span>
                        <p>Testpaket</p>
                        <div>12 Monate</div>
                      </span>
                      <div className={stylesNorm.kwhkosten}>
                        <fieldset>
                          <legend>{`kWh Kosten : ${kWhJahr} kwh/Jahr`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.grundkosten}>
                        <fieldset>
                          <legend>{`Grundkosten...`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.Total}>
                        <div className={stylesNorm.totalPrice}>1000 €</div>
                        <div className={stylesNorm.Terms}></div>
                      </div>
                      <div className={stylesNorm.TotalMonat}>
                        <h1>00.00 €</h1>
                      </div>
                      <div className={stylesNorm.btnCard}>
                        <Button
                          startIcon={
                            <CircularProgress size={25} color="success" />
                          }
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,

                            "&.MuiButton-outlined": {
                              color: "#ffa382",
                              border: "none",
                            },
                          }}
                          variant="outlined"
                        >
                          Lädt..
                        </Button>
                      </div>
                    </div>
                    <div
                      className={
                        themer == "light"
                          ? stylesNorm.card
                          : stylesNorm.cardDark
                      }
                    >
                      <div
                        className={stylesNorm.svglogo}
                        dangerouslySetInnerHTML={{
                          __html: "test",
                        }}
                      ></div>
                      <span>
                        <p>Testpaket</p>
                        <div>12 Monate</div>
                      </span>
                      <div className={stylesNorm.kwhkosten}>
                        <fieldset>
                          <legend>{`kWh Kosten : ${kWhJahr} kwh/Jahr`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.grundkosten}>
                        <fieldset>
                          <legend>{`Grundkosten...`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.Total}>
                        <div className={stylesNorm.totalPrice}>1000 €</div>
                        <div className={stylesNorm.Terms}></div>
                      </div>
                      <div className={stylesNorm.TotalMonat}>
                        <h1>00.00 €</h1>
                      </div>
                      <div className={stylesNorm.btnCard}>
                        <Button
                          startIcon={
                            <CircularProgress size={25} color="success" />
                          }
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,

                            "&.MuiButton-outlined": {
                              color: "#ffa382",
                              border: "none",
                            },
                          }}
                          variant="outlined"
                        >
                          Lädt..
                        </Button>
                      </div>
                    </div>
                    <div
                      className={
                        themer == "light"
                          ? stylesNorm.card
                          : stylesNorm.cardDark
                      }
                    >
                      <div
                        className={stylesNorm.svglogo}
                        dangerouslySetInnerHTML={{
                          __html: "test",
                        }}
                      ></div>
                      <span>
                        <p>Testpaket</p>
                        <div>12 Monate</div>
                      </span>
                      <div className={stylesNorm.kwhkosten}>
                        <fieldset>
                          <legend>{`kWh Kosten : ${kWhJahr} kwh/Jahr`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.grundkosten}>
                        <fieldset>
                          <legend>{`Grundkosten...`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.Total}>
                        <div className={stylesNorm.totalPrice}>1000 €</div>
                        <div className={stylesNorm.Terms}></div>
                      </div>
                      <div className={stylesNorm.TotalMonat}>
                        <h1>00.00 €</h1>
                      </div>
                      <div className={stylesNorm.btnCard}>
                        <Button
                          startIcon={
                            <CircularProgress size={25} color="success" />
                          }
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,

                            "&.MuiButton-outlined": {
                              color: "#ffa382",
                              border: "none",
                            },
                          }}
                          variant="outlined"
                        >
                          Lädt..
                        </Button>
                      </div>
                    </div>
                    <div
                      className={
                        themer == "light"
                          ? stylesNorm.card
                          : stylesNorm.cardDark
                      }
                    >
                      <div
                        className={stylesNorm.svglogo}
                        dangerouslySetInnerHTML={{
                          __html: "test",
                        }}
                      ></div>
                      <span>
                        <p>Testpaket</p>
                        <div>12 Monate</div>
                      </span>
                      <div className={stylesNorm.kwhkosten}>
                        <fieldset>
                          <legend>{`kWh Kosten : ${kWhJahr} kwh/Jahr`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.grundkosten}>
                        <fieldset>
                          <legend>{`Grundkosten...`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.Total}>
                        <div className={stylesNorm.totalPrice}>1000 €</div>
                        <div className={stylesNorm.Terms}></div>
                      </div>
                      <div className={stylesNorm.TotalMonat}>
                        <h1>00.00 €</h1>
                      </div>
                      <div className={stylesNorm.btnCard}>
                        <Button
                          startIcon={
                            <CircularProgress size={25} color="success" />
                          }
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,

                            "&.MuiButton-outlined": {
                              color: "#ffa382",
                              border: "none",
                            },
                          }}
                          variant="outlined"
                        >
                          Lädt..
                        </Button>
                      </div>
                    </div>
                    <div
                      className={
                        themer == "light"
                          ? stylesNorm.card
                          : stylesNorm.cardDark
                      }
                    >
                      <div
                        className={stylesNorm.svglogo}
                        dangerouslySetInnerHTML={{
                          __html: "test",
                        }}
                      ></div>
                      <span>
                        <p>Testpaket</p>
                        <div>12 Monate</div>
                      </span>
                      <div className={stylesNorm.kwhkosten}>
                        <fieldset>
                          <legend>{`kWh Kosten : ${kWhJahr} kwh/Jahr`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.grundkosten}>
                        <fieldset>
                          <legend>{`Grundkosten...`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.Total}>
                        <div className={stylesNorm.totalPrice}>1000 €</div>
                        <div className={stylesNorm.Terms}></div>
                      </div>
                      <div className={stylesNorm.TotalMonat}>
                        <h1>00.00 €</h1>
                      </div>
                      <div className={stylesNorm.btnCard}>
                        <Button
                          startIcon={
                            <CircularProgress size={25} color="success" />
                          }
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,

                            "&.MuiButton-outlined": {
                              color: "#ffa382",
                              border: "none",
                            },
                          }}
                          variant="outlined"
                        >
                          Lädt..
                        </Button>
                      </div>
                    </div>
                    <div
                      className={
                        themer == "light"
                          ? stylesNorm.card
                          : stylesNorm.cardDark
                      }
                    >
                      <div
                        className={stylesNorm.svglogo}
                        dangerouslySetInnerHTML={{
                          __html: "test",
                        }}
                      ></div>
                      <span>
                        <p>Testpaket</p>
                        <div>12 Monate</div>
                      </span>
                      <div className={stylesNorm.kwhkosten}>
                        <fieldset>
                          <legend>{`kWh Kosten : ${kWhJahr} kwh/Jahr`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.grundkosten}>
                        <fieldset>
                          <legend>{`Grundkosten...`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.Total}>
                        <div className={stylesNorm.totalPrice}>1000 €</div>
                        <div className={stylesNorm.Terms}></div>
                      </div>
                      <div className={stylesNorm.TotalMonat}>
                        <h1>00.00 €</h1>
                      </div>
                      <div className={stylesNorm.btnCard}>
                        <Button
                          startIcon={
                            <CircularProgress size={25} color="success" />
                          }
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,

                            "&.MuiButton-outlined": {
                              color: "#ffa382",
                              border: "none",
                            },
                          }}
                          variant="outlined"
                        >
                          Lädt..
                        </Button>
                      </div>
                    </div>
                    <div
                      className={
                        themer == "light"
                          ? stylesNorm.card
                          : stylesNorm.cardDark
                      }
                    >
                      <div
                        className={stylesNorm.svglogo}
                        dangerouslySetInnerHTML={{
                          __html: "test",
                        }}
                      ></div>
                      <span>
                        <p>Testpaket</p>
                        <div>12 Monate</div>
                      </span>
                      <div className={stylesNorm.kwhkosten}>
                        <fieldset>
                          <legend>{`kWh Kosten : ${kWhJahr} kwh/Jahr`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.grundkosten}>
                        <fieldset>
                          <legend>{`Grundkosten...`}</legend>
                          <div className={stylesNorm.JahresPreis}>100.00€</div>
                          <div className={stylesNorm.durch}>: 12 =</div>
                          <div className={stylesNorm.MonatsPreis}>100.00€</div>
                        </fieldset>
                      </div>
                      <div className={stylesNorm.Total}>
                        <div className={stylesNorm.totalPrice}>1000 €</div>
                        <div className={stylesNorm.Terms}></div>
                      </div>
                      <div className={stylesNorm.TotalMonat}>
                        <h1>00.00 €</h1>
                      </div>
                      <div className={stylesNorm.btnCard}>
                        <Button
                          startIcon={
                            <CircularProgress size={25} color="success" />
                          }
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,

                            "&.MuiButton-outlined": {
                              color: "#ffa382",
                              border: "none",
                            },
                          }}
                          variant="outlined"
                        >
                          Lädt..
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {TarifResponse && filterCard && (
                  <motion.div
                    initial={{ opacity: 1, x: 0, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ ease: "easeOut", duration: 0.7, delay: 0.6 }}
                    viewport={{ once: false, amount: 0.2 }}
                    className={
                      themer == "light"
                        ? stylesNorm.cards
                        : stylesNorm.cardsDark
                    }
                  >
                    {filterCard.map((card, index) => (
                      <div className={stylesNorm.card} key={card.rateId}>
                        <div className={stylesNorm.profileIcon}>
                          {card.branch == "electric" ? (
                            <BoltIcon className={stylesNorm.strom} />
                          ) : (
                            <LocalFireDepartmentIcon
                              className={stylesNorm.gas}
                            />
                          )}
                        </div>
                        {/*  <div className={stylesNorm.profileIcon}>
                    <BoltIcon className={stylesNorm.strom} />
                    <LocalFireDepartmentIcon className={stylesNorm.gas} />
                  </div> */}
                        <div
                          className={stylesNorm.svglogo}
                          dangerouslySetInnerHTML={{
                            __html: card.providerSVG
                              ? card.providerSVG
                              : card.providerName,
                          }}
                        ></div>
                        <span>
                          <p>{card.rateName}</p>
                          <div>{card.optTerm + ` Monate`}</div>
                        </span>
                        <div className={stylesNorm.kwhkosten}>
                          <fieldset>
                            <legend>{`kWh Kosten : ${kWhJahr} kwh/Jahr`}</legend>
                            <div
                              className={stylesNorm.JahresPreis}
                            >{`${parseFloat((card.workPrice / 100) * kWhJahr)
                              .toFixed(2)
                              .replace(".", ",")}€`}</div>
                            <div className={stylesNorm.durch}>: 12 =</div>
                            <div
                              className={stylesNorm.MonatsPreis}
                            >{`${parseFloat(
                              ((card.workPrice / 100) * kWhJahr) / 12
                            )
                              .toFixed(2)
                              .replace(".", ",")}€`}</div>
                          </fieldset>
                        </div>
                        <div className={stylesNorm.grundkosten}>
                          <fieldset>
                            <legend>{`Grundkosten...`}</legend>
                            <div
                              className={stylesNorm.JahresPreis}
                            >{`${parseFloat(card.basePriceYear)
                              .toFixed(2)
                              .replace(".", ",")}€`}</div>
                            <div className={stylesNorm.durch}>: 12 =</div>
                            <div
                              className={stylesNorm.MonatsPreis}
                            >{`${parseFloat(card.basePriceMonth)
                              .toFixed(2)
                              .replace(".", ",")}€`}</div>
                          </fieldset>
                        </div>
                        <div className={stylesNorm.Total}>
                          <div
                            data-mwst={
                              kundentyp == "company"
                                ? "inkl. Grundpreis ohne MwSt"
                                : "inkl. Grundpreis mit MwSt"
                            }
                            className={stylesNorm.totalPrice}
                          >
                            {`${(
                              (card.workPrice / 100) * kWhJahr +
                              card.basePriceYear
                            )
                              .toFixed(2)
                              .replace(".", ",")} €`}
                            {/* {`${card.totalPrice.toFixed(2).replace(".", ",")}`} */}
                          </div>
                          <div className={stylesNorm.Terms}></div>
                        </div>
                        <div className={stylesNorm.TotalMonat}>
                          <h1
                            data-mwst={
                              kundentyp == "company"
                                ? "/monatlich ohne 19% MwSt"
                                : "/monatlich inkl. 19% MwSt"
                            }
                          >
                            {`${(
                              ((card.workPrice / 100) * kWhJahr +
                                card.basePriceYear) /
                              12
                            )
                              .toFixed(2)
                              .replace(".", ",")} €`}
                          </h1>
                        </div>
                        <div className={stylesNorm.btnCard}>
                          <ThemeProvider theme={theme}>
                            <Button
                              sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 2,

                                "&.MuiButton-outlined": {
                                  color: "#ffa382",
                                  border: "none",
                                },
                              }}
                              variant="outlined"
                              onClick={() => {
                                UpdateMonthAuswahl("all")

                                window.localStorage.setItem(
                                  "cardSelected",
                                  JSON.stringify(card)
                                )

                                sessionStorage.setItem("rateId", card.rateId)
                                sessionStorage.setItem("kwhAuswahl", kWhJahr)
                                setTimeout(() => {
                                  router.push("/formular")
                                }, 500)
                              }}
                            >
                              Auswählen
                            </Button>
                          </ThemeProvider>
                        </div>
                      </div>
                    ))}
                    {filterCard && filterCard.length <= 5 ? (
                      <>
                        <div className={stylesNorm.leereKarten}></div>
                        <div className={stylesNorm.leereKarten}></div>
                        <div className={stylesNorm.leereKarten}></div>
                        <div className={stylesNorm.leereKarten}></div>
                        <div className={stylesNorm.leereKarten}></div>
                      </>
                    ) : (
                      ""
                    )}
                    {/*  <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div>
                <div className={stylesNorm.card}></div> */}
                  </motion.div>
                )}
              </HorizontalScroll>
            </div>
          </section>
          {/*  <section id="produkte"></section>
          <section></section> */}
          <FooterDesktop />
        </div>
      )}
      {filterCard && filterCard.length <= 5 ? (
        <>
          <div className={styles.leereKarten}></div>
          <div className={styles.leereKarten}></div>
          <div className={styles.leereKarten}></div>
          <div className={styles.leereKarten}></div>
          <div className={styles.leereKarten}></div>
        </>
      ) : (
        ""
      )}
      {!sessionAccept && (
        <div className="LoadingWrong">
          <CircularProgress size={40} sx={{ color: "white", marginRight: 2 }} />{" "}
          <b> Loading ...</b>
        </div>
      )}
    </>
  )
}
