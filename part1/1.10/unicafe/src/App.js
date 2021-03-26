import React, { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);


const Statistic = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);


const Statistics = ({ good, neutral, bad }) => {
  const score_all = () => good + neutral + bad;
  const score_average = () => (score_all() ? (good - bad) / score_all() : 0);
  const score_positive = () => (score_all() ? good / score_all() : 0);

  if (score_all() === 0) {
    return (
      <div>
        <Header text="statistics" />
        <div>No feedback given</div>
      </div>
    );
  }
  return (
    <div>
      <Header text="statistics" />
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={score_all()} />
      <Statistic text="average" value={score_average()} />
      <Statistic text="positive" value={(score_positive() * 100)+'%'} />
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
