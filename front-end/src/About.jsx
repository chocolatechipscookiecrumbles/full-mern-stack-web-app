import { useEffect, useState } from 'react'
import axios from 'axios'
import './About.css'

const About = () => {
  const [about, setAbout] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`, {
        signal: controller.signal,
      })
      .then(response => setAbout(response.data))
      .catch(err => {
        if (!axios.isCancel(err)) setError(true)
      })
    return () => controller.abort()
  }, [])

  if (error) {
    return <p role="alert">Unable to load this page. Please reload to try again.</p>
  }
  if (!about) return <p role="status">Loading...</p>

  return (
    <article className="About-article">
      <h1>{about.title}</h1>
      <img src={about.photo.url} alt={about.photo.alt} />
      <h2>{about.name}</h2>
      {about.paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </article>
  )
}

export default About
