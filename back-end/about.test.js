const assert = require('node:assert/strict')

async function testAbout() {
  const response = await fetch('http://localhost:5002/about')
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /application\/json/)
  const about = await response.json()
  assert.equal(about.title, 'About Us')
  assert.match(about.name, /David/)
  assert.ok(about.paragraphs.length >= 3)
  assert.ok(
    about.paragraphs.every(paragraph => typeof paragraph === 'string' && paragraph.trim()),
  )
  assert.ok(typeof about.photo.url === 'string' && about.photo.url.trim())
  assert.ok(typeof about.photo.alt === 'string' && about.photo.alt.trim())
  const photo = await fetch(new URL(about.photo.url, 'http://localhost:7002'))
  assert.equal(photo.status, 200)
  assert.match(photo.headers.get('content-type'), /^image\//)
  assert.ok((await photo.arrayBuffer()).byteLength > 0)
  console.log('About Us API check passed')
}

testAbout().catch(error => {
  console.error(error)
  process.exitCode = 1
})
