import Head from "next/head"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import styles from "../styles/Home.module.scss"
import { motion } from "framer-motion"
import HeadTag from "../comps/HeadTag"
import { ThemeContext } from "../context/DataContext"
import DesktopMain from "../comps/desktop/DesktopMain"
import MobilMain from "../comps/mobil/MobilMain"

export default function Home() {
  /* States */
  const [kwhJahr, setkwhJahr] = useState(2500)

  return (
    <>
      <HeadTag title={`JetztStrom.de | Der Tarifvergleich`} />
      <main className={styles.MainFrame}>
        <DesktopMain
          kwhJahr={kwhJahr}
          setkwhJahr={(value) => setkwhJahr(value)}
        />
        <MobilMain
          kwhJahr={kwhJahr}
          setkwhJahr={(value) => setkwhJahr(value)}
        />
      </main>
    </>
  )
}
