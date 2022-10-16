import stylesNorm from "../../styles/Norm/MainNorm.module.scss"
import AutoCompleteOrt from "../AutoCompleteOrt"
import AutoCompleteOrtlight from "../AutoCompleteOrtlight"
import { motion } from "framer-motion"
import Orte from "../../public/ort.json"
import { useState } from "react"
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
import {
  ShareLocation,
  AccountBox,
  Business,
  ElectricalServices,
  Today,
} from "@mui/icons-material"
import BoltIcon from "@mui/icons-material/Bolt"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined"
import { useRef } from "react"
import { ThemeContext } from "../../context/DataContext"
import { useContext } from "react"
import { NewTextField, NewTextFieldLight } from "../MaterialUI"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useRouter } from "next/router"
import FooterDesktop from "./FooterDesktop"

const theme = createTheme({
  palette: {
    test: {
      light: "white",
      main: "white",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "white",
    },
    testLight: {
      light: "#5e0a03",
      main: "#5e0a03",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#5e0a03",
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

const MainNorm = ({ kwhJahr, setkwhJahr }) => {
  const newOrt = Orte.map((e) => e.city)
  const [ort, setOrt] = useState("")
  const [kundentyp, setKundenTyp] = useState("private")
  const [produktTyp, setProduktTyp] = useState("electric")

  const [battery, setBattery] = useState(2)
  const [batteryValue, setBatteryValue] = useState(0)
  const batteryRef = useRef(2)
  const [themer, UpdateThemer] = useContext(ThemeContext)
  const [loader, setLoader] = useState(false)

  const [kwhJahrErr, setkWhJahrErr] = useState(false)
  const [ortErr, setOrtErr] = useState(false)
  const router = useRouter()

  const onRadioChanged = (e) => {
    console.log(e.target.value)
    setkwhJahr(e.target.value)
  }

  /* Request */
  const Anfrage = async () => {
    console.log(ort, kundentyp, produktTyp, kwhJahr)
    sessionStorage.setItem("plz", new String(ort).slice(0, 5))
    sessionStorage.setItem("ortschaft", ort)
    sessionStorage.setItem("produktTyp", produktTyp)
    sessionStorage.setItem("kundenTyp", kundentyp)
    sessionStorage.setItem("kwhAuswahl", kwhJahr)
    sessionStorage.setItem("battery", battery)
    sessionStorage.setItem("logged", true)
    window.localStorage.setItem("DataResponse", "test")
    window.localStorage.removeItem("DataResponse")

    kwhJahr == null || kwhJahr == ""
      ? setkWhJahrErr(true)
      : setkWhJahrErr(false)

    if (ort == "" || ort == null) {
      setOrtErr(true)
    } else {
      setOrtErr(false)

      if (kwhJahr == "" || kwhJahr == null) {
        setkWhJahrErr(true)
      } else {
        setkWhJahrErr(false)

        setTimeout(() => {
          setLoader(true)
        }, 250)

        /* #SessionStorage */

        /*   window.localStorage.setItem("ortschaft", ort)
        window.localStorage.setItem("plz", new String(ort).slice(0, 5))
        window.localStorage.setItem("produktTyp", produktTyp)
        window.localStorage.setItem("kundenTyp", kundentyp)
        window.localStorage.setItem("kwhJahr", kwhJahr)
        window.localStorage.setItem("kwhJahrAuswahl", kwhJahr)
        window.localStorage.setItem("battery", battery)
        window.localStorage.setItem("logged", true) */

        const details = {
          email: process.env.NEXT_PUBLIC_AUTH_EMAIL,
          password: process.env.NEXT_PUBLIC_AUTH_PASS,
        }

        var formBody = []

        for (var property in details) {
          var encodedKey = encodeURIComponent(property)
          var encodedValue = encodeURIComponent(details[property])
          formBody.push(encodedKey + "=" + encodedValue)
        }

        formBody = formBody.join("&")

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_MAIN}/api/auth`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=UTF-8",
              },
              body: formBody,
            }
          )

          const dataJSON = response.json()

          await dataJSON.then((e) => {
            setLoader(false)
            if (e.login == "success") {
              console.log(e)
              sessionStorage.setItem("token", e.token)
              setLoader(true)

              setTimeout(() => {
                router.push("/results")
                setLoader(false)
              }, 450)
            }
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  return (
    <main className={stylesNorm.MainNorm}>
      <motion.section className={stylesNorm.home} id="home">
        <div className={stylesNorm.box}>
          <motion.div
            initial={{ opacity: 0, x: -300, y: -100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.7, delay: 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
            className={
              themer == "light"
                ? stylesNorm.siranLogo
                : stylesNorm.siranLogoDark
            }
            exit={{ opacity: 0, x: -300, y: 100 }}
          >
            <motion.img src="/svg.svg" alt="Siran Logo" />
          </motion.div>
        </div>
        <div
          className={themer == "light" ? stylesNorm.box2 : stylesNorm.box2Dark}
        >
          <motion.div
            className={stylesNorm.TarifRechner}
            initial={{ opacity: 0, x: 300, y: -100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.7, delay: 0.4 }}
            viewport={{ once: false, amount: 0.2 }}
            exit={{ opacity: 0, x: 300, y: 100 }}
          >
            <div className={stylesNorm.CityInput}>
              {themer == "dark" ? (
                <AutoCompleteOrt
                  label={
                    ortErr ? "Eingabe fehlerhaft..." : "Ortschaft auswählen..."
                  }
                  ortErr={ortErr}
                  load={false}
                  newOrt={newOrt}
                  ortselect={(value) => {
                    setOrt(value)
                  }}
                />
              ) : (
                <AutoCompleteOrtlight
                  label={
                    ortErr ? "Eingabe fehlerhaft..." : "Ortschaft auswählen..."
                  }
                  ortErr={ortErr}
                  load={false}
                  newOrt={newOrt}
                  ortselect={(value) => {
                    setOrt(value)
                  }}
                />
              )}
            </div>
            <div className={stylesNorm.kundentyp}>
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
                          produktTyp == "electric"
                            ? setkwhJahr(2500)
                            : setkwhJahr(10000)
                          setKundenTyp(e.target.value)
                        }}
                        sx={
                          themer == "light"
                            ? {
                                color: "#5e0a03",

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
                      <div style={{ display: "flex", gap: 3 }}>
                        <AccountBox sx={{ filter: "grayscale(0.3)" }} />
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
                          produktTyp == "electric"
                            ? setkwhJahr(20000)
                            : setkwhJahr(40000)
                          setKundenTyp(e.target.value)
                        }}
                        sx={
                          themer == "light"
                            ? {
                                color: "#5e0a03",

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
                      <p style={{ display: "flex", gap: 3 }}>
                        <Business sx={{ filter: "grayscale(0.3)" }} />{" "}
                        <p>Gewerbe</p>
                      </p>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className={stylesNorm.produkttyp}>
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
                          kundentyp == "private"
                            ? setkwhJahr(2500)
                            : setkwhJahr(20000)
                          setProduktTyp(e.target.value)
                        }}
                        sx={
                          produktTyp == "electric"
                            ? {
                                color: "#aa2d00",
                                filter: "drop-shadow(0.2px 1px 1px black)",

                                "&.Mui-checked": {
                                  color: "yellow",
                                },
                              }
                            : {
                                color: "#aa2d00",
                                filter: "drop-shadow(1px 1px 0px black)",

                                "&.Mui-checked": {
                                  color: "yellow",
                                },
                              }
                        }
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
                          style={{
                            tranform: "scale(7.5)",
                          }}
                          sx={
                            themer == "light"
                              ? {
                                  color: "#c01607",
                                }
                              : {
                                  color: "yellow",
                                }
                          }
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
                          kundentyp == "private"
                            ? setkwhJahr(5000)
                            : setkwhJahr(30000)

                          setProduktTyp(e.target.value)
                        }}
                        sx={
                          produktTyp == "electric"
                            ? {
                                color: "#aa2d00",
                                filter: "drop-shadow(0.2px 1px 1px black)",

                                "&.Mui-checked": {
                                  color: "#ff9900",
                                },
                              }
                            : {
                                color: "#aa2d00",
                                filter: "drop-shadow(1px 1px 0px black)",

                                "&.Mui-checked": {
                                  color: "#ff9900",
                                },
                              }
                        }
                      />
                    }
                    label={
                      <p style={{ display: "flex", gap: 3 }}>
                        <LocalFireDepartmentIcon sx={{ color: "#ff9900" }} />
                        <p>Gas</p>
                      </p>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>
            {produktTyp == "electric" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeIn", duration: 0.3 }}
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
                      kwhJahr == 1000 ||
                      kwhJahr == 1001 ||
                      kwhJahr == 1500 ||
                      kwhJahr == 2000
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
                      kwhJahr == "2001" ||
                      kwhJahr == "2500" ||
                      kwhJahr == "3000"
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
                      kwhJahr == "3001" ||
                      kwhJahr == "3500" ||
                      kwhJahr == "4000"
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
                      kwhJahr == "4001" ||
                      kwhJahr == "4500" ||
                      kwhJahr == "5000"
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
                      kwhJahr == "5001" ||
                      kwhJahr == "5500" ||
                      kwhJahr == "6000"
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
                      kwhJahr == "6001" ||
                      kwhJahr == "6500" ||
                      kwhJahr == "7000"
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
                            kwhJahr > 7200
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
                        value={kwhJahr > 7200 ? 3 : battery}
                        onChange={(e) => {
                          setBattery(e.target.value)

                          if (batteryRef.current == 3) {
                            if (e.target.value == 2) {
                              setkwhJahr(parseFloat(kwhJahr) - 500)
                            }
                          }

                          if (batteryRef.current == 2) {
                            if (e.target.value == 3) {
                              setkwhJahr(parseFloat(kwhJahr) + 500)
                            }

                            if (e.target.value == 1) {
                              setkwhJahr(parseFloat(kwhJahr) - 499)
                            }
                          }

                          if (batteryRef.current == 1) {
                            if (e.target.value == 2) {
                              setkwhJahr(parseFloat(kwhJahr) + 499)
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
                        kwhJahr > 7200
                          ? { top: "7%" }
                          : (battery == 1 && { top: "77%" }) ||
                            (battery == 2 && { top: "41%" }) ||
                            (battery == 3 && { top: "7%" })
                      }
                    >
                      <div
                        data-verbrauchrange={
                          kwhJahr > 7200
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
            {produktTyp == "gas" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
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
                      kwhJahr == "4000" ||
                      kwhJahr == "6000" ||
                      kwhJahr == "8000"
                    }
                  />
                  <label htmlFor="person1" data-person="50m²">
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon} />
                  </label>

                  <input
                    type="radio"
                    name="personenAnzahl"
                    id="person2"
                    onChange={onRadioChanged}
                    value="12000"
                    checked={
                      kwhJahr == "10000" ||
                      kwhJahr == "12000" ||
                      kwhJahr == "14000"
                    }
                  />
                  <label
                    htmlFor="person2"
                    data-person="100m²"
                    className={stylesNorm.gasLevel2}
                  >
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon} />
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon2} />
                  </label>

                  <input
                    type="radio"
                    name="personenAnzahl"
                    id="person3"
                    value="20000"
                    onChange={onRadioChanged}
                    checked={
                      kwhJahr == "18000" ||
                      kwhJahr == "20000" ||
                      kwhJahr == "22000"
                    }
                  />
                  <label htmlFor="person3" data-person="150m²">
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon} />
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon2} />
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon3} />
                  </label>

                  <input
                    type="radio"
                    name="personenAnzahl"
                    id="person4"
                    value="25000"
                    onChange={onRadioChanged}
                    checked={
                      kwhJahr == "23000" ||
                      kwhJahr == "25000" ||
                      kwhJahr == "27000"
                    }
                  />
                  <label
                    htmlFor="person4"
                    data-person="200m²"
                    className={stylesNorm.person4Gas}
                  >
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon} />
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon2} />
                    <LocalFireDepartmentIcon
                      className={stylesNorm.FireIcon3}
                    />{" "}
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon4} />
                  </label>

                  <input
                    type="radio"
                    name="personenAnzahl"
                    id="person5"
                    onChange={onRadioChanged}
                    value="30000"
                    checked={
                      kwhJahr == "28000" ||
                      kwhJahr == "30000" ||
                      kwhJahr == "32000"
                    }
                  />
                  <label
                    htmlFor="person5"
                    data-person="250m²"
                    className={stylesNorm.person5Gas}
                  >
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon} />
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon2} />
                    <LocalFireDepartmentIcon
                      className={stylesNorm.FireIcon3}
                    />{" "}
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon4} />
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon5} />
                  </label>

                  <input
                    type="radio"
                    name="personenAnzahl"
                    id="person6"
                    value="40000"
                    onChange={onRadioChanged}
                    checked={
                      kwhJahr == "38000" ||
                      kwhJahr == "40000" ||
                      kwhJahr == "42000"
                    }
                  />
                  <label
                    htmlFor="person6"
                    data-person="350m²"
                    className={stylesNorm.person6Gas}
                  >
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon} />{" "}
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon2} />{" "}
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon3} />{" "}
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon4} />{" "}
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon5} />{" "}
                    <LocalFireDepartmentIcon className={stylesNorm.FireIcon6} />
                  </label>
                </div>
                <div className={stylesNorm.batteryFrame}>
                  {kwhJahr < 45000 && (
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
                          {themer == "light" ? (
                            <>
                              <i className="fas fa-fire fire1" />
                              <i className="fas fa-fire fire2" />
                              <i className="fas fa-fire fire3" />
                            </>
                          ) : (
                            <>
                              <i className="fas fa-fire fire1Dark" />
                              <i className="fas fa-fire fire2Dark" />
                              <i className="fas fa-fire fire3Dark" />
                            </>
                          )}
                        </motion.div>
                      )}

                      {kwhJahr > 45000 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={stylesNorm.FireBlock}
                        >
                          {themer == "light" ? (
                            <>
                              <i className="fas fa-fire fire1" />
                              <i className="fas fa-fire fire2" />
                              <i className="fas fa-fire fire3" />
                            </>
                          ) : (
                            <>
                              <i className="fas fa-fire fire1Dark" />
                              <i className="fas fa-fire fire2Dark" />
                              <i className="fas fa-fire fire3Dark" />
                            </>
                          )}
                        </motion.div>
                      )}
                    </>
                  )}

                  {kwhJahr > 45000 && (
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
                        value={kwhJahr > 45000 ? 3 : battery}
                        onChange={(e) => {
                          setBattery(e.target.value)

                          if (batteryRef.current == 3) {
                            if (e.target.value == 2) {
                              setkwhJahr(parseFloat(kwhJahr) - 2000)
                            }
                          }

                          if (batteryRef.current == 2) {
                            if (e.target.value == 3) {
                              setkwhJahr(parseFloat(kwhJahr) + 2000)
                            }

                            if (e.target.value == 1) {
                              setkwhJahr(parseFloat(kwhJahr) - 2000)
                            }
                          }

                          if (batteryRef.current == 1) {
                            if (e.target.value == 2) {
                              setkwhJahr(parseFloat(kwhJahr) + 2000)
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
                        kwhJahr > 45000
                          ? { top: "7%" }
                          : (battery == 1 && { top: "77%" }) ||
                            (battery == 2 && { top: "41%" }) ||
                            (battery == 3 && { top: "7%" })
                      }
                    >
                      <div
                        data-verbrauchrange={
                          kwhJahr > 45000
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

            {kundentyp == "private" && produktTyp == "electric" && (
              <div className={stylesNorm.kWhRange}>
                <div className={stylesNorm.KwhRangeInput}>
                  <input
                    type="range"
                    name="kwhJahrRange"
                    step="500"
                    min={1000}
                    max={15000}
                    value={kwhJahr}
                    onChange={(e) => setkwhJahr(e.target.value)}
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
                      value={kwhJahr}
                      onChange={(e) => setkwhJahr(e.target.value)}
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
                      value={kwhJahr}
                      onChange={(e) => setkwhJahr(e.target.value)}
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

            {kundentyp == "private" && produktTyp == "gas" && (
              <div className={stylesNorm.kWhRange}>
                <div className={stylesNorm.KwhRangeInput}>
                  <input
                    type="range"
                    name="kwhJahrRange"
                    step="1000"
                    min={3000}
                    max={60000}
                    value={kwhJahr}
                    onChange={(e) => setkwhJahr(e.target.value)}
                  />
                </div>
                <div className={stylesNorm.kwhField}>
                  {/*  */}

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
                      value={kwhJahr}
                      onChange={(e) => setkwhJahr(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalFireDepartmentIcon
                              sx={{
                                color: "orange",
                                transform: "scale(1.3) translateY(0px)",
                                filter: "brightness(0.8)",
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
                      value={kwhJahr}
                      onChange={(e) => setkwhJahr(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalFireDepartmentIcon
                              sx={{
                                color: "orange",
                                transform: "scale(1.3) translateY(0px)",
                                filter: "brightness(0.8)",
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
            {kundentyp == "company" && produktTyp == "electric" && (
              <div className={stylesNorm.kWhRange}>
                <div className={stylesNorm.KwhRangeInput}>
                  <input
                    type="range"
                    name="kwhJahrRange"
                    step="1000"
                    min={5000}
                    max={250000}
                    value={kwhJahr}
                    onChange={(e) => setkwhJahr(e.target.value)}
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
                      value={kwhJahr}
                      onChange={(e) => setkwhJahr(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ElectricalServices
                              sx={{
                                color: "#a82d00",
                                transform: "scale(1.3) translateY(0px)",
                                filter: "brightness(0.8)",
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
                      value={kwhJahr}
                      onChange={(e) => setkwhJahr(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalFireDepartmentIcon
                              sx={{
                                color: "orange",
                                transform: "scale(1.3) translateY(0px)",
                                filter: "brightness(0.8)",
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
            {kundentyp == "company" && produktTyp == "gas" && (
              <div className={stylesNorm.kWhRange}>
                <div className={stylesNorm.KwhRangeInput}>
                  <input
                    type="range"
                    name="kwhJahrRange"
                    step="1000"
                    min={5000}
                    max={250000}
                    value={kwhJahr}
                    onChange={(e) => setkwhJahr(e.target.value)}
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
                      value={kwhJahr}
                      onChange={(e) => setkwhJahr(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalFireDepartmentIcon
                              sx={{
                                color: "orange",
                                transform: "scale(1.3) translateY(0px)",
                                filter: "brightness(0.8)",
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
                      value={kwhJahr}
                      onChange={(e) => setkwhJahr(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalFireDepartmentIcon
                              sx={{
                                color: "orange",
                                transform: "scale(1.3) translateY(0px)",
                                filter: "brightness(0.8)",
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
            <div className={stylesNorm.btn}>
              <Button
                onClick={Anfrage}
                startIcon={
                  loader == false ? (
                    <ManageSearchOutlinedIcon
                      sx={{
                        transform: "scale(1.6)",
                      }}
                    />
                  ) : (
                    <ThemeProvider theme={theme}>
                      <CircularProgress
                        size={25}
                        color={themer == "dark" ? "test" : "testLight"}
                      />
                    </ThemeProvider>
                  )
                }
                sx={
                  themer == "light"
                    ? {
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,

                        "&.MuiButton-outlined": {
                          color: "#5e0a03",
                          border: "none",

                          "&:hover": {
                            color: "white",
                          },
                        },
                      }
                    : {
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,

                        "&.MuiButton-outlined": {
                          color: "#ffa382",
                          border: "none",
                        },
                      }
                }
                variant="outlined"
              >
                Jetzt Vergleichen...
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
      {/* <section></section>
      <section></section> */}

      <FooterDesktop />
    </main>
  )
}

export default MainNorm
