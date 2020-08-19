import React from "react";
import { motion } from "framer-motion";

const DateSpan = ({ variants, date }) => {
  return (
    <motion.div className="date-span" variants={variants}>
      {date}
    </motion.div>
  );
};

export default DateSpan;
