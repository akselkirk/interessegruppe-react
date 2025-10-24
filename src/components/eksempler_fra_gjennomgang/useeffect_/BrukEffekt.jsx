import { useEffect, useState } from "react";
import Number from "./Number";

const BrukEffekt = () => {
  const [counters, setCounters] = useState(
    JSON.parse(localStorage.getItem("counters"))
  );

  useEffect(() => {
    localStorage.setItem(`counters`, JSON.stringify(counters));
  }, [counters]);

  const handlePluss = (counterIndex) => {
    setCounters(
      counters.map((counter, index) => {
        return index === counterIndex
          ? { ...counter, count: counter.count + 1 }
          : counter;
      })
    );
  };

  const handleMinus = (counterIndex) => {
    setCounters(
      counters.map((counter, index) => {
        return index === counterIndex
          ? { ...counter, count: counter.count - 1 }
          : counter;
      })
    );
  };

  return (
    <div>
      {counters.map((counter) => {
        return (
          <Number
            key={counter.id}
            count={counter.count}
            handleMinus={() => handleMinus(counter.id)}
            handlePluss={() => handlePluss(counter.id)}
          />
        );
      })}
    </div>
  );
};

export default BrukEffekt;
