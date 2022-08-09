import styles from "../styles/Home.module.scss";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useCycle,
  AnimatePresence,
  useAnimationControls,
} from "framer-motion";

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
    transition: { duration: 0.5 },
  },
  final2: {
    opacity: 1,
    y: ["60vh", "65vh", "60vh"],
    transition: { repeat: Infinity, ease: "easeOut" },
  },
  hover: {
    color: "#c4c4c4",
    y: "65vh",
    transition: { duration: 0.5 },
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

const contentVariants = {
  initial: { x: "-400vw" },
  final: { x: 0, transition: { duration: 2 } },
  exit: { x: "400vw", transition: { duration: 2 } },
};

export default function Home() {
  const [state, setState] = useState(false);
  const [pageState, setPageState] = useState(0);

  useEffect(() => console.log("PageState: " + pageState), [pageState]);
  useEffect(() => console.log("State: " + state), [state]);

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
            onAnimationComplete={() => console.log("Animation Complete")}
            onClick={() => setPageState(1)}
          >
            OPTION
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
            onClick={() => setPageState(2)}
          >
            OPTION
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

  const Content = (props) => (
    <motion.div
      key="content"
      className={styles.content}
      variants={contentVariants}
      initial="initial"
      animate="final"
      exit="exit"
    >
      <h1>{props.header}</h1>
      <p>{props.text}</p>
    </motion.div>
  );

  const PageContentSelector = (props) => {
    if (props.pageState == 1) {
      const header = "Content";
      const text = `In order to better reach and improve the web experience for enterprise
          users, we are adding non-essential web cookies to certain subdomains
          that specifically market our products to businesses. This change is
          only on subdomains that reach enterprise customers, and all other
          GitHub subdomains will continue to operate as-is. Boo-hoo.`;
      return <Content header={header} text={text} />;
    } else if (props.pageState == 2) {
      const header = "GitHub Copilot";
      const text = `Get suggestions for lines of code and entire functions in real‑time`;
      return <Content header={header} text={text} />;
    }
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
      <AnimatePresence>
        {pageState == 1 && <PageContentSelector pageState={pageState} />}
        {pageState == 2 && <PageContentSelector pageState={pageState} />}
      </AnimatePresence>
    </motion.div>
  );
}
