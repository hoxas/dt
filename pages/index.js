import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { motion, useCycle, AnimatePresence } from "framer-motion";

const mainVariants = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
  },
};

const buttonVariants = {
  initial: {
    opacity: 0,
    y: "60vh",
  },
  final: {
    opacity: 1,
    transition: { delay: 2, duration: 2 },
  },
  initial2: {
    opacity: 1,
    y: "60vh",
  },
  final2: {
    opacity: 1,
    y: ["60vh", "65vh", "60vh"],
    transition: { repeat: Infinity, ease: "easeOut" },
  },
  hover: {
    color: "grey",
  },
  exit: {
    y: "400vh",
    transition: { duration: 2 },
  },
};

const titleIntro = {
  initial: { opacity: 0, y: "40vh", scale: 3 },
  final: { opacity: 1, transition: { duration: 2 } },
  initial2: { opacity: 1, y: "40vh", scale: 3 },
  final2: { y: 0, transition: { delay: 1, duration: 2 }, scale: 0.5 },
};

const headerOptions = {
  initialLeft: { opacity: 0, x: "50vw" },
  initialRight: { opacity: 0, x: "-50vw" },
  final: { opacity: 1, x: 0, transition: { duration: 2 } },
};

export default function Home() {
  const [state, setState] = useState(false);

  const Title = () => (
    <motion.img
      key={state}
      className={styles.logo}
      src="/logo.svg"
      variants={titleIntro}
      initial={state ? "initial2" : "initial"}
      animate={state ? "final2" : "final"}
    />
  );

  const Header = () => (
    <motion.div className={styles.header}>
      <div className={styles.headerOption}>
        {state && (
          <motion.h1
            variants={headerOptions}
            initial="initialLeft"
            animate="final"
          >
            OPTION1
          </motion.h1>
        )}
      </div>
      <div className={styles.headerOption}>
        <Title />
      </div>
      <div className={styles.headerOption}>
        {state && (
          <motion.h1
            variants={headerOptions}
            initial="initialRight"
            animate="final"
          >
            OPTION2
          </motion.h1>
        )}
      </div>
    </motion.div>
  );

  const DownArrow = (props) => {
    const [animationFinished, setAnimationFinished] = useState(false);

    const setState = props.setState;

    return (
      <motion.button
        key={animationFinished}
        className={styles.downArrow}
        onClick={() => setState(true)}
        variants={buttonVariants}
        initial={animationFinished ? "initial2" : "initial"}
        animate={animationFinished ? "final2" : "final"}
        whileHover="hover"
        onAnimationComplete={() => setAnimationFinished(true)}
        exit="exit"
      >
        &#9660;
      </motion.button>
    );
  };

  return (
    <motion.div
      className={styles.main}
      variants={mainVariants}
      initial="initial"
      animate="final"
    >
      <Header />
      <AnimatePresence>
        {!state && <DownArrow setState={setState} />}
      </AnimatePresence>
    </motion.div>
  );
}
