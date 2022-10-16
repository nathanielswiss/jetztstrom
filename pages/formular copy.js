import Orte from "../public/ort.json"
import AutoCompleteOrt from "../comps/AutoCompleteOrt"
import { useEffect, useContext, useState } from "react"
import {
  TarifBlockContext,
  DataContext,
  KundendatenContext,
  ThemeContext,
} from "../context/DataContext"
import styleNorm from "../styles/Norm/MainNorm.module.scss"
import BoltIcon from "@mui/icons-material/Bolt"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"

import Autocomplete from "@mui/material/Autocomplete"
import {
  TextField,
  Button,
  InputAdornment,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  ButtonGroup,
  Box,
  CircularProgress,
  StepConnector,
} from "@mui/material"

import { motion } from "framer-motion"
import { useRouter } from "next/router"
import Checkbox from "@mui/material/Checkbox"
import {
  Stepper,
  Step,
  StepLabel,
  StepButton,
  makeStyles,
} from "@material-ui/core"
import ManIcon from "@mui/icons-material/Man"
import WomanIcon from "@mui/icons-material/Woman"
import {
  CssTextField,
  NewTextField,
  VVTextField,
  PersonalienTextField,
  CssTextFieldLight,
  PersonalienTextFieldLight,
} from "../comps/MaterialUI"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"
import CallIcon from "@mui/icons-material/Call"
import EmailIcon from "@mui/icons-material/Email"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import { useTheme, styled } from "@mui/material/styles"
import Popper from "@mui/material/Popper"
import { autocompleteClasses } from "@mui/material/Autocomplete"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo"
import Kontakt from "../comps/Kontakt"

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    backgroundColor: "#ffffffaa",

    "& ul": {
      padding: 0,
      margin: 0,

      color: "#a82d00",

      backgroundColor: "#ffffffaa",
    },
    "& li": { backgroundColor: "#ffffffaa", color: "#a82d00" },
    "& li:active": {
      backgroundColor: "#5e0a03",
      color: "#ffa382",
    },
    "& li:hover": {
      backgroundColor: "#5e0a03",
      color: "#ffa382",
    },
  },
})

const StyledPopperDark = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    backgroundColor: "#141414",

    "& ul": {
      padding: 0,
      margin: 0,

      color: "#ffa382",

      backgroundColor: "#141414",
    },
    "& li": { backgroundColor: "#141414", color: "#ffa382" },
    "& li:active": {
      backgroundColor: "green",
      color: "#5e0a03",
    },
    "& li:hover": {
      backgroundColor: "#ffa38222",
      color: "#ffa382",
    },
  },
})

const Formular = () => {
  const newOrt = Orte.map((e) => e.city)
  const [TarifBlock, setTarifBlock] = useContext(TarifBlockContext)
  const [daten, setDaten] = useContext(DataContext)
  const [card, setCard] = useState()
  const [kWhJahr, setkwhJahr] = useState()
  const router = useRouter()
  const [load, setLoad] = useState(false)
  const [loader, setLoader] = useState(false)
  const [themer, UpdateThemer] = useContext(ThemeContext)
  /* Formular States */
  const [anrede, UpdateAnrede] = useState("Herr")

  const [vorname, UpdateVorname] = useState("")
  const [vornameErr, setVornameErr] = useState(false)

  const [nachname, UpdateNachname] = useState()
  const [nachnameErr, setNachnameErr] = useState(false)

  const [geburtsdatum, UpdateGeburtsdatum] = useState()
  const [geburtsdatumErr, setGeburtsdatumErr] = useState(false)

  const [telefonNummer, UpdateTelefonNummer] = useState()
  const [telefonNummerErr, setTelefonNummerErr] = useState(false)
  const [telefonNummerFocus, UpdateTelefonNummerFocus] = useState(false)

  const [email, UpdateEmail] = useState()
  const [emailErr, setEmailErr] = useState(false)
  const [emailFocus, UpdateEmailFocus] = useState(false)

  /*  */
  const [strassen, UpdateStrassen] = useState("test")
  const [auswahlStrasse, setAuswahlStrasse] = useState()
  const [strassenErr, setStrassenErr] = useState()
  const [hausNr, setHausNr] = useState(1)

  const [ort, setOrt] = useState()
  const [ortErr, setOrtErr] = useState(false)

  const [ortschaft, UpdateOrtschaft] = useState()

  const [vorversorgern, setVorversorgern] = useState("test")
  const [vorversorgerAuswahl, setVorversorgerAuswahl] = useState()
  const [vorversorgerAuswahlFull, setVorversorgerAuswahlFull] = useState()
  const [VVErr, setVVErr] = useState(false)

  const [lieferart, setLieferart] = useState("neu")
  const [belieferungsdatum, setBelieferungsdatum] = useState(new Date())
  const [belehrung, setBelehrung] = useState(false)
  const [belehrungErr, setBelehrungErr] = useState(false)

  const [dateDiff, setDateDiff] = useState("")
  const [belieferungsdatumErr, setBelieferungsdatumErr] = useState(false)
  const [BLDatum, UpdateBLDatum] = useState()

  const [zahlung, setZahlung] = useState("SEPA")
  const [iban, UpdateIban] = useState("")
  const [ibanErr, setIbanErr] = useState(false)

  const [open, setOpen] = useState()
  const [openkundennr, setOpenkundennr] = useState(false)

  const [Kundendaten, setKundendaten] = useContext(KundendatenContext)

  const useStyles = makeStyles(() => ({
    root: {
      "& .MuiStepIcon-active": { color: "#aa2d00" },
      "& .MuiStepIcon-completed": {
        color: "#01ca98",
        filter: "brightness(1.1)",
      },
      "& .Mui-disabled .MuiStepIcon-root": { color: "grey" },
      backgroundColor: "transparent",
      "& .MuiStepLabel-label": { color: "#FFFFFFAA", fontSize: 18 },
    },
  }))

  const c = useStyles()

  useEffect(() => {
    if (window.localStorage.cardSelected) {
      setCard(JSON.parse(window.localStorage.cardSelected))
      setkwhJahr(sessionStorage.kwhAuswahl)
      setOrt(sessionStorage.ortschaft)

      setLoad(true)
      // console.log(JSON.parse(sessionStorage.Strassen))
      const StrassenDecode = JSON.parse(window.localStorage.DataResponse)
      const Strassen = StrassenDecode.Strassen.map((x) => x.street)
      UpdateStrassen(Strassen)
      setAuswahlStrasse(Strassen[0])

      const cardStored = JSON.parse(window.localStorage.cardSelected)

      fetch(
        `${process.env.NEXT_PUBLIC_URL_MAIN}/api/vorversorger?VViD=${cardStored.rateId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then(async (data) => {
          const vvFilter = await data.map((value) => value.name)
          setVorversorgern(vvFilter)
          setVorversorgerAuswahlFull(data)
          console.log(data)
        })
    } else {
      router.push("/")
    }
  }, [])

  return (
    <div className={styleNorm.FormularPage}>
      <section className={styleNorm.FormularSection}>
        {card && load && load == true && (
          <div className={styleNorm.CardFrame}>
            <motion.div
              className={
                themer == "light" ? styleNorm.card : styleNorm.cardDark
              }
              initial={{ opacity: 0, y: -150 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: "tween" },
              }}
              exit={{ opacity: 0, y: 150 }}
            >
              <div className={styleNorm.profileIcon}>
                {card && card.branch == "electric" ? (
                  <BoltIcon className={styleNorm.strom} />
                ) : (
                  <LocalFireDepartmentIcon className={styleNorm.gas} />
                )}
              </div>
              <div
                className={styleNorm.svglogo}
                dangerouslySetInnerHTML={{
                  __html:
                    card && card.providerSVG
                      ? card.providerSVG
                      : card && card.providerName,
                }}
              ></div>
              <span>
                <p>{card && card.rateName}</p>
                <div>{card && card.optTerm + ` Monate`}</div>
              </span>
              <div className={styleNorm.kwhkosten}>
                <fieldset>
                  <legend>{`kWh Kosten : ${
                    kWhJahr && kWhJahr
                  } kwh/Jahr`}</legend>
                  <div className={styleNorm.JahresPreis}>{`${parseFloat(
                    (card && card.workPrice / 100) * kWhJahr
                  )
                    .toFixed(2)
                    .replace(".", ",")}€`}</div>
                  <div className={styleNorm.durch}>: 12 =</div>
                  <div className={styleNorm.MonatsPreis}>{`${parseFloat(
                    ((card && card.workPrice / 100) * kWhJahr) / 12
                  )
                    .toFixed(2)
                    .replace(".", ",")}€`}</div>
                </fieldset>
              </div>
              <div className={styleNorm.grundkosten}>
                <fieldset>
                  <legend>{`Grundkosten...`}</legend>
                  <div className={styleNorm.JahresPreis}>{`${parseFloat(
                    card && card.basePriceYear
                  )
                    .toFixed(2)
                    .replace(".", ",")}€`}</div>
                  <div className={styleNorm.durch}>: 12 =</div>
                  <div className={styleNorm.MonatsPreis}>{`${parseFloat(
                    card && card.basePriceMonth
                  )
                    .toFixed(2)
                    .replace(".", ",")}€`}</div>
                </fieldset>
              </div>
              <div className={styleNorm.Total}>
                <div
                  data-mwst={
                    card && card.type == "company"
                      ? "inkl. Grundpreis ohne MwSt"
                      : "inkl. Grundpreis mit MwSt"
                  }
                  className={styleNorm.totalPrice}
                >
                  {`${
                    card &&
                    kWhJahr &&
                    ((card.workPrice / 100) * kWhJahr + card.basePriceYear)
                      .toFixed(2)
                      .replace(".", ",")
                  } €`}
                </div>
                <div className={styleNorm.Terms}></div>
              </div>
              <div className={styleNorm.TotalMonat}>
                <h1
                  data-mwst={
                    card && card.type == "company"
                      ? "/monatlich ohne 19% MwSt"
                      : "/monatlich inkl. 19% MwSt"
                  }
                >
                  {`${
                    card &&
                    (
                      ((card.workPrice / 100) * kWhJahr + card.basePriceYear) /
                      12
                    )
                      .toFixed(2)
                      .replace(".", ",")
                  } €`}
                </h1>
              </div>

              <div className={styleNorm.btnCard}>
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
                    router.push("/results")
                    /*    UpdateMonthAuswahl("all")
                  setTarifBlock({ card: card && card, kwh: kWhJahr })
                  sessionStorage.setItem("card", JSON.stringify(card && card))
                  sessionStorage.setItem("kwhAuswahl", kWhJahr)
                  router.push("/formular")  */
                  }}
                >
                  Tarif ändern
                </Button>
              </div>
            </motion.div>
          </div>
        )}
        <div
          className={themer == "light" ? styleNorm.Form : styleNorm.FormDark}
        >
          <div className={styleNorm.PersonalienFrame}>
            <Stepper activeStep={0} className={c.root}>
              <Step>
                <StepLabel>Ihre Angaben</StepLabel>
              </Step>

              <Step>
                <StepLabel>Unterschrift</StepLabel>
              </Step>

              <Step>
                <StepLabel>Abschluss</StepLabel>
              </Step>
            </Stepper>
          </div>
          <div className={styleNorm.PersonalienBlock}>
            <h1>Personalien & Bankdaten...</h1>
            <fieldset className={styleNorm.AnredeField}>
              <legend>Anrede *</legend>
              <FormControl>
                <RadioGroup row aria-labelledby="kundentyp" name="kundentyp">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={anrede == "Herr"}
                        onChange={(e) => UpdateAnrede("Herr")}
                        sx={
                          themer == "light"
                            ? {
                                color: "white",

                                "&.Mui-checked": {
                                  color: "#ffa382",
                                },
                              }
                            : {
                                color: "#a82d00",

                                "&.Mui-checked": {
                                  color: "#ffa382",
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
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ManIcon
                          sx={
                            themer == "light"
                              ? { color: "#ffa382" }
                              : { color: "#a82d00" }
                          }
                        />{" "}
                        <p>Herr</p>{" "}
                      </p>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={anrede == "Frau"}
                        onChange={(e) => UpdateAnrede("Frau")}
                        sx={
                          themer == "light"
                            ? {
                                color: "white",

                                "&.Mui-checked": {
                                  color: "#ffa382",
                                },
                              }
                            : {
                                color: "#a82d00",

                                "&.Mui-checked": {
                                  color: "#ffa382",
                                },
                              }
                        }
                      />
                    }
                    label={
                      <p style={{ display: "flex", gap: 3 }}>
                        <WomanIcon
                          sx={
                            themer == "light"
                              ? { color: "#ffa382" }
                              : { color: "#a82d00" }
                          }
                        />{" "}
                        <p>Frau</p>{" "}
                      </p>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </fieldset>
            {themer == "light" ? (
              <PersonalienTextFieldLight
                className={styleNorm.Vorname}
                error={vornameErr == true ? true : false}
                value={vorname}
                label={
                  vornameErr
                    ? "Vorname erforderlich *"
                    : "Vornamen eingeben... *"
                }
                onChange={(e) => {
                  console.log(e.target.value)
                  UpdateVorname(e.target.value)
                }}
              />
            ) : (
              <PersonalienTextField
                className={styleNorm.Vorname}
                error={vornameErr == true ? true : false}
                value={vorname}
                label={
                  vornameErr
                    ? "Vorname erforderlich *"
                    : "Vornamen eingeben... *"
                }
                onChange={(e) => {
                  console.log(e.target.value)
                  UpdateVorname(e.target.value)
                }}
              />
            )}
            {themer == "light" ? (
              <PersonalienTextFieldLight
                className={styleNorm.Nachnamen}
                error={nachnameErr == true ? true : false}
                label={
                  nachnameErr
                    ? "Nachname erforderlich *"
                    : "Nachnamen eingeben... *"
                }
                onChange={(e) => {
                  console.log(e.target.value)
                  UpdateNachname(e.target.value)
                }}
              />
            ) : (
              <PersonalienTextField
                className={styleNorm.Nachnamen}
                error={nachnameErr == true ? true : false}
                label={
                  nachnameErr
                    ? "Nachname erforderlich *"
                    : "Nachnamen eingeben... *"
                }
                onChange={(e) => {
                  console.log(e.target.value)
                  UpdateNachname(e.target.value)
                }}
              />
            )}
            <fieldset className={styleNorm.Geburtsdatum}>
              <legend>Geburtsdatum... *</legend>
              <input
                type="date"
                data-date-format="DD/MMMM/YYYY"
                value={geburtsdatum}
                onChange={(e) => UpdateGeburtsdatum(e.target.value)}
              />
            </fieldset>
            {themer == "light" ? (
              <PersonalienTextFieldLight
                onFocus={() => UpdateTelefonNummerFocus(true)}
                onBlur={() => UpdateTelefonNummerFocus(false)}
                InputProps={
                  telefonNummerFocus == true
                    ? {
                        startAdornment: (
                          <motion.InputAdornment
                            initial={{ opacity: 0, y: -15 }}
                            animate={{
                              opacity: 1,
                              y: 2,
                            }}
                            exit={{ opacity: 0, y: -5 }}
                            position="start"
                          >
                            <CallIcon
                              sx={{
                                color: "#ffa382",
                                transform: "scale(1.3) translateY(0px)",
                                filter: "brightness(0.8) ",
                                marginRight: 3,
                              }}
                            />
                          </motion.InputAdornment>
                        ),
                      }
                    : ``
                }
                className={styleNorm.Telefonnummer}
                error={telefonNummerErr == true ? true : false}
                label={
                  telefonNummerErr
                    ? "Telefonnummer erforderlich *"
                    : "Telefonnummer eingeben... *"
                }
                type={"number"}
                onChange={(e) => {
                  UpdateTelefonNummer(e.target.value)
                }}
              />
            ) : (
              <PersonalienTextField
                onFocus={() => UpdateTelefonNummerFocus(true)}
                onBlur={() => UpdateTelefonNummerFocus(false)}
                InputProps={
                  telefonNummerFocus == true
                    ? {
                        startAdornment: (
                          <motion.InputAdornment
                            initial={{ opacity: 0, y: -15 }}
                            animate={{
                              opacity: 1,
                              y: 2,
                            }}
                            exit={{ opacity: 0, y: -5 }}
                            position="start"
                          >
                            <CallIcon
                              sx={{
                                color: "#ffa382",
                                transform: "scale(1.3) translateY(0px)",
                                filter: "brightness(0.8) ",
                                marginRight: 3,
                              }}
                            />
                          </motion.InputAdornment>
                        ),
                      }
                    : ``
                }
                className={styleNorm.Telefonnummer}
                error={telefonNummerErr == true ? true : false}
                label={
                  telefonNummerErr
                    ? "Telefonnummer erforderlich *"
                    : "Telefonnummer eingeben... *"
                }
                type={"number"}
                onChange={(e) => {
                  UpdateTelefonNummer(e.target.value)
                }}
              />
            )}
            {themer == "light" ? (
              <PersonalienTextFieldLight
                onFocus={() => UpdateEmailFocus(true)}
                onBlur={() => UpdateEmailFocus(false)}
                className={styleNorm.Email}
                label={
                  emailErr ? "E-Mail erforderlich *" : "E-Mail eingeben... *"
                }
                InputProps={
                  emailFocus == true
                    ? {
                        startAdornment: (
                          <motion.InputAdornment
                            initial={{ opacity: 0, y: -15 }}
                            animate={{
                              opacity: 1,
                              y: 2,
                            }}
                            exit={{ opacity: 0, y: -5 }}
                            position="start"
                          >
                            <EmailIcon
                              sx={{
                                color: "#ffa382",
                                transform: "scale(1.3) translateY(0px)",
                                filter: "brightness(0.8) ",
                                marginRight: 3,
                              }}
                            />
                          </motion.InputAdornment>
                        ),
                      }
                    : ``
                }
                type={"email"}
                error={emailErr == true ? true : false}
                onChange={(e) => {
                  UpdateEmail(e.target.value)
                }}
              />
            ) : (
              <PersonalienTextField
                onFocus={() => UpdateEmailFocus(true)}
                onBlur={() => UpdateEmailFocus(false)}
                className={styleNorm.Email}
                label={
                  emailErr ? "E-Mail erforderlich *" : "E-Mail eingeben... *"
                }
                InputProps={
                  emailFocus == true
                    ? {
                        startAdornment: (
                          <motion.InputAdornment
                            initial={{ opacity: 0, y: -15 }}
                            animate={{
                              opacity: 1,
                              y: 2,
                            }}
                            exit={{ opacity: 0, y: -5 }}
                            position="start"
                          >
                            <EmailIcon
                              sx={{
                                color: "#ffa382",
                                transform: "scale(1.3) translateY(0px)",
                                filter: "brightness(0.8) ",
                                marginRight: 3,
                              }}
                            />
                          </motion.InputAdornment>
                        ),
                      }
                    : ``
                }
                type={"email"}
                error={emailErr == true ? true : false}
                onChange={(e) => {
                  UpdateEmail(e.target.value)
                }}
              />
            )}
            <div
              className={styleNorm.Strasse}
              style={
                strassen
                  ? { pointerEvents: "all" }
                  : { pointerEvents: "none", filter: "grayscale(1)" }
              }
            >
              <div className={styleNorm.strasseNr}>
                <Autocomplete
                  options={strassen}
                  sx={{
                    svg: { color: "#ffa382", filter: "brightness(1.4)" },
                  }}
                  value={auswahlStrasse ? auswahlStrasse : null}
                  onChange={(e, v) => setAuswahlStrasse(v)}
                  PopperComponent={StyledPopperDark}
                  renderInput={(params) =>
                    themer == "light" ? (
                      <PersonalienTextFieldLight
                        className={styleNorm.strassenFeld}
                        error={strassenErr ? true : false}
                        {...params}
                        label={`Strasse... *`}
                      />
                    ) : (
                      <PersonalienTextField
                        className={styleNorm.strassenFeld}
                        error={strassenErr ? true : false}
                        {...params}
                        label={`Strasse... *`}
                      />
                    )
                  }
                />
                {themer == "light" ? (
                  <PersonalienTextFieldLight
                    className={styleNorm.HausNrFeld}
                    label={`HausNr`}
                    value={hausNr}
                    onChange={(e) => setHausNr(e.target.value)}
                  />
                ) : (
                  <PersonalienTextField
                    className={styleNorm.HausNrFeld}
                    label={`HausNr`}
                    value={hausNr}
                    onChange={(e) => setHausNr(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className={styleNorm.Ortschaft}>
              <AutoCompleteOrt
                themer={themer == "light" ? "light" : "dark"}
                newOrt={newOrt}
                ortErr={ortErr}
                value={ort ? ort : null}
                load={loader}
                ortselect={async (value) => {
                  value ? setLoader(true) : setLoader(false)
                  UpdateOrtschaft(value)
                  setOrt(value)
                  UpdateStrassen("")
                  setAuswahlStrasse(" ")

                  const Request = await fetch(
                    `${
                      process.env.NEXT_PUBLIC_URL_MAIN
                    }/api/ort?PLZ=${new String(value).slice(0, 5)}`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type":
                          "application/x-www-form-urlencoded;charset=UTF-8",
                      },
                    }
                  )

                  const RequestData = await Request.json()
                  const Strassen = await RequestData.streets.map(
                    (value) => value.street
                  )

                  await UpdateStrassen(Strassen)

                  setLoader(false)
                }}
              />
            </div>
            {/*  <div
              className={formStyle.hausnr}
              style={
                strassen
                  ? { pointerEvents: "all" }
                  : { pointerEvents: "none", filter: "grayscale(1)" }
              }
            >
              <PersonalienTextField
                label={`HausNr`}
                value={hausNr}
                onChange={(e) => setHausNr(e.target.value)}
              />
            </div> */}
          </div>
          <div className={styleNorm.Form2}>
            <fieldset className={styleNorm.LieferType}>
              <legend>Lieferung... *</legend>
              <FormControl>
                <RadioGroup row aria-labelledby="kundentyp" name="kundentyp">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={lieferart == "neu"}
                        onChange={(e) => setLieferart("neu")}
                        sx={
                          themer == "light"
                            ? {
                                color: "white",
                                filter: "brightness(1)",

                                "&.Mui-checked": {
                                  color: "#ffa382",
                                },
                              }
                            : {
                                color: "#a82d00",
                                filter: "brightness(1)",

                                "&.Mui-checked": {
                                  color: "#ffa382",
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
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>Neueinzug</p>
                        <AddCircleOutlineIcon sx={{ color: "#ffa382" }} />
                      </p>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={lieferart == "wechseln"}
                        onChange={(e) => setLieferart("wechseln")}
                        sx={
                          themer == "light"
                            ? {
                                color: "white",
                                filter: "brightness(1)",

                                "&.Mui-checked": {
                                  color: "#ffa382",
                                },
                              }
                            : {
                                color: "#a82d00",
                                filter: "brightness(1)",

                                "&.Mui-checked": {
                                  color: "#ffa382",
                                },
                              }
                        }
                      />
                    }
                    label={
                      <p style={{ display: "flex", gap: 3 }}>
                        <p>Lieferantenwechsel</p>
                        <AutorenewIcon sx={{ color: "#ffa382" }} />
                      </p>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </fieldset>
            <fieldset className={styleNorm.Lieferdatum}>
              <legend>
                {!belieferungsdatum
                  ? "Gewünschtes Belieferungsdatum auswählen... *"
                  : belieferungsdatumErr == false
                  ? "Gewünschtes Belieferungsdatum auswählen... *"
                  : BLDatum == "low"
                  ? "max. 14 Tagen rückversetzbar..."
                  : "max. 60 Tagen möglich ..."}
              </legend>
              <input
                type="date"
                value={belieferungsdatum}
                defaultValue={`01-01-2022`}
                onChange={(e) => {
                  setBelieferungsdatumErr(false)
                  setBelieferungsdatum(e.target.value)
                  const heute = new Date()
                  const auswahl = new Date(e.target.value)
                  console.log(e.target.value)

                  if (e.target.value) {
                    if (heute < auswahl) {
                      const diffTime = Math.abs(auswahl - heute)
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      )
                      console.log("+" + diffDays)
                      setDateDiff("+" + diffDays)

                      if (diffDays <= 60) {
                        setBelieferungsdatumErr(false)
                      } else {
                        setBelieferungsdatumErr(true)
                        UpdateBLDatum("high")
                      }
                    } else {
                      const diffTime = Math.abs(heute - auswahl)
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      )
                      const diffDaysSet = diffDays - 1
                      console.log("-" + diffDaysSet)

                      if (diffDaysSet < 15) {
                        setBelieferungsdatumErr(false)
                      } else {
                        setBelieferungsdatumErr(true)
                        UpdateBLDatum("low")
                      }
                    }
                  } else {
                    setBelieferungsdatumErr(true)
                  }
                }}
              />

              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  id="daypick"
                  label={
                    !belieferungsdatum
                      ? "Gewünschtes Belieferungsdatum auswählen... *"
                      : belieferungsdatumErr == false
                      ? "Gewünschtes Belieferungsdatum auswählen... *"
                      : BLDatum == "low"
                      ? "max. 14 Tagen rückversetzbar..."
                      : "max. 60 Tagen möglich ..."
                  }
                  inputFormat="dd/MM/yyyy"
                  value={belieferungsdatum}
                  onChange={(e, v) => {
                    setBelieferungsdatumErr(false)
                    setBelieferungsdatum(e)
                    const heute = new Date()
                    const auswahl = new Date(e)

                    if (e) {
                      if (heute < auswahl) {
                        const diffTime = Math.abs(auswahl - heute)
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24)
                        )
                        console.log("+" + diffDays)
                        setDateDiff("+" + diffDays)

                        if (diffDays <= 60) {
                          setBelieferungsdatumErr(false)
                        } else {
                          setBelieferungsdatumErr(true)
                          UpdateBLDatum("high")
                        }
                      } else {
                        const diffTime = Math.abs(heute - auswahl)
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24)
                        )
                        const diffDaysSet = diffDays - 1
                        console.log("-" + diffDaysSet)

                        if (diffDaysSet < 15) {
                          setBelieferungsdatumErr(false)
                        } else {
                          setBelieferungsdatumErr(true)
                          UpdateBLDatum("low")
                        }
                      }
                    } else {
                      setBelieferungsdatumErr(true)
                    }
                  }}
                  renderInput={(params) => (
                    <PersonalienTextField
                      {...params}
                      sx={{
                        width: "100%",
                        svg: { color: "#0092d1", filter: "brightness(1.4)" },
                      }}
                      error={belieferungsdatumErr == true ? "true" : ""}
                    />
                  )} 
                />
              </LocalizationProvider>*/}
            </fieldset>
            <div
              className={styleNorm.VorversorgerAuswahl}
              style={
                vorversorgern && vorversorgern
                  ? lieferart == "wechseln"
                    ? { pointerEvents: "all" }
                    : { pointerEvents: "none", filter: "grayscale(1)" }
                  : { pointerEvents: "none", filter: "grayscale(1)" }
              }
            >
              <Autocomplete
                options={vorversorgern}
                value={vorversorgerAuswahl ? vorversorgerAuswahl : null}
                PopperComponent={StyledPopperDark}
                sx={{
                  svg: { color: "#ffa382", filter: "brightness(1)" },
                }}
                renderInput={(params) =>
                  themer == "light" ? (
                    <PersonalienTextFieldLight
                      {...params}
                      error={VVErr}
                      label={`Vorversorger... *`}
                    />
                  ) : (
                    <PersonalienTextField
                      {...params}
                      error={VVErr}
                      label={`Vorversorger... *`}
                    />
                  )
                }
                onChange={(e, v) => {
                  if (v) {
                    setVorversorgerAuswahl(v)
                  }
                }}
              />
            </div>
            <div className={styleNorm.Zahlungsweise}>
              <FormControl>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={
                    themer == "light"
                      ? {
                          color: "white",
                          filter: "brightness(1)",

                          "&.Mui-focused": {
                            color: "white",
                          },
                        }
                      : {
                          color: "#ffa382",
                          filter: "brightness(1)",

                          "&.Mui-focused": {
                            color: "#ffa382",
                          },
                        }
                  }
                >
                  Zahlungsweise :
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  row
                >
                  <FormControlLabel
                    value="SEPA"
                    control={
                      <Radio
                        checked={zahlung == "SEPA"}
                        sx={{
                          color: "white",
                          filter: "brightness(1.2)",

                          "&.Mui-checked": {
                            color: "#ffa382",
                          },
                        }}
                        onChange={() => setZahlung("SEPA")}
                      />
                    }
                    label={
                      <div className={styleNorm.SEPA}>
                        <img src="/sepa.svg" alt="" />
                      </div>
                    }
                  />
                  <FormControlLabel
                    value="Selbstzahler"
                    control={
                      <Radio
                        checked={zahlung == "Selbstzahler"}
                        sx={{
                          color: "white",
                          filter: "brightness(1.2)",

                          "&.Mui-checked": {
                            color: "#ffa382",
                          },
                        }}
                        onChange={() => {
                          UpdateIban("")
                          setZahlung("Selbstzahler")
                        }}
                      />
                    }
                    label="Auf Rechnung"
                  />
                  {/*  <FormControlLabel
                  value="neukonto"
                  disabled={true}
                  control={
                    <Radio
                      sx={{
                        color: "#0092d1",
                        filter: "brightness(1.2)",

                        "&.Mui-checked": {
                          color: "#0092d1",
                        },
                        "&.Mui-disabled": {
                          color: "#0092d1",
                          filter: "grayscale(1)",
                        },
                      }}
                    />
                  }
                  label="Konto eröffnen"
                /> */}
                </RadioGroup>
              </FormControl>
            </div>
            {zahlung == "SEPA" &&
              (themer == "light" ? (
                <PersonalienTextFieldLight
                  error={
                    iban && iban.BankResponse.response == "Error"
                      ? true
                      : "" || ibanErr == true
                      ? true
                      : false
                  }
                  className={styleNorm.BankkontoIBAN}
                  label={`IBAN Kontonummer... *`}
                  InputProps={{
                    startAdornment: (
                      <AccountBalanceIcon
                        sx={{
                          color: "white",
                          filter: "brightness(1)",
                          transform: "translateX(-5px)",
                        }}
                      />
                    ),
                    endAdornment:
                      iban && iban.BankResponse.response == "Success" ? (
                        <CheckIcon
                          sx={{ color: "green", filter: "brightness(1.5)" }}
                        />
                      ) : iban && iban.BankResponse.response == "AxiosError" ? (
                        <CloseIcon
                          sx={{ color: "red", filter: "brightness(1.5)" }}
                        />
                      ) : (
                        ""
                      ),
                  }}
                  onChange={async (e) => {
                    UpdateIban("")
                    const ibanInput = new String(e.target.value).replaceAll(
                      " ",
                      ""
                    )

                    if (ibanInput.length >= 21) {
                      const Request = await fetch(
                        `${process.env.NEXT_PUBLIC_URL_MAIN}/api/iban?IBAN=${ibanInput}`,
                        {
                          method: "GET",
                        }
                      )

                      const RequestData = await Request.json()
                      console.log(RequestData)

                      UpdateIban(RequestData)
                      if (RequestData.BankResponse.response == "Success") {
                        setOpen(true)

                        setTimeout(() => {
                          setOpen(false)
                        }, 3000)
                      }
                    }
                  }}
                />
              ) : (
                <PersonalienTextField
                  error={
                    iban && iban.BankResponse.response == "Error"
                      ? true
                      : "" || ibanErr == true
                      ? true
                      : false
                  }
                  className={styleNorm.BankkontoIBAN}
                  label={`IBAN Kontonummer... *`}
                  InputProps={{
                    startAdornment: (
                      <AccountBalanceIcon
                        sx={{
                          color: "#ffa382",
                          filter: "brightness(1)",
                          transform: "translateX(-5px)",
                        }}
                      />
                    ),
                    endAdornment:
                      iban && iban.BankResponse.response == "Success" ? (
                        <CheckIcon
                          sx={{ color: "green", filter: "brightness(1.5)" }}
                        />
                      ) : iban && iban.BankResponse.response == "AxiosError" ? (
                        <CloseIcon
                          sx={{ color: "red", filter: "brightness(1.5)" }}
                        />
                      ) : (
                        ""
                      ),
                  }}
                  onChange={async (e) => {
                    UpdateIban("")
                    const ibanInput = new String(e.target.value).replaceAll(
                      " ",
                      ""
                    )

                    if (ibanInput.length >= 21) {
                      const Request = await fetch(
                        `${process.env.NEXT_PUBLIC_URL_MAIN}/api/iban?IBAN=${ibanInput}`,
                        {
                          method: "GET",
                        }
                      )

                      const RequestData = await Request.json()
                      console.log(RequestData)

                      UpdateIban(RequestData)
                      if (RequestData.BankResponse.response == "Success") {
                        setOpen(true)

                        setTimeout(() => {
                          setOpen(false)
                        }, 3000)
                      }
                    }
                  }}
                />
              ))}
            {zahlung == "SEPA" &&
              iban &&
              iban.BankResponse.response == "Success" && (
                <div className={styleNorm.Bankinfos}>
                  <div>
                    <div>Bankkonto</div>
                    <div>{iban.BankResponse.data.bankAccountNumber}</div>
                  </div>
                  <div>
                    <div>Identifikationscode</div>
                    <div>{iban.BankResponse.data.bankIdentifierCode}</div>
                  </div>
                  <div>
                    <div>Bankname</div>
                    <div>
                      {iban.BankResponse.data.bankName ||
                        (iban.BankResponse.data.bankName == "" && "Unbekannt")}
                    </div>
                  </div>

                  <div>
                    <div>BIC</div>
                    <div>{iban.BankResponse.data.bic}</div>
                  </div>
                  <div>
                    <div>IBAN</div>
                    <div>{iban.BankResponse.data.iban}</div>
                  </div>
                </div>
              )}
          </div>
          <div className={styleNorm.Form3}>
            <div className={styleNorm.allowance}>
              <div
                style={
                  belehrung
                    ? { color: "#ffa382" }
                    : belehrungErr
                    ? { color: "red" }
                    : { color: "white" }
                }
                onClick={() => {
                  setBelehrungErr(false)
                  if (belehrung == false) {
                    setBelehrung(true)
                  } else {
                    setBelehrung(false)
                  }
                }}
              >
                Hiermit bestätige ich die Richtigkeit vorstehender Angaben und
                ermächtige JetztStrom.de, sämtliche zur Prüfung dieses Antrags
                sowie für die Abwicklung dieses Vertrages erforderlichen
                Auskünfte bei den Vorsorgern und der angegebenen Bank
                einzuholen.
              </div>
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">Label placement</FormLabel> */}
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    checked={belehrung == true}
                    sx={
                      belehrungErr
                        ? {
                            color: "red",
                            filter: "brightness(1.4)",
                            "& .MuiCheckbox-root": { color: "red" },
                          }
                        : {
                            color: "#ffa382",
                            filter: "brightness(1)",
                            "& .MuiCheckbox-root": { color: "#ffa382" },
                          }
                    }
                    control={
                      <Checkbox
                        color={`success`}
                        onChange={() => {
                          setBelehrungErr(false)
                          if (belehrung == false) {
                            setBelehrung(true)
                          } else {
                            setBelehrung(false)
                          }
                        }}
                      />
                    }
                    label="Ich stimme zu "
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </div>
            <Button
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 10,

                "&.MuiButton-outlined": {
                  color: "#ffa382",
                  border: "none",
                },
              }}
              variant="outlined"
              className={styleNorm.BtnPersonal}
              onClick={async () => {
                const options = {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
                if (!vorname) {
                  setVornameErr(true)
                } else {
                  setVornameErr(false)
                }

                if (!nachname) {
                  setNachnameErr(true)
                } else {
                  setNachnameErr(false)
                }

                if (!geburtsdatum) {
                  setGeburtsdatumErr(true)
                } else {
                  const birthdate = new Date(geburtsdatum).toLocaleDateString(
                    "de-DE",
                    options
                  )
                  const today = new Date().toLocaleDateString("de-DE", options)

                  if (birthdate == today) {
                    setGeburtsdatumErr(true)
                  } else {
                    setGeburtsdatumErr(false)
                  }
                }

                if (!telefonNummer) {
                  setTelefonNummerErr(true)
                } else {
                  setTelefonNummerErr(false)
                }

                if (!email) {
                  setEmailErr(true)
                } else {
                  setEmailErr(false)
                }

                if (!auswahlStrasse) {
                  setStrassenErr(true)
                } else {
                  setStrassenErr(false)
                }

                if (!ort) {
                  setOrtErr(true)
                } else {
                  setOrtErr(false)
                }

                if (zahlung == "SEPA") {
                  if (!iban) {
                    setIbanErr(true)
                  } else {
                    setIbanErr(false)
                  }
                }

                if (lieferart == "wechseln") {
                  if (!vorversorgerAuswahl) {
                    setVVErr(true)
                  } else {
                    setVVErr(false)
                  }
                }

                if (!belehrung) {
                  setBelehrungErr(true)
                }

                /* Function to go further to Sign */

                if (vorname && nachname) {
                  console.log(
                    telefonNummer,
                    email,
                    auswahlStrasse,
                    ort,
                    geburtsdatum
                  )
                  if (
                    telefonNummer &&
                    email &&
                    auswahlStrasse &&
                    ort &&
                    ortErr == false &&
                    geburtsdatum
                  ) {
                    if (lieferart == "neu") {
                      if (belieferungsdatum && belieferungsdatumErr == false) {
                        if (belehrung == true && belehrungErr == false) {
                          if (zahlung == "SEPA") {
                            if (iban) {
                              console.log("test")
                              await setKundendaten({
                                Anrede: anrede,
                                Vorname: vorname,
                                Nachname: nachname,
                                Geburtsdatum: geburtsdatum,
                                Telefonnummer: telefonNummer,
                                EMail: email,
                                Strasse: auswahlStrasse,
                                HausNr: hausNr,
                                Zahlungsart: "SEPA",
                                IBAN: iban,
                                Lieferart: "neu",
                                Lieferdatum: belieferungsdatum,
                                Vorversorger: null,
                              })
                              console.log("sepa")

                              setTimeout(() => {
                                router.push("/sign")
                              }, 500)
                            }
                          }

                          if (zahlung == "Selbstzahler") {
                            console.log("test2")
                            await setKundendaten({
                              Anrede: anrede,
                              Vorname: vorname,
                              Nachname: nachname,
                              Geburtsdatum: geburtsdatum,
                              Telefonnummer: telefonNummer,
                              EMail: email,
                              Strasse: auswahlStrasse,
                              HausNr: hausNr,
                              Zahlungsart: "Selbstzahler",
                              IBAN: null,
                              Lieferart: "neu",
                              Lieferdatum: belieferungsdatum,
                              Vorversorger: null,
                            })

                            console.log("selbstzahler")

                            setTimeout(() => {
                              router.push("/sign")
                            }, 500)
                          }
                        }
                      }
                    }

                    if (lieferart == "wechseln") {
                      if (belieferungsdatum) {
                        if (vorversorgerAuswahl) {
                          const vv = vorversorgerAuswahlFull.filter(
                            (e) => e.name == vorversorgerAuswahl
                          )
                          if (belieferungsdatum) {
                            if (belehrung == true && belehrungErr == false) {
                              if (zahlung == "SEPA") {
                                if (iban) {
                                  await setKundendaten({
                                    Anrede: anrede,
                                    Vorname: vorname,
                                    Nachname: nachname,
                                    Geburtsdatum: geburtsdatum,
                                    Telefonnummer: telefonNummer,
                                    EMail: email,
                                    Strasse: auswahlStrasse,
                                    HausNr: hausNr,
                                    Zahlungsart: "SEPA",
                                    IBAN: iban,
                                    Lieferart: "wechseln",
                                    Lieferdatum: belieferungsdatum,
                                    Vorversorger: vv,
                                  })
                                }
                              }

                              if (zahlung == "Selbstzahler") {
                                await setKundendaten({
                                  Anrede: anrede,
                                  Vorname: vorname,
                                  Nachname: nachname,
                                  Geburtsdatum: geburtsdatum,
                                  Telefonnummer: telefonNummer,
                                  EMail: email,
                                  Strasse: auswahlStrasse,
                                  HausNr: hausNr,
                                  Zahlungsart: "Selbstzahler",
                                  IBAN: null,
                                  Lieferart: "wechseln",
                                  Lieferdatum: belieferungsdatum,
                                  Vorversorger: vv,
                                })
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }}
            >
              <ContentPasteGoIcon style={{ transform: "translateX(-5px)" }} />
              Auftrag erfassen...
            </Button>
          </div>
        </div>
      </section>
      <Kontakt />
    </div>
  )
}

export default Formular
