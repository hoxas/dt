import styles from "../styles/Home.module.css";
import { useState, useLayoutEffect, useRef } from "react";
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
  exit: {
    opacity: 0,
    transition: { duration: 2 },
  },
};

const titleIntro = {
  initial: { opacity: 0, y: "40vh", scale: 3 },
  final: { opacity: 1, transition: { duration: 2 } },
};

const titleHeader = {
  initial: { opacity: 1, y: "40vh", scale: 3 },
  final: { y: 0, transition: { duration: 2 }, scale: 1 },
};

export default function Home() {
  const [state, setState] = useState(false);
  const [titleAnimation, cycleTitleAnimation] = useCycle(
    titleIntro,
    titleHeader
  );

  const firstEffect = useRef(true);
  useLayoutEffect(() => {
    if (state) {
      console.log("Clicked");
      cycleTitleAnimation();
    }
  }, [state]);

  const Title = () => <motion.h1 variants={titleAnimation}>DT</motion.h1>;

  const Header = () => {
    return (
      <motion.div className={styles.header}>
        <Title />
      </motion.div>
    );
  };

  const DownArrow = () => (
    <AnimatePresence>
      {!state && (
        <motion.button
          key={styles.downArrow}
          className={styles.downArrow}
          onClick={() => setState(true)}
          variants={buttonVariants}
          initial="initial"
          animate="final"
          exit="exit"
        >
          &#9660;
        </motion.button>
      )}
    </AnimatePresence>
  );

  return (
    <motion.div
      className={styles.main}
      variants={mainVariants}
      initial="initial"
      animate="final"
    >
      <Header />
      <DownArrow />
    </motion.div>
  );
}
