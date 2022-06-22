import React from "react"
import { useState } from "react";
import { Container, Icon, Segment, Input, Message, Form } from "semantic-ui-react";
import './App.css';
import jutech from "./jut.png"

function App() {
  const [advice, setAdvice] = useState("Hey, you want some advice? hit the play Button or search for advice using the keyword of your choice...i'm sure you gonna enjoy it")
  const [search, setSearch] = useState([])
  const [check, setCheck] = useState(false)
  const [query, setQuery] = useState("")

  function handleClick1() {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setAdvice(data.slip.advice)
      })

  }

  function handleChange(event) {
    setQuery(event.target.value)

  }

  function handleSubmit() {

    fetch("https://api.adviceslip.com/advice/search/" + query)
      .then((response) => response.json())
      .then((data) => {
        setCheck(true)
       console.log(data)
        setSearch(data.slips.map(function (datas) {
          return (
            <ul>
              <li>{datas.advice}</li>
            </ul>
          )
          
        }))
      
      })
      setCheck(false)
  }


  return (
    <div className="every" >
      <Container className="con">
        <Segment className="advice">
        <img src={jutech} />
          <h4>TOP-NOTCH ADVICE</h4>
          <Form onSubmit={handleSubmit}>
            <Input onChange={handleChange} type="text"  className="searchs" placeholder="Enter a keyword for any advice" ></Input>
          </Form>
          <Message className="message">{check ? search : advice}</Message>
          <Icon className="icon" onClick={handleClick1} name="play"> </Icon>
        </Segment>
      </Container>
    </div>
  );
}

export default App;
