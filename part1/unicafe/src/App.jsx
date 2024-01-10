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

const Stat = ({text, value}) => {
  return(
  <p>
    {text} {value}
  </p>
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
      <Head title="statistics" />
      <Stat text={"good"} value={good} />
      <Stat text={"neutral"} value={neutral} />
      <Stat text={"bad"} value={bad} />
    </div>
  )
}

export default App