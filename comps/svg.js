import {motion} from 'framer-motion'
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.scss'

const SVG = ({page}) => {

    const router = useRouter()

    return ( 
      
        <motion.svg className={styles.logoSVG}
            initial={{opacity:0,x:-120}}
            animate={{opacity:1, x:0, transition: { delay: 0.6, type: 'spring', stiffness: 150  }}}
            viewBox="0 0 1192.72 342.17">
            <defs>
                <linearGradient id="linear-gradient" x1="521.44" y1="383.99" x2="1631.57" y2="1035.89" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#0092d1"/>
                    <stop offset="1" stopColor="#001e4e" />
                </linearGradient>
                <linearGradient id="linear-gradient-2" x1="544.39" y1="344.92" x2="1654.51" y2="996.81" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-3" x1="557.55" y1="322.51" x2="1667.67" y2="974.41" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-4" x1="579.43" y1="285.25" x2="1689.55" y2="937.15" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-5" x1="599.63" y1="250.85" x2="1709.75" y2="902.75" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-6" x1="616.91" y1="221.41" x2="1727.04" y2="873.31" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-7" x1="629.83" y1="199.41" x2="1739.96" y2="851.3" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-8" x1="648.15" y1="168.21" x2="1758.28" y2="820.11" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-9" x1="675.28" y1="122.02" x2="1785.4" y2="773.92" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-10" x1="685.41" y1="104.77" x2="1795.53" y2="756.67" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-11" x1="727.6" y1="32.92" x2="1837.73" y2="684.82" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-12" x1="739.78" y1="12.17" x2="1849.91" y2="664.07" xlinkHref="#linear-gradient"/>
                <linearGradient id="linear-gradient-13" x1="506.96" y1="420" x2="1617.09" y2="1071.9" xlinkHref="#linear-gradient"/>
                </defs>
                
                <path  className="cls-1"  d="M772.43,553.69a52,52,0,0,1,3.14-18.87,39.39,39.39,0,0,1,8.29-13.38,33.64,33.64,0,0,1,11.9-8,37,37,0,0,1,13.77-2.66q16.44,0,25.2,10.25t8.77,31.23v2.42a21,21,0,0,1-.16,2.74H787.62q.93,12.69,7.35,19.26t20,6.57a53.19,53.19,0,0,0,12.91-1.33,47.46,47.46,0,0,0,7.91-2.58l2,12.21a42.86,42.86,0,0,1-9.31,3,66.4,66.4,0,0,1-15.1,1.57,48.13,48.13,0,0,1-18.4-3.21,34.24,34.24,0,0,1-12.75-8.85,36,36,0,0,1-7.44-13.38A56.55,56.55,0,0,1,772.43,553.69Zm55.89-8q.15-9.86-4.93-16.2t-14-6.34a19.26,19.26,0,0,0-8.85,2,20.79,20.79,0,0,0-6.49,5.09,23.23,23.23,0,0,0-4.15,7.2,35,35,0,0,0-2,8.29Z" transform="translate(-502.29 -365.93)"/>

                <path className="cls-2" d="M878.09,512.83h30.84V525H878.09v37.57A44.85,44.85,0,0,0,879,572.7a15.27,15.27,0,0,0,2.82,6.27,10.06,10.06,0,0,0,4.69,3.2,20.72,20.72,0,0,0,6.58.94,31,31,0,0,0,10.56-1.48c2.66-1,4.52-1.7,5.56-2.12l2.82,12.06a54.71,54.71,0,0,1-7.67,2.74A43.87,43.87,0,0,1,891.87,596a38.14,38.14,0,0,1-13.7-2.11,20,20,0,0,1-8.69-6.34,25.48,25.48,0,0,1-4.62-10.41,69.13,69.13,0,0,1-1.33-14.33V490.13l14.56-2.5Z" transform="translate(-502.29 -365.93)"/>

                <path className="cls-3" d="M981.4,523.79q-3.28,3.6-8.69,10.17t-11.58,14.56q-6.18,8-12.37,16.75T937.88,582h44.77v12.21H920.51v-9.71q3.75-6.88,9.24-15.18t11.5-16.52q6-8.21,11.74-15.49T962.93,525H922.7V512.83h58.7Z" transform="translate(-502.29 -365.93)"/>
                
                <path className="cls-4" d="M1014.74,512.83h30.84V525h-30.84v37.57a44.85,44.85,0,0,0,.94,10.09,15,15,0,0,0,2.82,6.27,10.06,10.06,0,0,0,4.69,3.2,20.72,20.72,0,0,0,6.58.94,31,31,0,0,0,10.56-1.48c2.66-1,4.52-1.7,5.56-2.12l2.82,12.06a54.71,54.71,0,0,1-7.67,2.74,43.89,43.89,0,0,1-12.53,1.64,38.12,38.12,0,0,1-13.69-2.11,20,20,0,0,1-8.69-6.34,25.48,25.48,0,0,1-4.62-10.41,68.45,68.45,0,0,1-1.33-14.33V490.13l14.56-2.5Z" transform="translate(-502.29 -365.93)"/>
                
                <path className="cls-5" d="M1090.19,583.43q23.79,0,23.79-16.28a16.35,16.35,0,0,0-2.11-8.53,20.46,20.46,0,0,0-5.72-6.11,39.64,39.64,0,0,0-8.22-4.46q-4.62-1.87-9.78-3.76a98.62,98.62,0,0,1-11.27-4.61,39.65,39.65,0,0,1-9.24-6.11,26,26,0,0,1-6.18-8.37,27.62,27.62,0,0,1-2.27-11.74q0-14.25,9.71-22.23t26.76-8a70.68,70.68,0,0,1,17.93,2.11q8.06,2.11,11.81,4.62l-4.85,12.36a43.3,43.3,0,0,0-9.78-4,52.73,52.73,0,0,0-15.11-2,33.72,33.72,0,0,0-8.13.93,21,21,0,0,0-6.58,2.82,14,14,0,0,0-4.46,4.78,13.52,13.52,0,0,0-1.64,6.81,14.43,14.43,0,0,0,1.72,7.35,16.81,16.81,0,0,0,4.85,5.25,41.62,41.62,0,0,0,7.28,4.14q4.14,1.89,9.16,3.76,7,2.82,12.91,5.64a41.81,41.81,0,0,1,10.17,6.73,27,27,0,0,1,6.66,9.31,32.81,32.81,0,0,1,2.34,13.07q0,14.25-10.4,21.91t-29.35,7.67a74.57,74.57,0,0,1-11.82-.86,87.93,87.93,0,0,1-9.63-2,55,55,0,0,1-7.28-2.51q-3-1.32-4.77-2.27l4.54-12.52a68.27,68.27,0,0,0,11,4.54A56.35,56.35,0,0,0,1090.19,583.43Z" transform="translate(-502.29 -365.93)"/>
                
                <path className="cls-6" d="M1160.94,512.83h30.83V525h-30.83v37.57a44.85,44.85,0,0,0,.94,10.09,15.14,15.14,0,0,0,2.81,6.27,10.14,10.14,0,0,0,4.7,3.2,20.7,20.7,0,0,0,6.57.94,31,31,0,0,0,10.57-1.48q4-1.49,5.56-2.12l2.81,12.06a54.23,54.23,0,0,1-7.67,2.74,43.77,43.77,0,0,1-12.52,1.64,38.08,38.08,0,0,1-13.69-2.11,20,20,0,0,1-8.69-6.34,25.35,25.35,0,0,1-4.62-10.41,68.45,68.45,0,0,1-1.33-14.33V490.13l14.56-2.5Z" transform="translate(-502.29 -365.93)"/>
                
                <path className="cls-7" d="M1240.3,511.11c1.25,0,2.68.08,4.3.23s3.21.37,4.78.63,3,.52,4.3.78a26.1,26.1,0,0,1,2.9.71l-2.51,12.68a47.42,47.42,0,0,0-5.71-1.49,50.4,50.4,0,0,0-10.26-.86,38.39,38.39,0,0,0-8.06.86c-2.66.57-4.41,1-5.24,1.17v68.41h-14.56v-78a98.36,98.36,0,0,1,12.84-3.53A82.82,82.82,0,0,1,1240.3,511.11Z" transform="translate(-502.29 -365.93)"/>
                
                <path className="cls-8" d="M1342.51,553.53a51.45,51.45,0,0,1-2.82,17.53,40,40,0,0,1-7.9,13.46,34.93,34.93,0,0,1-12.13,8.69,40.1,40.1,0,0,1-30.68,0,34.88,34.88,0,0,1-12.14-8.69,40,40,0,0,1-7.9-13.46,55.65,55.65,0,0,1,0-35,39.93,39.93,0,0,1,7.9-13.54,34.75,34.75,0,0,1,12.14-8.69,40.1,40.1,0,0,1,30.68,0,34.8,34.8,0,0,1,12.13,8.69,39.93,39.93,0,0,1,7.9,13.54A51.64,51.64,0,0,1,1342.51,553.53Zm-15.18,0q0-13.77-6.19-21.84t-16.82-8.06q-10.65,0-16.83,8.06t-6.18,21.84q0,13.77,6.18,21.84t16.83,8.06q10.64,0,16.82-8.06T1327.33,553.53Z" transform="translate(-502.29 -365.93)"/>
                
                <path className="cls-9" d="M1363,515.18q5-1.24,13.23-2.66a113.62,113.62,0,0,1,19-1.41,35.77,35.77,0,0,1,13.15,2.11,23.08,23.08,0,0,1,8.92,6.19c.73-.53,1.88-1.26,3.44-2.2a38.63,38.63,0,0,1,5.79-2.73,61.22,61.22,0,0,1,7.67-2.35,38.68,38.68,0,0,1,9.08-1q9.39,0,15.34,2.74a22.08,22.08,0,0,1,9.32,7.75,30.28,30.28,0,0,1,4.54,11.89,90.08,90.08,0,0,1,1.17,15v45.71h-14.56V551.65a93.3,93.3,0,0,0-.7-12.37,23.94,23.94,0,0,0-2.66-8.6,12.19,12.19,0,0,0-5.32-5.09,19.83,19.83,0,0,0-8.69-1.65,32.3,32.3,0,0,0-12.13,2,24,24,0,0,0-6.5,3.52,53.61,53.61,0,0,1,1.88,8.93,80.72,80.72,0,0,1,.63,10.17v45.71h-14.56V551.65a82.87,82.87,0,0,0-.79-12.37,24.94,24.94,0,0,0-2.73-8.6,12.16,12.16,0,0,0-5.33-5.09,19.32,19.32,0,0,0-8.53-1.65c-1.46,0-3,.06-4.69.16s-3.27.24-4.78.39-2.89.34-4.14.55-2.09.37-2.51.47v68.72H1363Z" transform="translate(-502.29 -365.93)"/>
                
                <path className="cls-10" d="M1515,585.77a10.68,10.68,0,0,1-2.81,7.36,11,11,0,0,1-15.34,0,11,11,0,0,1,0-14.71,11,11,0,0,1,15.34,0A10.68,10.68,0,0,1,1515,585.77Z" transform="translate(-502.29 -365.93)"/><path className="cls-11" d="M1588.88,475.26l14.56-2.5V591.88q-5,1.41-12.84,2.82a102.26,102.26,0,0,1-18,1.41,45.64,45.64,0,0,1-16.9-3,36.24,36.24,0,0,1-12.84-8.45,37.42,37.42,0,0,1-8.22-13.38,51.43,51.43,0,0,1-2.89-17.77,57.88,57.88,0,0,1,2.43-17.22,38.49,38.49,0,0,1,7.12-13.46,32.35,32.35,0,0,1,11.5-8.77,37,37,0,0,1,15.58-3.13,37.88,37.88,0,0,1,12.44,1.88,38.94,38.94,0,0,1,8.06,3.6Zm0,54.79a30,30,0,0,0-7.67-4.23,29,29,0,0,0-11-2,23.48,23.48,0,0,0-10.73,2.27,19.71,19.71,0,0,0-7.28,6.26,26.51,26.51,0,0,0-4.06,9.47,52.3,52.3,0,0,0-1.26,11.74q0,14.25,7,22t18.78,7.75a74.26,74.26,0,0,0,9.94-.55,45.88,45.88,0,0,0,6.18-1.17Z" transform="translate(-502.29 -365.93)"/>
                
                <path className="cls-12" d="M1623.94,553.69a52,52,0,0,1,3.14-18.87,39.39,39.39,0,0,1,8.29-13.38,33.64,33.64,0,0,1,11.9-8A37,37,0,0,1,1661,510.8q16.44,0,25.2,10.25t8.77,31.23v2.42a21,21,0,0,1-.16,2.74h-55.72q.93,12.69,7.35,19.26t20,6.57a53.19,53.19,0,0,0,12.91-1.33,47.46,47.46,0,0,0,7.91-2.58l2,12.21a43.05,43.05,0,0,1-9.31,3,66.4,66.4,0,0,1-15.1,1.57,48.13,48.13,0,0,1-18.4-3.21,34.24,34.24,0,0,1-12.75-8.85,35.88,35.88,0,0,1-7.44-13.38A56.55,56.55,0,0,1,1623.94,553.69Zm55.89-8q.15-9.86-4.93-16.2t-14-6.34a19.26,19.26,0,0,0-8.85,2,20.79,20.79,0,0,0-6.49,5.09,23.23,23.23,0,0,0-4.15,7.2,35,35,0,0,0-2,8.29Z" transform="translate(-502.29 -365.93)"/>
                
                <path className="cls-13" d="M747.17,466.1c7.18-9,16-19.67,25.23-30.66,8.54-10.18,17.42-20.62,25.64-30.21,10.33-12.07,19.61-22.79,25.84-30,5.06-5.83,8.12-9.33,8.12-9.33-.55.4-4,3.09-9.74,7.49-7.28,5.62-18.14,14-31.08,24.07l-31,24.1-31,24.11-31,24.11-31,24.11L636,518l-.5.39-.51.39-.5.39-.5.39-.5.39-.5.39-.5.39-.5.39-.51.39-.5.39-.5.39-.28.22.4-.09.71-.15.72-.15.72-.14.72-.15.71-.14.72-.15.72-.14.73-.14.72-.14.72-.14.72-.14c10.43-2,29-5.41,45.76-7.49,12.65-1.57,24.31-2.39,30.74-1.32.49.09-4.08,10.22-10.57,24.08-5.37,11.47-12.06,25.48-18.3,38.49l-.3.62-.3.62c-.1.21-.2.41-.29.62l-.3.62-.3.62-.3.62-.3.62-.29.62-.3.62-.3.62-.3.62-.3.62-.29.62-.3.62-.3.61-.3.62-.3.62c-.1.21-.19.42-.29.62l-.3.62-.3.62-.3.62-.3.62-.3.62-.29.62-.3.61-.3.62-.3.62-.3.62-.3.62-.3.62-.29.62-.3.61-.3.62-.3.62-.3.62-.3.62-.3.62-.3.62c-.1.2-.2.41-.29.61l-.3.62-.3.62-.3.62-.3.62-.3.61-.3.62-.3.62-.3.62-.3.62-.3.62-.3.61-.29.62-.3.62-.3.62-.3.61-.3.62-.3.62-.3.62c-.1.21-.2.42-.3.61l-.3.62-.3.62-.3.62-.3.61-.3.62-.3.62-.26.54h0c-.11.19-.21.39-.31.58l-.32.59-.33.59c-.1.2-.21.4-.32.59s-.21.4-.32.59l-.33.59-.33.59-.32.59-.33.58-.33.58-.34.59-.33.58-.33.58-.34.57-.33.58c-.12.19-.23.38-.34.58s-.23.38-.34.57-.23.38-.34.57-.23.38-.34.57l-.35.57-.34.57c-.12.18-.23.37-.35.56s-.23.38-.35.56-.23.38-.35.57-.23.37-.35.56l-.35.55-.36.56-.35.56-.36.55-.36.55-.36.55-.36.55-.37.54-.36.54c-.12.19-.25.37-.37.55l-.37.54-.37.53-.37.54c-.13.18-.25.36-.38.53l-.37.53-.38.53c-.13.18-.26.35-.38.53s-.26.35-.38.53l-.39.52L651,640l-.39.52q-.18.26-.39.51l-.39.51-.39.51c-.14.17-.26.35-.4.52l-.4.5-.4.5-.4.51c-.14.16-.27.33-.41.5l-.41.49-.41.49c-.13.17-.27.33-.41.5l-.41.49-.42.48-.42.48-.41.49-.43.47-.43.48-.42.47-.43.48-.44.46-.44.46-.43.47c-.15.15-.3.3-.44.46l-.45.45-.45.45c-.14.15-.29.31-.44.45l-.45.45-.46.44c-.15.15-.3.3-.46.44l-.45.44-.47.43c-.15.15-.31.29-.47.43l-.46.43-.47.43-.48.42-.48.41-.48.42-.48.41-.49.41-.49.4-.49.4c-.16.14-.33.27-.5.4l-.5.39-.5.39-.5.39-.51.37-.52.38-.51.38-.52.37-.53.36-.52.36-.53.36-.54.35-.54.35-.54.35-.54.34-.56.33-.55.33-.56.33-.56.32-.57.32-.57.31-.57.31c-.19.11-.38.2-.58.3l-.58.3-.59.29-.59.3-.6.27-.6.28-.6.28-.62.26-.61.26-.62.26-.62.25c-.21.09-.43.16-.64.24l-.64.24-.64.23-.64.23-.66.22-.66.21-.65.22-.68.19-.67.19-.68.2-.69.18-.7.17-.69.16-.7.17-.72.15-.72.14-.72.14-.74.13-.74.12-.74.11-.75.12-.77.08-.77.09c-.26,0-.51.07-.77.09s-.53,0-.79.06l-.8.06c-.26,0-.52,0-.79.06l-.81,0-.83,0-.82,0h-3.4l-.88-.05-.89,0-.88,0-.92-.08-.92-.08-.91-.08-1-.12-1-.12-1-.12c-.33,0-.66-.11-1-.16l-1-.16-1-.16c-.35-.06-.69-.14-1-.21l-1-.21-1-.21-1.07-.26-1.08-.26-1.09-.27-1.12-.31-1.12-.32-1.15-.34c-.39-.11-.78-.24-1.18-.37l-1.17-.36-1.22-.42-1.23-.44-1-.33-.28-.11-1.3-.51-1.29-.5-1.34-.55-1.37-.6-1.39-.61c-21.62-10-33.09-25.63-38.41-43.36-.14-.46-.27-.94-.4-1.41s-.26-.92-.38-1.38-.22-.89-.33-1.33-.22-.88-.32-1.32l-.27-1.26c-.09-.42-.18-.84-.26-1.26s-.15-.8-.22-1.2-.15-.8-.22-1.2-.13-.78-.19-1.17-.12-.77-.17-1.15-.11-.76-.16-1.14-.1-.74-.14-1.11-.1-.74-.14-1.11-.07-.72-.1-1.08-.08-.71-.11-1.07l-.09-1.07c0-.34-.05-.69-.08-1s-.05-.69-.07-1l-.06-1c0-.33,0-.67,0-1s0-.68-.05-1l0-1c0-.33,0-.66,0-1s0-.66,0-1v-1q0-.48,0-1c0-.32,0-.64,0-1s0-.62,0-.94,0-.62,0-.93,0-.62,0-.93l0-.92c0-.31,0-.61,0-.92s0-.61,0-.91,0-.6,0-.9,0-.6.05-.9,0-.6,0-.9,0-.59.07-.88l.06-.88c0-.29,0-.59.07-.88s0-.58.08-.87.05-.58.08-.87,0-.58.08-.86,0-.58.08-.87.07-.56.1-.85l.09-.85.09-.85c0-.28.07-.56.11-.84s.07-.55.1-.83.07-.56.11-.84.07-.55.11-.83l.12-.83c0-.27.07-.55.11-.82l.12-.83c0-.27.08-.54.13-.81l.12-.81c0-.28.08-.55.13-.82s.09-.54.13-.8.09-.54.14-.81.08-.54.13-.8.09-.54.14-.8.09-.53.14-.8l.15-.79c0-.27.09-.53.14-.8l.15-.78.15-.79.15-.79c0-.26.11-.52.16-.78s.1-.51.16-.77l.15-.78c.06-.26.11-.52.16-.78s.11-.51.17-.77.11-.51.16-.77.11-.52.17-.77.11-.51.17-.77.11-.5.17-.76.11-.51.17-.76.11-.51.17-.76l.18-.76c.06-.25.11-.51.17-.76l.18-.75.18-.76.18-.75.18-.75c.07-.25.13-.5.19-.75s.12-.5.19-.74l.18-.75c.06-.25.13-.5.19-.74s.13-.5.19-.75.13-.49.19-.74l.15-.6,10.08,2.76,1.92.52a5.74,5.74,0,0,0,4.32-.52,5,5,0,0,0,2.41-2.84l10.16-31.55.06-.18a.44.44,0,0,0-.06-.39.5.5,0,0,0-.31-.23L542,506.89l.4.11,1.09-3.4V496l.61-1.88.41-1.28.13-.4a.62.62,0,0,0-.13-.6.7.7,0,0,0-.37-.25l-3.27-.9-.43-.11a.77.77,0,0,0-.65.11l-.14.11a.72.72,0,0,0-.14.24l-.52,1.63-.61,1.88v7.59l-1.11,3.46-11.32-3.1,1.15-3.57v-7.6l.6-1.88.36-1.11.13-.4a.62.62,0,0,0-.13-.6.7.7,0,0,0-.37-.25l-3.27-.89-.44-.12a.75.75,0,0,0-.65.12.66.66,0,0,0-.27.34L525,488l-.6,1.88v7.6l-1.17,3.62-7.19-2-.2-.05a.63.63,0,0,0-.43.05.53.53,0,0,0-.24.29l-9.65,30-.57,1.77a4.6,4.6,0,0,0,.57,4,5.32,5.32,0,0,0,3.08,2.22l10.42,2.85c-.06.15-.12.31-.17.47s-.16.46-.25.68l-.24.68-.24.69-.24.69c-.08.23-.15.46-.23.69s-.15.47-.23.7-.15.46-.23.7-.15.46-.22.7-.15.47-.22.71-.15.47-.22.71-.15.47-.22.71l-.21.71-.21.73c-.07.24-.14.48-.2.72l-.21.73c-.07.24-.14.48-.2.72s-.13.5-.2.74-.12.49-.19.74-.13.49-.19.74-.13.49-.19.74-.12.5-.18.75l-.18.75-.18.76c-.06.25-.13.5-.18.75s-.11.51-.17.77-.11.51-.17.77-.11.51-.17.76-.11.51-.16.77-.1.52-.16.78l-.15.79-.15.78c-.05.26-.11.52-.16.78s-.09.53-.14.8-.09.53-.14.8-.09.53-.14.8-.09.53-.14.8-.08.54-.13.81l-.12.81c0,.27-.09.55-.13.82l-.12.81-.12.83c0,.28-.07.56-.11.83s-.07.56-.11.83-.07.56-.11.83l-.09.85c0,.28-.07.57-.1.85s-.07.56-.1.85l-.09.85c0,.29-.05.58-.08.86s-.06.58-.08.87-.06.58-.08.87-.05.58-.08.87l-.06.88c0,.3,0,.59-.07.89l-.06.88c0,.3,0,.6-.05.9s0,.6-.05.9,0,.6-.05.9,0,.6,0,.91,0,.61,0,.92,0,.61,0,.92,0,.62,0,.92l0,.93c0,.32,0,.63,0,.95s0,.63,0,.94,0,.63,0,.95,0,.64,0,1,0,.65,0,1,0,.64,0,1,0,.64,0,1l0,1,0,1c0,.33,0,.66,0,1l.06,1c0,.34,0,.68.05,1s0,.68.05,1,.05.69.07,1,.05.7.08,1,.05.69.08,1,.05.71.08,1.06.07.71.11,1.07.06.72.1,1.08.07.72.11,1.08.09.73.13,1.1.09.74.14,1.11c4.52,36.14,22.4,70.75,60.12,87.3A91.1,91.1,0,0,0,592,707.27l1,.15.95.12,1,.11c.31,0,.62.06.93.09l.93.09.91.07.9.06.89.06.88,0,.88,0h3.38l.83,0,.82,0,.81,0,.8-.05.79-.06.79-.07.78-.08.77-.08.76-.09.76-.1.76-.11.74-.12.74-.12.73-.13.72-.14.73-.14.71-.15.71-.16.7-.16.69-.18.7-.17.68-.18.68-.19.68-.19.67-.21.66-.2.66-.21.66-.22.65-.22.64-.23.64-.23.64-.24.63-.25.63-.24.63-.25.61-.26.62-.27.61-.26.6-.28.61-.27.59-.28.6-.29.59-.29.59-.29.58-.3.58-.3.57-.31.57-.31.58-.31.56-.32.56-.33.56-.32.55-.33.55-.34.55-.33.55-.35.54-.34.54-.35.53-.36.53-.35.53-.36.53-.36.52-.37.52-.37.52-.37.51-.38.51-.38.51-.38.51-.39.5-.38.5-.4.49-.39.5-.4.49-.4.49-.41.49-.4.48-.41.48-.42.48-.41.48-.42.47-.42c.16-.15.32-.28.47-.43l.47-.43.47-.43.46-.43.46-.43.46-.44.46-.44.45-.45.45-.44.45-.45.45-.45.45-.46.44-.45.44-.46.44-.46c.14-.16.29-.31.44-.47l.43-.46.43-.47.43-.47.43-.48.42-.47.43-.48.42-.48.42-.49.42-.48.41-.49c.14-.16.28-.32.41-.49l.42-.49.41-.49.4-.5.41-.5.4-.5.4-.5.4-.51.4-.5c.13-.17.26-.35.4-.52l.39-.51.39-.51.39-.52.39-.52.39-.51.38-.53.38-.52.39-.53.38-.53.37-.53.38-.53.37-.53.37-.54.37-.54.37-.54.37-.54.36-.55.37-.54.36-.55.36-.55.23-.35.13-.2.36-.55c.11-.18.23-.37.36-.56l.35-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.37-.55.36-.55.36-.54.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.37-.55.36-.54.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.37-.54.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.37-.54c.12-.19.23-.37.36-.55L698,628l.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55L702,622l.36-.55.36-.55.36-.55.36-.55c.12-.19.23-.37.36-.55s.24-.37.35-.56l.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.55.36-.56c.12-.18.24-.36.35-.55l.36-.55.36-.55.36-.55.36-.55.36-.56.36-.55.35-.55.36-.55.36-.55.36-.56.36-.55.35-.55.36-.55c7.21-11.12,14.73-22.87,22-34.4,7.69-12.27,15.05-24.3,21.34-35.09,3.08-5.29,5.9-10.27,8.38-14.84a181.38,181.38,0,0,1,14.6-18.1c12.76-13.87,24.24-21.82,30-25.32,2.44-1.5,3.84-2.2,3.84-2.2s-1.81.49-4.69,1.23c-8.41,2.17-26.73,6.74-43.58,10-10.62,2-20.66,3.5-27.27,3.5-5.54,0-6.39-1.06-6.47-1.18s0-.68.34-1.26C733.93,483.1,739.64,475.53,747.17,466.1Z" 
                transform="translate(-502.29 -365.93)" />
                
            </motion.svg>
          
      
     );
}
 
export default SVG;