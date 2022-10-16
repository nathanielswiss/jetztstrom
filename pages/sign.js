import Orte from "../public/ort.json"
import AutoCompleteOrt from "../comps/AutoCompleteOrt"
import { useEffect, useContext, useState, useRef } from "react"
import moment from "moment"
import {
  TarifBlockContext,
  DataContext,
  KundendatenContext,
  ThemeContext,
} from "../context/DataContext"
import styleNorm from "../styles/Norm/MainNorm.module.scss"
import BoltIcon from "@mui/icons-material/Bolt"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import SignaturePad from "react-signature-pad-wrapper"
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
import FooterDesktop from "../comps/desktop/FooterDesktop"

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

  const signature = useRef(null)

  const [signAni, setSignAni] = useState(true)
  const [signErr, UpdateSignErr] = useState(false)
  const [abschluss, setAbschluss] = useState(false)
  const [fertig, setFertig] = useState(false)
  const [good, setGood] = useState(false)
  const SignDate = moment().format("YYYY-MM-DD")

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
            <div className={styleNorm.return}></div>
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
              <div className={styleNorm.profileIcon} style={{ border: "none" }}>
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
        <motion.div
          initial={{ opacity: 0, y: -150 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { type: "tween", delay: 0.4 },
          }}
          exit={{ opacity: 0, y: 0 }}
          className={themer == "light" ? styleNorm.Form : styleNorm.FormDark}
        >
          <div className={styleNorm.PersonalienFrame}>
            <Stepper activeStep={1} className={c.root}>
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
          <div className={styleNorm.Signing}>
            <div className={styleNorm.Title}>
              <i className="fas fa-file-signature" />
              <h2>
                Digitaler <br /> Unterschrift
              </h2>
            </div>
            <div>
              <div
                className={styleNorm.SignaturePad}
                data-alert={
                  signErr == false
                    ? `Hier unten unterschreiben...`
                    : `Bitte unterschreiben...`
                }
              >
                <div
                  className={styleNorm.Pad}
                  style={
                    signErr == false
                      ? { border: "#a82d00 4px solid" }
                      : { border: "red 4px solid" }
                  }
                  onMouseEnter={() => setSignAni(false)}
                  onMouseLeave={() => {
                    if (signature.current.isEmpty()) {
                      setSignAni(true)
                    } else {
                      setSignAni(false)
                    }
                  }}
                >
                  <SignaturePad
                    ref={signature}
                    options={{
                      minWidth: 2,
                      maxWidth: 2,
                      penColor: "rgb(26, 160, 218)",
                    }}
                  />
                  <img
                    src="sign.gif"
                    alt="Sign Animation"
                    style={signAni ? { display: "flex" } : { display: "none" }}
                  />
                </div>
                <div className={styleNorm.signEraser}>
                  <i
                    className="fas fa-eraser"
                    onClick={() => {
                      signature.current.clear()
                    }}
                  />
                </div>
                <div className={styleNorm.signListe}>
                  Mit Ihren Unterschrift bestätigen Sie den von Ihnen
                  ausgewählten Tarif, die links angezeigt wird. Wir, die
                  JetztStrom.de haben die Erlaubnis als Vertreter, alles zu
                  unternehmen mit Ihre Daten, um Ihnen den Best mögliche Angebot
                  zukommen zu lassen.
                </div>
              </div>
            </div>
          </div>

          <div className={styleNorm.Form3}>
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
                if (signature.current.isEmpty()) {
                  UpdateSignErr(true)
                  setSignAni(true)
                  setGood(false)
                } else {
                  UpdateSignErr(false)
                  setSignAni(false)
                  setGood(true)
                  await sessionStorage.setItem(
                    "sign",
                    signature.current.toDataURL()
                  )

                  const customer = await sessionStorage
                  const Kundendaten = JSON.parse(customer.Kundendaten)

                  const TarifData = JSON.parse(
                    window.localStorage.getItem("cardSelected")
                  )

                  /* DEBIT - NEW CUSTOMER*/
                  const dataAuftragDebitNew = {
                    delivery: {
                      country: "81",
                      zip: new String(customer.ortschaft).slice(0, 5),
                      city: new String(customer.ortschaft).slice(6),
                      street: Kundendaten.Strasse,
                      houseNumber: Kundendaten.HausNr,
                    },
                    contactPerson: {
                      salutation:
                        Kundendaten.Anrede == "Herr" ? "Herr" : "Frau",
                      firstName: Kundendaten.Vorname,
                      lastName: Kundendaten.Nachname,
                      birthday: moment(Kundendaten.Geburtsdatum).format(
                        "YYYY-MM-DD"
                      ),
                    },
                    contact: {
                      phoneNumber: Kundendaten.Telefonnummer,
                      email: Kundendaten.EMail,
                    },
                    payment: {
                      paymentType: "debit",
                    },
                    products: [
                      {
                        rateId: TarifData.rateId,
                        consum: customer.kwhJahrAuswahl,
                        branch:
                          TarifData.branch == "electric" ? "electric" : "gas",
                        type:
                          TarifData.type == "private" ? "private" : "company",
                        sigDate: SignDate,
                        deliveryType: "new",
                        deliveryDate: moment(Kundendaten.Lieferdatum).format(
                          "YYYY-MM-DD"
                        ),
                        counterNumber: customer.zaehlerNr,
                      },
                    ],
                  }

                  /* SEPA - NEW CUSTOMER  */

                  /* const dataAuftragSepaNew = {
                    delivery: {
                      country: "81",
                      zip: new String(customer.ortschaft).slice(0, 5),
                      city: new String(customer.ortschaft).slice(6),
                      street: Kundendaten.Strasse,
                      houseNumber: Kundendaten.HausNr,
                    },
                    contactPerson: {
                      salutation:
                        Kundendaten.Anrede == "Herr" ? "Herr" : "Frau",
                      firstName: Kundendaten.Vorname,
                      lastName: Kundendaten.Nachname,
                      birthday: moment(Kundendaten.Geburtsdatum).format(
                        "YYYY-MM-DD"
                      ),
                    },
                    contact: {
                      phoneNumber: Kundendaten.Telefonnummer,
                      email: Kundendaten.EMail,
                    },
                    payment: {
                      paymentType: "sepa",
                      iban:
                        Kundendaten.Zahlungsart == "SEPA"
                          ? Kundendaten.IBAN_Data
                          : "none",
                    },
                    products: [
                      {
                        rateId: TarifData.rateId,
                        consum: customer.kwhJahrAuswahl,
                        branch:
                          TarifData.branch == "electric" ? "electric" : "gas",
                        type:
                          TarifData.type == "private" ? "private" : "company",
                        sigDate: SignDate,
                        deliveryType: "new",
                        deliveryDate: moment(Kundendaten.Lieferdatum).format(
                          "YYYY-MM-DD"
                        ),
                        counterNumber: customer.zaehlerNr,
                      },
                    ],
                  } */

                  /* DEBIT - WECHSEL */

                  /* const dataAuftragDebitChange = {
                    delivery: {
                      country: "81",
                      zip: new String(customer.ortschaft).slice(0, 5),
                      city: new String(customer.ortschaft).slice(6),
                      street: Kundendaten.Strasse,
                      houseNumber: Kundendaten.HausNr,
                    },
                    contactPerson: {
                      salutation:
                        Kundendaten.Anrede == "Herr" ? "Herr" : "Frau",
                      firstName: Kundendaten.Vorname,
                      lastName: Kundendaten.Nachname,
                      birthday: moment(Kundendaten.Geburtsdatum).format(
                        "YYYY-MM-DD"
                      ),
                    },
                    contact: {
                      phoneNumber: Kundendaten.Telefonnummer,
                      email: Kundendaten.EMail,
                    },
                    payment: {
                      paymentType: "debit",
                    },
                    products: [
                      {
                        rateId: TarifData.rateId,
                        consum: customer.kwhJahrAuswahl,
                        branch:
                          TarifData.branch == "electric" ? "electric" : "gas",
                        type:
                          TarifData.type == "private" ? "private" : "company",
                        sigDate: SignDate,
                        deliveryType: "change",
                        deliveryDate: moment(Kundendaten.Lieferdatum).format(
                          "YYYY-MM-DD"
                        ),
                        counterNumber: customer.zaehlerNr,
                        beforeProviderCustomerId: customer.Kundennummer,
                        beforeProviderName:
                          Kundendaten.Lieferart == "wechseln"
                            ? Kundendaten.Vorversorger
                            : "none",
                        beforeProviderId:
                          customer.Lieferart == "wechseln"
                            ? customer.Vorversorger_vdew
                            : "none",
                      },
                    ],
                  } */

                  /* SEPA - WECHSELN */

                  /* const dataAuftragSepaChange = {
                    delivery: {
                      country: "81",
                      zip: new String(customer.ortschaft).slice(0, 5),
                      city: new String(customer.ortschaft).slice(6),
                      street: Kundendaten.Strasse,
                      houseNumber: Kundendaten.HausNr,
                    },
                    contactPerson: {
                      salutation:
                        Kundendaten.Anrede == "Herr" ? "Herr" : "Frau",
                      firstName: Kundendaten.Vorname,
                      lastName: Kundendaten.Nachname,
                      birthday: moment(Kundendaten.Geburtsdatum).format(
                        "YYYY-MM-DD"
                      ),
                    },
                    contact: {
                      phoneNumber: Kundendaten.Telefonnummer,
                      email: Kundendaten.EMail,
                    },
                    payment: {
                      paymentType: "sepa",
                      iban:
                        Kundendaten.Zahlungsart == "SEPA"
                          ? Kundendaten.IBAN.BankResponse.data.iban
                          : "none",
                    },
                    products: [
                      {
                        rateId: TarifData.rateId,
                        consum: customer.kwhJahrAuswahl,
                        branch:
                          TarifData.branch == "electric" ? "electric" : "gas",
                        type:
                          TarifData.type == "private" ? "private" : "company",
                        sigDate: SignDate,
                        deliveryType: "change",
                        deliveryDate: moment(Kundendaten.Lieferdatum).format(
                          "YYYY-MM-DD"
                        ),
                        counterNumber: sessionStorage.getItem("boxnr"),
                        beforeProviderCustomerId: customer.Kundennummer,
                        beforeProviderName:
                          Kundendaten.Lieferart == "wechseln"
                            ? Kundendaten.Vorversorger
                            : "none",
                        beforeProviderId:
                          Kundendaten.Lieferart == "wechseln"
                            ? Kundendaten.Vorversorger_vdew
                            : "none",
                      },
                    ],
                  } */

                  /*  let RequestInfos =
                    Kundendaten.Zahlungsart == "SEPA"
                      ? Kundendaten.Lieferart == "neu"
                        ? dataAuftragSepaNew
                        : dataAuftragSepaChange
                      : Kundendaten.Lieferart == "neu"
                      ? dataAuftragDebitNew
                      : dataAuftragDebitChange

                  setTimeout(() => {
                    setAbschluss(true)
                  }, 1500)

                  await fetch(`${Path}/api/abschlussmob`, {
                    method: "PUT",
                    headers: {
                      "Content-type": "application/json",
                      Authorization: `Bearer ${EgonToken}`,
                    },
                    body: JSON.stringify({
                      RequestInfos: RequestInfos,
                      token: AuthToken,
                      signature: sessionStorage.getItem("sign"),
                    }),
                  })
                    .then((resp) => resp.json())
                    .then(async (data) => {
                      if (data.order.error == true) {
                        setTimeout(() => {
                          setAngaben(true)
                        }, 500)

                        setTimeout(() => {
                          setTarifLoad(true)
                        }, 1200)

                        setTimeout(() => {
                          setSignLoad(true)
                        }, 1800)

                        setTimeout(() => {
                          setProcess(true)
                        }, 2200)
                      } else {
                        setTimeout(() => {
                          setAngaben(true)
                        }, 500)

                        setTimeout(() => {
                          setTarifLoad(true)
                        }, 1200)

                        setTimeout(() => {
                          setSignLoad(true)
                        }, 1800)

                        setTimeout(() => {
                          setProcess(true)
                        }, 2300)
                      }

                      console.log(data)
                      setTimeout(() => {
                        setFertig(true)
                      }, 3800)

                      setTimeout(async () => {
                        await UpdateEgonData(data)
                      }, 4200)
                    })*/
                }
              }}
            >
              <ContentPasteGoIcon style={{ transform: "translateX(-5px)" }} />
              Unterschrift bestätigen...
            </Button>
          </div>
        </motion.div>
      </section>
      {abschluss && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styleNorm.FinishBox}
        >
          {EgonData == null && (
            <motion.div
              className={styleNorm.FinishDetails}
              initial={
                fertig == false ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }
              }
              animate={
                fertig == false ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }
              }
            >
              <div className={styleNorm.toploader}>
                <LinearProgress color={`success`} sx={{ height: 7 }} />
              </div>
              <div className={styleNorm.FDone}>
                <ul>
                  <li>
                    {angaben == false ? (
                      <CircularProgress size={22} color="success" />
                    ) : (
                      <CheckIcon color="success" />
                    )}
                    <div>Ihre Angaben werden übermittelt...</div>
                  </li>
                  <li>
                    {tarifLoad == false ? (
                      <CircularProgress size={22} color="success" />
                    ) : (
                      <CheckIcon color="success" />
                    )}
                    <div>Ihr Tarif wird beantragt...</div>
                  </li>
                  <li>
                    {signLoad == false ? (
                      <CircularProgress size={22} color="success" />
                    ) : (
                      <CheckIcon color="success" />
                    )}
                    <div>Ihr Unterschrift wird übermittelt...</div>
                  </li>
                  <li>
                    {process == false ? (
                      <CircularProgress size={22} color="success" />
                    ) : (
                      <CheckIcon color="success" />
                    )}
                    <div>Vertrag abgeschlossen...</div>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
          {EgonData && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.7, type: "spring", stiffness: 150 },
              }}
              className={styleNorm.KundenKarte}
            >
              <div className={styleNorm.karte_logo}>
                <SVG />
              </div>
              <div className={styleNorm.qrcode}>
                <img
                  src={
                    (EgonData.order.orderNo &&
                      `https://api.qrserver.com/v1/create-qr-code/?data=JetzStrom Kundennummer:${EgonData.Kundennummer} Auftragsnummer:${EgonData.order.orderNo} &amp ;size=100x100`) ||
                    (EgonData.order.error == true &&
                      `https://api.qrserver.com/v1/create-qr-code/?data=JetzStrom Kundennummer:${EgonData.Kundennummer}&amp;size=100x100`)
                  }
                  alt=""
                />
              </div>
              <div className={styleNorm.kundennamen}>
                {(EgonData.order.error == true &&
                  `${EgonData.order.data.contactPerson.firstName} ${EgonData.order.data.contactPerson.lastName}`) ||
                  (EgonData.order.orderNo &&
                    `${EgonData.data.contactPerson.firstName} ${EgonData.data.contactPerson.lastName}`)}
              </div>
              <div className={styleNorm.KundenKarteNr}>
                {EgonData.Kundennummer}
              </div>
              {EgonData.order.orderNo && (
                <div className={styles.Auftragsnummer}>
                  {EgonData.order.orderNo}
                </div>
              )}
              <div className={styleNorm.ccChip}>
                <img src="/ccchip.png" alt="" />
              </div>
              <div className={styleNorm.fertigstellen}>
                <Button
                  variant="contained"
                  color={`primary`}
                  onClick={() => {
                    if (EgonData.order.orderNo) {
                      setTimeout(() => {
                        router.push("/pdfview")
                        //UpdatePDFView(EgonData)
                      }, 300)
                    }

                    if (EgonData.order.error == true) {
                      setTimeout(() => {
                        router.push("/")
                      }, 300)
                    }
                  }}
                >
                  weiter
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
      <FooterDesktop />
    </div>
  )
}

export default Formular
