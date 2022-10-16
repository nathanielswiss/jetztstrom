import styles from "../../styles/Norm/MainNorm.module.scss"
import Image from "next/image"
import { motion } from "framer-motion"
import { ThemeContext } from "../../context/DataContext"
import { useContext, useState } from "react"
import { LocationOn, LocalPhone, Email } from "@mui/icons-material"
import Link from "next/link"

const FooterDesktop = () => {
  const [themer, UpdateThemer] = useContext(ThemeContext)
  return (
    <footer id="kontakt">
      <div className={styles.footerGrid}>
        <motion.div
          initial={{ opacity: 0, x: -300, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.7, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className={styles.jetztstrom}
        >
          <div>
            <Image src={"/j.png"} width="170%" height="170%" />
          </div>
          <div>
            <h2>JetztStrom.de</h2>
            <p>
              © 2022 Ads.NRW - Vergleichsportal Energie . Alle Inhalte
              unterliegen unserem Copyright.
            </p>
          </div>
        </motion.div>
        <div className={styles.footerInfos}>
          <div className={styles.InfoGrid}>
            <motion.div
              initial={{ opacity: 0, x: -300, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.7, delay: 0.5 }}
              viewport={{ once: false, amount: 0.6 }}
              className={styles.Location}
            >
              <article>
                <h2> JetztStrom.de</h2>
                <h4>c/o DSL24SHOP e.K</h4>
              </article>

              <div>
                <span>
                  <LocationOn />
                </span>
                <p>
                  Berliner Allee 59 <br />
                  40212 Düsseldorf
                  <br /> Germany
                </p>
              </div>

              <Link href="tel:080037776606">
                <div style={{ cursor: "pointer" }}>
                  <span>
                    <LocalPhone />
                  </span>
                  <p> 0800 3777 6606</p>
                </div>
              </Link>
              <Link href="mailto:info@jetztstrom.de">
                <div style={{ cursor: "pointer" }}>
                  <span>
                    <Email />
                  </span>
                  <p>info@jetztstrom.de</p>
                </div>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -300, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.7, delay: 0.7 }}
              viewport={{ once: false, amount: 0.6 }}
              className={styles.feeds}
            >
              <ul>
                <li>Unsere AGB</li>
                <li>Impressum</li>
                <li>Datenschutz</li>
              </ul>
            </motion.div>
          </div>
          <div className="mapouter">
            <motion.div
              initial={{ opacity: 0, x: -300, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.7, delay: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="gmap_canvas"
            >
              <embed
                style={
                  themer == "light"
                    ? { filter: "grayscale(0)" }
                    : { filter: "grayscale(0.2) contrast(100%) invert(92%)" }
                }
                width="100%"
                height="100%"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=berliner%20alle%2059&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
              ></embed>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterDesktop
