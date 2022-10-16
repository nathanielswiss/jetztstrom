import React, { useState, createContext } from "react"

export const DataContext = createContext()

export const DataProvider = (props) => {
  const [daten, setDaten] = useState("")

  return (
    <DataContext.Provider value={[daten, setDaten]}>
      {props.children}
    </DataContext.Provider>
  )
}

/*  */

export const ThemeContext = createContext()

export const ThemeProvider = (props) => {
  const [themer, UpdateThemer] = useState(null)

  return (
    <ThemeContext.Provider value={[themer, UpdateThemer]}>
      {props.children}
    </ThemeContext.Provider>
  )
}
/*  */

export const CustomerContext = createContext()

export const CustomerProvider = (props) => {
  const [customer, setCustomer] = useState("")

  return (
    <CustomerContext.Provider value={[customer, setCustomer]}>
      {props.children}
    </CustomerContext.Provider>
  )
}

export const ScrollContext = createContext()

export const ScrollProvider = (props) => {
  const [scrollMain, setScrollMain] = useState(null)

  return (
    <ScrollContext.Provider value={[scrollMain, setScrollMain]}>
      {props.children}
    </ScrollContext.Provider>
  )
}

export const TarifBlockContext = createContext()

export const TarifBlockProvider = (props) => {
  const [TarifBlock, setTarifBlock] = useState(null)

  return (
    <TarifBlockContext.Provider value={[TarifBlock, setTarifBlock]}>
      {props.children}
    </TarifBlockContext.Provider>
  )
}

/* Auth */
export const AuthContext = createContext()

export const AuthProvider = (props) => {
  const [AuthToken, UpdateAuthToken] = useState("")

  return (
    <AuthContext.Provider value={[AuthToken, UpdateAuthToken]}>
      {props.children}
    </AuthContext.Provider>
  )
}

/* Auth */
export const SelectTarifContext = createContext()

export const SelectTarifProvider = (props) => {
  const [SelectTarif, setSelectTarif] = useState("")

  return (
    <SelectTarifContext.Provider value={[SelectTarif, setSelectTarif]}>
      {props.children}
    </SelectTarifContext.Provider>
  )
}

/* Kundendaten */

export const KundendatenContext = createContext()

export const KundendatenProvider = (props) => {
  const [Kundendaten, setKundendaten] = useState("")

  return (
    <KundendatenContext.Provider value={[Kundendaten, setKundendaten]}>
      {props.children}
    </KundendatenContext.Provider>
  )
}

export const PDFContext = createContext()

export const PDFProvider = (props) => {
  const [pdfView, UpdatePDFView] = useState("")

  return (
    <PDFContext.Provider value={[pdfView, UpdatePDFView]}>
      {props.children}
    </PDFContext.Provider>
  )
}
