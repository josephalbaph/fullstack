import React, { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ text, score }) => (
  <p>
    {" "}
    {text} {score}
  </p>
);

const DisplayPercent = ({ text, score }) => (
  <p>
    {" "}
    {text} {score * 100} %
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  const score_all = () => good + neutral + bad;
  const score_average = () => (score_all() ? (good - bad) / score_all() : 0);
  const score_positive = () => (score_all() ? good / score_all() : 0);

  return (
    <div>
      <Header text="statistics" />
      <Display text="good" score={good} />
      <Display text="neutral" score={neutral} />
      <Display text="bad" score={bad} />
      <Display text="all" score={score_all()} />
      <Display text="average" score={score_average()} />
      <DisplayPercent text="positive" score={score_positive()} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
