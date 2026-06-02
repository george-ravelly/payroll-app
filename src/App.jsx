import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Content from './components/Content'

function App() {
  return (
    <>
      <Header content={<Content />} />
    </>
  )
}

export default App
