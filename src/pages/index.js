import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import axios from "axios"
import Header from "../components/ui/Header"
import CharacterGrid from "../components/characters/CharacterGrid"
import Search from "../components/ui/Search"
import "./App.css"

const IndexPage = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      )

      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query])

  return (
    <div className="container">
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
        title="Breaking Bad Cast"
        meta={[
          {
            name: `description`,
            content: "Breaking Bad Api Example Site Created With Gatsby And Bootstrapped With ReactJs.",
          },
          {
            name: `author`,
            content: "Omar Farooq Shah"
          }
        ]}
      />
      <Header />
      <Search getQuery={q => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default IndexPage
