import { useState } from 'react'

const Head = ({title}) => {
  return(
  <h1>
    {title}
  </h1>
  )
}

const Button = ({text, handleClick}) => {
  return(
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const All = ({good, neut, bad}) => {
  return(
    <p>
      all {good + neut + bad}
    </p>
  )
}

const Stat = ({text, value}) => {
  return(
  <p>
    {text} {value}
  </p>
  )
}

const Average = ({first, second, third}) => {
  return(
    <p>
      average {(first * 1  + third * -1) / (first + second + third)}
    </p>
  )
}

const PositivePerc = ({pos, neut, bad}) => {
  return(
    <p>
      positive {(pos / (pos + neut + bad)) * 100} %
    </p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad != 0)
    return(
      <div>
        <Head title="statistics" />
        <Stat text={"good"} value={good} />
        <Stat text={"neutral"} value={neutral} />
        <Stat text={"bad"} value={bad} />
        <All good={good} neut={neutral} bad={bad} />
        <Average first={good} second={neutral} third={bad} />
        <PositivePerc pos={good} neut={neutral} bad={bad} />
      </div>
    )
  else
    return(
      <div>
        <Head title="statistics" />
        <p>
          No feedback given
        </p>
      </div>    
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    console.log("Value of good was: ", good)
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    console.log("Value of neutral was: ", neutral)
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    console.log("Value of bad was: ", bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <Head title="give feedback" />
      <Button handleClick={() => incrementGood()} text={"good"} />
      <Button handleClick={() => incrementNeutral()} text={"neutral"} />
      <Button handleClick={() => incrementBad()} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App