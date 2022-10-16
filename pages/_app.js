import "../styles/globals.scss"
import { motion, AnimatePresence } from "framer-motion"
import Layout from "../Layout/layout"
import * as gtag from "../lib/gtag"
import {
  DataProvider,
  ScrollProvider,
  AuthProvider,
  TarifBlockProvider,
  CustomerProvider,
  KundendatenProvider,
  ThemeProvider,
} from "../context/DataContext"
import { useEffect } from "react"
import { useRouter } from "next/router"

const pageVariants = {
  pageInitial: {
    opacity: 1,
    y: 0,
    x: 0,
  },
  pageAnimate: {
    opacity: 1,
    y: 0,
    x: 0,
  },
  pageExit: {
    opacity: 1,
    y: 0,
    x: 0,
  },
}

const pageMotionProps = {
  initial: "pageInitial",
  animate: "pageAnimate",
  exit: "pageExit",
  variants: pageVariants,
}

function MyApp({ Component, pageProps, router: routerPass }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
  return (
    <ThemeProvider>
      <KundendatenProvider>
        <CustomerProvider>
          <TarifBlockProvider>
            <AuthProvider>
              <ScrollProvider>
                <DataProvider>
                  <Layout>
                    <AnimatePresence exitBeforeEnter>
                      <motion.div key={routerPass.route} {...pageMotionProps}>
                        <Component {...pageProps} />
                      </motion.div>
                    </AnimatePresence>
                  </Layout>
                </DataProvider>
              </ScrollProvider>
            </AuthProvider>
          </TarifBlockProvider>
        </CustomerProvider>
      </KundendatenProvider>
    </ThemeProvider>
  )
}

export default MyApp
