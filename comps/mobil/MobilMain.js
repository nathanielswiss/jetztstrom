import stylesMobile from "../../styles/Mobile/MainMobile.module.scss"
import { motion } from "framer-motion"
import { useContext } from "react"
import { ThemeContext } from "../../context/DataContext"

const MobilMain = ({ kwhJahr, setkwhJahr }) => {
  const [themer, UpdateThemer] = useContext(ThemeContext)
  return (
    <div className={stylesMobile.MainMobile}>
      <section>
        <div className={stylesMobile.box}>
          {" "}
          <img
            src={themer == "dark" ? "/jsodark.png" : "/jsohell.png"}
            alt=""
          />
        </div>
        <div className={stylesMobile.box2}>
          <motion.div
            initial={{ opacity: 0, x: -300, y: -100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.7, delay: 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
            className={
              themer == "light"
                ? stylesMobile.siranLogo
                : stylesMobile.siranLogoDark
            }
            exit={{ opacity: 0, x: -300, y: 100 }}
          >
            <motion.img src="/svg.svg" alt="Siran Logo" />
          </motion.div>
        </div>
        <div
          style={{ border: "2px solid green", color: "violet", height: "100%" }}
        >
          test
        </div>
      </section>
      <footer>test footer</footer>
    </div>
  )
}

export default MobilMain
