const html = document.documentElement
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches
const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
const easeOut = t => 1 - Math.pow(1 - t, 3)

document.getElementById('year').textContent = new Date().getFullYear()

// the google fonts stylesheet loads without blocking the page, so wait for it first,
// then for the fonts themselves (otherwise the name could animate in a fallback font and jump)
const fontCss = document.querySelector('link[href*="fonts.googleapis.com/css2"][rel="stylesheet"]')
const fontsReady = new Promise(resolve => {
  if (!fontCss || fontCss.media == 'all') return resolve()
  fontCss.addEventListener('load', resolve)
  setTimeout(resolve, 2500) // never wait forever on a slow connection
}).then(() => document.fonts.ready)


// ---- theme ----
// the new theme comes down over the page in vertical strips, one after another,
// starting from the side the button is on, like blinds being let down (browsers with view transitions)
const themeBtn = document.getElementById('theme-btn')

function updateThemeBtn() {
  const light = html.dataset.theme == 'light'
  themeBtn.setAttribute('aria-label', light ? say('toDark') : say('toLight'))
  document.querySelector('meta[name="theme-color"]').content = light ? '#FFFFFF' : '#000000'
}

function flipTheme() {
  html.dataset.theme = html.dataset.theme == 'light' ? 'dark' : 'light'
  try { localStorage.theme = html.dataset.theme } catch (e) {}
  updateThemeBtn()
  window.dispatchEvent(new Event('themechange'))
}

// one clip-path shape made of all the strips, each one pulled down as far as it's got by time t (0 to 1).
// a polygon can't have gaps, so it runs along the top edge between strips, which has no height
const STRIPS = 10
const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
function blinds(t, fromRight) {
  const w = innerWidth / STRIPS
  const points = []
  for (let i = 0; i < STRIPS; i++) {
    const order = fromRight ? STRIPS - 1 - i : i
    const drop = easeInOut(clamp((t - order * 0.05) / 0.55, 0, 1)) * innerHeight
    const left = i * w, right = (i + 1) * w + 1 // +1 so there's never a hairline between strips
    points.push(`${left}px 0`, `${left}px ${drop}px`, `${right}px ${drop}px`, `${right}px 0`)
  }
  return `polygon(${points.join(', ')})`
}

let themeSwitching = false
function switchTheme() {
  if (themeSwitching || switchingLang) return // one page transition at a time
  themeBtn.classList.remove('turn')
  void themeBtn.offsetWidth // restart the icon turning in
  themeBtn.classList.add('turn')

  if (!document.startViewTransition || reduceMotion) return flipTheme()
  // clicks during the animation are ignored (the check at the top), otherwise a fast double click loses one
  themeSwitching = true

  // the flip runs exactly once, either through the transition or through the backup timer below
  let flipped = false
  const flipOnce = () => {
    if (flipped) return
    flipped = true
    flipTheme()
  }
  const done = () => { themeSwitching = false }

  const transition = document.startViewTransition(flipOnce)
  transition.ready.then(() => {
    const box = themeBtn.getBoundingClientRect()
    const fromRight = box.left > innerWidth / 2
    const frames = Array.from({ length: 41 }, (_, n) => ({ clipPath: blinds(n / 40, fromRight) }))
    html.animate(frames, { duration: 1000, easing: 'linear', pseudoElement: '::view-transition-new(root)' })
  }).catch(() => {}) // the browser can skip the animation, the theme still switches
  transition.finished.catch(() => {}).then(done)

  // backup: if the browser never gets round to the transition (it can stall in background tabs),
  // switch anyway so the button never ends up doing nothing
  setTimeout(() => { flipOnce(); done() }, 1500)
}
themeBtn.addEventListener('click', switchTheme)
updateThemeBtn()

// press T anywhere to switch (but not while typing in the form)
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() != 't' || e.ctrlKey || e.metaKey || e.altKey) return
  if (e.target.closest?.('input, textarea')) return
  switchTheme()
})


// ---- clock ----
const clock = document.getElementById('clock')
const status = document.getElementById('status')
function tick() {
  const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tbilisi' })
  clock.textContent = time
  // between 9 in the morning and 11 at night I'm probably around
  const hour = +time.slice(0, 2)
  status.textContent = hour >= 9 && hour < 23 ? say('online') : say('asleep')
}
tick()
setInterval(tick, 20000)


// ---- split text into letters ----
// each letter becomes a span with --i so the css can stagger them
function splitLetters(el) {
  let i = 0
  el.querySelectorAll('.row, .word').forEach(part => {
    part.innerHTML = [...part.textContent].map(ch => `<span class="l" style="--i:${i++}">${ch}</span>`).join('')
  })
}
const heroName = document.querySelector('.hero-name')
const talk = document.getElementById('talk')

// runs on load and again whenever the language changes
function splitHeadings() {
  document.getElementById('name-label').textContent = [...heroName.querySelectorAll('.row')].map(r => r.textContent).join(' ')
  splitLetters(heroName)

  // a hidden copy for screen readers, the visible letters are hidden from them
  const talkText = talk.textContent.trim()
  talk.innerHTML = `<span class="sr-only">${talkText}</span>` + talkText.split(' ').map(w => `<span class="word" aria-hidden="true">${w}</span>`).join(' ')
  splitLetters(talk)
}
splitHeadings()

// ---- intro: red screen counts to 100 and lifts, then the hero plays ----
// only on the first visit, after that the hero just plays once the fonts are in
const curtain = document.getElementById('curtain')
let started = false
function startHero() {
  if (started) return
  started = true
  requestAnimationFrame(() => html.classList.add('ready'))
}


if (reduceMotion || html.classList.contains('seen')) {
  curtain.remove()
  fontsReady.then(startHero)
  setTimeout(startHero, 1500) // in case a font is slow
} else {
  const count = document.getElementById('curtain-count')
  const t0 = performance.now()
  const step = now => {
    const t = Math.min(1, (now - t0) / 700)
    count.textContent = Math.round(easeOut(t) * 100)
    if (t < 1) return requestAnimationFrame(step)
    // wait for fonts too, so the name doesn't jump when the real font arrives
    Promise.race([fontsReady, new Promise(r => setTimeout(r, 600))]).then(() => {
      curtain.classList.add('up')
      setTimeout(startHero, 250)
      setTimeout(() => curtain.remove(), 1000)
      try { sessionStorage.seen = '1' } catch (e) {}
    })
  }
  requestAnimationFrame(step)
}


// ---- header, progress bar, mobile menu ----
const header = document.getElementById('header')
const progress = document.getElementById('progress')
const menuBtn = document.getElementById('menu-btn')
const nav = document.getElementById('nav')

function setMenu(open) {
  nav.classList.toggle('open', open)
  document.body.classList.toggle('menu-open', open)
  menuBtn.setAttribute('aria-expanded', open)
  menuBtn.setAttribute('aria-label', open ? say('closeMenu') : say('openMenu'))
}
menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')))
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)))
document.addEventListener('keydown', e => { if (e.key == 'Escape') setMenu(false) })

// a red bar slides under the link you hover, and goes back to the current section when you leave
const navLinks = nav.querySelectorAll('a')
const navBar = document.createElement('span')
navBar.className = 'nav-bar'
nav.append(navBar)
let hoveringNav = false

function moveNavBar(link) {
  if (!link) { navBar.style.opacity = 0; return }
  navBar.style.opacity = 1
  navBar.style.left = link.offsetLeft + 'px'
  navBar.style.width = link.offsetWidth + 'px'
}
navLinks.forEach(a => a.addEventListener('mouseenter', () => { hoveringNav = true; moveNavBar(a) }))
nav.addEventListener('mouseleave', () => {
  hoveringNav = false
  moveNavBar(nav.querySelector('a.active'))
})

// highlight the nav link for whatever section is on screen
const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') == '#' + entry.target.id))
    if (!hoveringNav) moveNavBar(nav.querySelector('a.active'))
  })
}, { rootMargin: '-45% 0px -50% 0px' })
document.querySelectorAll('main section[id]').forEach(s => spyObserver.observe(s))


// ---- scramble effect: random characters that settle into the real text ----
// georgian text scrambles with georgian letters, otherwise it looks broken for a moment
const glyphSets = {
  en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+/',
  ka: 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ',
}
function scramble(el) {
  if (reduceMotion) return
  const text = el.dataset.text || (el.dataset.text = el.textContent)
  cancelAnimationFrame(el._raf)
  let frame = 0
  const step = () => {
    const glyphs = glyphSets[lang]
    el.textContent = [...text].map((ch, i) => ch == ' ' || i < frame / 2 ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]).join('')
    if (frame++ < text.length * 2) el._raf = requestAnimationFrame(step)
    else el.textContent = text
  }
  step()
}
// used on the section labels when they scroll into view (further down)


// ---- big title: wrap each line so it can rise out of a mask ----
function wrapTitleLines() {
  document.querySelectorAll('.big-title').forEach(title => {
    title.innerHTML = title.innerHTML.split(/<br\s*\/?>/).map((line, i) =>
      `<span class="line"><span style="--i:${i}">${line.trim()}</span></span>`
    ).join('')
  })
}
wrapTitleLines()


// ---- about statement: words light up as you scroll past ----
const statement = document.getElementById('statement')
let words = []

function wrapStatement() {
  // wrap every word, keeping the <em> words so they can turn red
  statement.querySelectorAll('em').forEach(em => { em.innerHTML = `<span class="w">${em.textContent}</span>` })
  statement.childNodes.forEach(node => {
    if (node.nodeType != 3) return
    const span = document.createElement('span')
    span.innerHTML = node.textContent.replace(/(\S+)/g, '<span class="w">$1</span>')
    node.replaceWith(span)
  })
  words = statement.querySelectorAll('.w')
}
wrapStatement()


// ---- language switch ----
// red paint pours down from the top with drips running ahead of it until it covers the page,
// the language swaps underneath, then the paint slides off the bottom and the headings rise back in.
// two coats: a dark one slightly ahead and the bright one on top, so it has some depth
const langBtn = document.getElementById('lang-btn')
const liquid = document.getElementById('lang-liquid')
const lctx = liquid.getContext('2d')
const POUR = 450    // ms to cover the page
const HOLD = 100    // ms fully covered, the swap happens in here
const DRAIN = 500   // ms to slide off
const DRIP = 260   // longest a drip can get, in px
let switchingLang = false

function swapLanguage(next) {
  applyLang(next)
  splitHeadings()
  wrapTitleLines()
  wrapStatement()
  updateThemeBtn()
  refreshLayout()
  tick() // the online / asleep text is translated too
}

// drips along the edge, different every time. w is half the width
function makeDrips() {
  return Array.from({ length: Math.ceil(innerWidth / 90) }, () => ({
    x: Math.random() * innerWidth,
    w: 14 + Math.random() * 34,
    len: 40 + Math.random() * (DRIP - 40),
  }))
}

// one coat of paint. pouring, it hangs from the top and its edge is at `base` with drips below it.
// draining, it sits on the bottom and its edge is at `base` with trails left above it
function coat(base, drips, color, wobble, pouring) {
  const dir = pouring ? 1 : -1
  const edge = []
  for (let x = -6; x <= innerWidth + 6; x += 6) {
    // the surface ripples a little as it moves
    let y = base + Math.sin(x / 140 + wobble) * 12 + Math.sin(x / 53 + wobble * 1.7) * 5
    for (const d of drips) {
      const dx = Math.abs(x - d.x)
      if (dx >= d.w) continue
      // a column with a round end
      const tip = base + dir * (d.len - d.w + Math.sqrt(d.w * d.w - dx * dx))
      y = pouring ? Math.max(y, tip) : Math.min(y, tip)
    }
    edge.push([x, y])
  }
  // soften the corners where the drips leave the edge, so they flow out of it like real paint
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 1; i < edge.length - 1; i++) edge[i][1] = (edge[i - 1][1] + edge[i][1] * 2 + edge[i + 1][1]) / 4
  }

  const outside = pouring ? -10 : innerHeight + 10
  const shape = new Path2D()
  shape.moveTo(-6, outside)
  for (const [x, y] of edge) shape.lineTo(x, y)
  shape.lineTo(innerWidth + 6, outside)
  // deeper colour away from the edge, brighter at the wet edge, so it has some body
  const shade = lctx.createLinearGradient(0, outside, 0, base)
  shade.addColorStop(0, color.deep)
  shade.addColorStop(1, color.edge)
  lctx.fillStyle = shade
  lctx.fill(shape)

  // a thin shine just inside the edge makes it look wet
  lctx.beginPath()
  for (const [x, y] of edge) lctx.lineTo(x, y - dir * 5)
  lctx.strokeStyle = 'rgba(255, 255, 255, .2)'
  lctx.lineWidth = 2
  lctx.stroke()
  return shape
}

// "loading / English" painted onto the bright coat. it's clipped to the paint,
// so it shows up as the paint covers the middle and rides down with it when it drains
function paintLabel(shape, y, { caption, word, ink }) {
  const big = clamp(innerWidth * 0.12, 48, 190)
  lctx.save()
  lctx.clip(shape)
  lctx.fillStyle = ink
  lctx.textAlign = 'center'
  lctx.letterSpacing = '0.3em'
  lctx.font = `500 ${clamp(big * 0.11, 12, 18)}px "JetBrains Mono", "Noto Sans Georgian", monospace`
  lctx.fillText(caption, innerWidth / 2, y - big * 0.62)
  lctx.letterSpacing = '0px'
  lctx.fontStretch = 'expanded'
  lctx.font = `900 ${big}px "Archivo", "Noto Sans Georgian", sans-serif`
  lctx.fillText(word, innerWidth / 2, y + big * 0.32)
  lctx.restore()
}

function switchLang() {
  if (switchingLang || themeSwitching) return
  const next = lang == 'en' ? 'ka' : 'en'

  langBtn.classList.remove('pop')
  void langBtn.offsetWidth // restart the bounce
  langBtn.classList.add('pop')

  if (reduceMotion) return swapLanguage(next)
  switchingLang = true

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  liquid.width = innerWidth * dpr
  liquid.height = innerHeight * dpr
  lctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  const css = getComputedStyle(html)
  const red = name => css.getPropertyValue(name).trim()
  const bright = { deep: red('--red-2'), edge: red('--red') }
  const dark = { deep: '#3a0000', edge: red('--red-3') }
  const label = next == 'ka'
    ? { caption: 'იტვირთება', word: 'ქართული', ink: red('--on-red') }
    : { caption: 'loading', word: 'English', ink: red('--on-red') }
  const pourDrips = [makeDrips(), makeDrips()]
  const drainDrips = [makeDrips(), makeDrips()]
  const travel = innerHeight + DRIP + 20 // far enough that the drips and ripples are off screen too
  liquid.classList.add('on')

  const start = performance.now()
  const frame = now => {
    const t = now - start
    const wobble = t / 400
    lctx.clearRect(0, 0, innerWidth, innerHeight)
    if (t < POUR + HOLD) {
      // the dark coat leads a little
      const edge = lead => easeInOut(clamp(t / POUR + lead, 0, 1)) * travel - DRIP
      coat(edge(0.1), pourDrips[0], dark, wobble, true)
      paintLabel(coat(edge(0), pourDrips[1], bright, wobble + 1, true), innerHeight / 2, label)
    } else {
      // the bright coat leaves first and shows the dark one under it for a moment
      const edge = lag => easeInOut(clamp((t - POUR - HOLD) / DRAIN - lag, 0, 1)) * travel
      coat(edge(0.12), drainDrips[0], dark, wobble, false)
      paintLabel(coat(edge(0), drainDrips[1], bright, wobble + 1, false), innerHeight / 2 + edge(0), label)
    }
    if (t < POUR + HOLD + DRAIN * 1.15) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)

  // (timers rather than animation frames for these: frames pause in background tabs)
  setTimeout(() => {
    html.classList.add('relang') // split headings wait below their masks
    swapLanguage(next)
  }, POUR + 40)
  setTimeout(() => html.classList.remove('relang'), POUR + HOLD + DRAIN * 0.35)
  setTimeout(() => {
    liquid.classList.remove('on')
    lctx.clearRect(0, 0, innerWidth, innerHeight)
    switchingLang = false
  }, POUR + HOLD + DRAIN * 1.15 + 60)
}
langBtn.addEventListener('click', switchLang)

// L switches language, same idea as T for the theme
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() != 'l' || e.ctrlKey || e.metaKey || e.altKey) return
  if (e.target.closest?.('input, textarea')) return
  switchLang()
})


// ---- count up ----
function countUp(el, target, { from = 0, decimals = 0, unit = '', duration = 1600 } = {}) {
  if (reduceMotion) { el.innerHTML = target.toFixed(decimals) + unit; return }
  const start = performance.now()
  const step = now => {
    const t = Math.min(1, (now - start) / duration)
    el.innerHTML = (from + (target - from) * easeOut(t)).toFixed(decimals) + unit
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}


// ---- live numbers about this page ----
let liveDone = false
function showLiveNumbers() {
  if (liveDone) return
  liveDone = true

  const nav = performance.getEntriesByType('navigation')[0]
  let bytes = 0
  for (const f of [nav, ...performance.getEntriesByType('resource')]) bytes += f.transferSize || f.encodedBodySize || 0
  const load = nav.loadEventEnd - nav.startTime

  countUp(document.getElementById('m-size'), bytes / 1024, { unit: '<small>KB</small>' })
  if (load < 1000) countUp(document.getElementById('m-load'), load, { unit: '<small>ms</small>' })
  else countUp(document.getElementById('m-load'), load / 1000, { decimals: 2, unit: '<small>s</small>' })
  countUp(document.getElementById('m-els'), document.querySelectorAll('*').length)

  const fps = document.getElementById('m-fps')
  let frames = 0, last = performance.now()
  const count = now => {
    frames++
    if (now - last > 500) {
      fps.innerHTML = Math.round(frames * 1000 / (now - last)) + '<small>fps</small>'
      frames = 0
      last = now
    }
    requestAnimationFrame(count)
  }
  requestAnimationFrame(count)
}


// years of coding, counted from 2022 so it never goes out of date
const years = document.getElementById('years')
years.dataset.count = years.textContent = new Date().getFullYear() - 2022

// ---- reveal on scroll ----
const revealItems = document.querySelectorAll('.tldr-grid li, .big-title, .about-text, .stat, .service, .skill, .step, .live div, .contact-lead, .email-big, .socials, .form, .live-intro')
revealItems.forEach((el, i) => {
  el.classList.add('reveal')
  // stagger things that sit in the same row
  const siblings = [...el.parentElement.children]
  el.style.transitionDelay = Math.min(siblings.indexOf(el), 5) * 0.07 + 's'
})

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const el = entry.target
    el.classList.add('in')
    observer.unobserve(el)

    if (el.classList.contains('stat')) {
      const strong = el.querySelector('strong')
      if (strong.dataset.count) countUp(strong, +strong.dataset.count, { from: +strong.dataset.from || 0 })
    }
    if (el.parentElement.classList.contains('live')) {
      document.readyState == 'complete' ? showLiveNumbers() : window.addEventListener('load', showLiveNumbers)
    }
    if (el.classList.contains('label')) scramble(el.querySelector('b'))
  })
}, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' })

document.querySelectorAll('.reveal, .job, #talk, .label').forEach(el => observer.observe(el))

// the steps list can be taller than the screen on phones, so it can't wait for 20% of it to show.
// instead it starts as soon as its top is a third of the way up the screen
const stepsObserver = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) return
  entry.target.classList.add('in')
  stepsObserver.disconnect()
}, { rootMargin: '0px 0px -30% 0px' })
stepsObserver.observe(document.querySelector('.steps'))


// ---- everything that runs on scroll ----
const timeline = document.getElementById('timeline')
const hero = document.querySelector('.hero')
const toTop = document.getElementById('to-top')
const toTopFill = document.getElementById('to-top-fill')
const scrollCue = document.querySelector('.scroll-cue')

function onScroll() {
  const y = scrollY
  const vh = innerHeight
  const max = document.documentElement.scrollHeight - vh
  const pageProgress = max > 0 ? y / max : 0

  header.classList.toggle('scrolled', y > 30)
  progress.style.transform = `scaleX(${pageProgress})`
  toTop.classList.toggle('show', y > 600)
  toTopFill.style.height = pageProgress * 100 + '%'

  scrollCue.classList.toggle('gone', y > 80)

  // "PATSIA" fills in red one letter at a time over the first half of the hero
  const surnameLetters = heroName.querySelectorAll('.outline .l') // rebuilt when the language changes
  const filled = Math.round(clamp(y / (hero.offsetHeight * 0.45), 0, 1) * surnameLetters.length)
  surnameLetters.forEach((l, i) => l.classList.toggle('filled', i < filled))

  // statement words
  const s = statement.getBoundingClientRect()
  const lit = Math.floor(clamp((vh * 0.8 - s.top) / (s.height + vh * 0.25), 0, 1) * words.length * 1.05)
  words.forEach((w, i) => w.classList.toggle('on', i < lit))

  // timeline line
  const t = timeline.getBoundingClientRect()
  timeline.style.setProperty('--p', clamp((vh * 0.6 - t.top) / t.height, 0, 1))

  // "let's talk" slides in from the right as it comes up the screen
  const tk = talk.getBoundingClientRect()
  const tp = clamp((vh - tk.top) / (vh * 0.8), 0, 1)
  talk.style.setProperty('--shift', `${(1 - easeOut(tp)) * 25}vw`)
}

let ticking = false
window.addEventListener('scroll', () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => { onScroll(); ticking = false })
}, { passive: true })
// link sizes change with the window and once the font loads, so the nav bar needs re-measuring
const refreshLayout = () => { onScroll(); moveNavBar(nav.querySelector('a.active')) }
window.addEventListener('resize', refreshLayout)
onScroll()
fontsReady.then(refreshLayout)


// ---- toast, copy email, contact form ----
const toast = document.getElementById('toast')
let toastTimer
function showToast(text) {
  toast.textContent = text
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200)
}

toTop.addEventListener('click', () => window.scrollTo({ top: 0 }))

const copyBtn = document.getElementById('copy')
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email)
    showToast(say('copied'))
  } catch (e) {
    window.location.href = 'mailto:' + copyBtn.dataset.email
  }
})

const form = document.getElementById('contact-form')
form.addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(form)
  const subject = `${say('mailSubject')} ${data.get('name')}`
  const body = `${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`
  window.location.href = `mailto:giorgipatsia6@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})


// ---- desktop only: custom cursor and magnetic buttons ----
if (finePointer && !reduceMotion) {
  html.classList.add('has-cursor')
  const cursor = document.getElementById('cursor')
  let cx = innerWidth / 2, cy = innerHeight / 2, mx = cx, my = cy

  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })
  document.addEventListener('mouseleave', () => cursor.classList.add('hidden'))
  document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'))

  // trails behind the mouse a little, and stops updating once it has caught up
  let following = false
  const follow = () => {
    cx += (mx - cx) * 0.2
    cy += (my - cy) * 0.2
    cursor.style.transform = `translate(${cx}px, ${cy}px)`
    if (Math.abs(mx - cx) + Math.abs(my - cy) > 0.3) requestAnimationFrame(follow)
    else following = false
  }
  window.addEventListener('mousemove', () => {
    if (following) return
    following = true
    requestAnimationFrame(follow)
  })

  // the red light in the background follows too, just lazier
  const light = document.getElementById('bg-light')
  let lx = cx, ly = cy, lighting = false
  const drift = () => {
    lx += (mx - lx) * 0.06
    ly += (my - ly) * 0.06
    light.style.transform = `translate3d(${lx}px, ${ly}px, 0)`
    if (Math.abs(mx - lx) + Math.abs(my - ly) > 0.5) requestAnimationFrame(drift)
    else lighting = false
  }
  window.addEventListener('mousemove', () => {
    if (lighting) return
    lighting = true
    requestAnimationFrame(drift)
  })

  // the dot shrinks a bit over anything clickable
  document.addEventListener('mouseover', e => {
    cursor.classList.toggle('link', !!e.target.closest('a, button, input, textarea'))
  })

  // buttons get pulled toward the cursor
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const box = btn.getBoundingClientRect()
      const x = e.clientX - box.left - box.width / 2
      const y = e.clientY - box.top - box.height / 2
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
    })
    btn.addEventListener('mouseleave', () => { btn.style.transform = '' })
  })

  // service cards: a soft red light follows the mouse inside each card
  document.querySelectorAll('.service').forEach(card => {
    card.addEventListener('mousemove', e => {
      const box = card.getBoundingClientRect()
      card.style.setProperty('--mx', e.clientX - box.left + 'px')
      card.style.setProperty('--my', e.clientY - box.top + 'px')
    })
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mx', '-999px')
      card.style.setProperty('--my', '-999px')
    })
  })

  // skills: the spotlight follows the mouse across the whole grid.
  // each tile gets the mouse position relative to itself, so the light lines up across tiles
  const skillsGrid = document.querySelector('.skills')
  const skillTiles = [...skillsGrid.querySelectorAll('.skill')]
  skillsGrid.addEventListener('mousemove', e => {
    for (const tile of skillTiles) {
      const box = tile.getBoundingClientRect()
      tile.style.setProperty('--sx', e.clientX - box.left + 'px')
      tile.style.setProperty('--sy', e.clientY - box.top + 'px')
    }
  })
  skillsGrid.addEventListener('mouseleave', () => {
    for (const tile of skillTiles) {
      tile.style.setProperty('--sx', '-999px')
      tile.style.setProperty('--sy', '-999px')
    }
  })

  // project cards tilt toward the mouse, just a little
  document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('mousemove', e => {
      const box = card.getBoundingClientRect()
      const x = (e.clientX - box.left) / box.width - 0.5
      const y = (e.clientY - box.top) / box.height - 0.5
      card.classList.add('tilting')
      card.style.transform = `perspective(900px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg)`
    })
    card.addEventListener('mouseleave', () => {
      card.classList.remove('tilting')
      card.style.transform = ''
    })
  })
}


// little things for people who wander off or poke around

// the tab title changes when you switch to another tab
document.addEventListener('visibilitychange', () => {
  document.title = document.hidden ? say('away') : say('title')
})

// hello to anyone who opens the dev tools
console.log(
  '%cHey, you opened the console 👀',
  'font: 700 16px sans-serif; color: #FF0000',
)
console.log(
  'If you\'re reading this you probably care about how things are built. So do I.\n' +
  'The whole site is plain HTML, CSS and JavaScript, no frameworks.\n' +
  'Want to work together? giorgipatsia6@gmail.com\n\n' +
  'psst, type "hire" anywhere on the page',
)


// ---- the name glitches for a split second every now and then ----
if (!reduceMotion) {
  const glitch = () => {
    // only when you can actually see it
    if (html.classList.contains('ready') && heroName.getBoundingClientRect().bottom > 0 && !document.hidden) {
      heroName.classList.add('glitch')
      setTimeout(() => heroName.classList.remove('glitch'), 450)
    }
    setTimeout(glitch, 5000 + Math.random() * 5000)
  }
  setTimeout(glitch, 4000)
}


// ---- big text leans a little with how fast you scroll, then settles ----
// only runs while scrolling, and only touches the few elements that lean
// (setting it on <html> made the browser re-check every element on the page every frame)
if (!reduceMotion) {
  const leaners = document.querySelectorAll('.statement, .talk, .big-title')
  let lean = 0, lastY = scrollY, leaning = false
  const settle = () => {
    const speed = scrollY - lastY
    lastY = scrollY
    lean += (clamp(speed * 0.06, -3, 3) - lean) * 0.12
    const done = Math.abs(lean) < 0.01 && speed == 0
    if (done) lean = 0
    leaners.forEach(el => el.style.setProperty('--lean', lean.toFixed(3)))
    if (done) leaning = false
    else requestAnimationFrame(settle)
  }
  window.addEventListener('scroll', () => {
    if (leaning) return
    leaning = true
    requestAnimationFrame(settle)
  }, { passive: true })
}


// ---- the secret: type "hire" anywhere and it rains red squares ----
let typed = ''
document.addEventListener('keydown', e => {
  if (e.target.closest?.('input, textarea') || e.key.length != 1) return
  typed = (typed + e.key.toLowerCase()).slice(-4)
  if (typed == 'hire') {
    typed = ''
    secret()
  }
})

function secret() {
  if (!reduceMotion) {
    const rain = document.createElement('div')
    rain.className = 'confetti'
    const reds = ['#FF0000', '#BC0202', '#830000']
    for (let i = 0; i < 70; i++) {
      const sq = document.createElement('i')
      sq.style.left = Math.random() * 100 + 'vw'
      sq.style.setProperty('--s', 6 + Math.random() * 14 + 'px')
      sq.style.setProperty('--c', reds[i % 3])
      sq.style.setProperty('--t', 1.6 + Math.random() * 1.4 + 's')
      sq.style.setProperty('--d', Math.random() * 0.6 + 's')
      sq.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px')
      sq.style.setProperty('--r', (Math.random() - 0.5) * 1080 + 'deg')
      rain.append(sq)
    }
    document.body.append(rain)
    setTimeout(() => rain.remove(), 3800)
  }
  showToast(say('secret'))
  setTimeout(() => document.getElementById('contact').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }), 1200)
}


// ---- pause the mockup shimmer while the projects aren't on screen ----
const work = document.getElementById('work')
new IntersectionObserver(([entry]) => {
  work.classList.toggle('on-screen', entry.isIntersecting)
}).observe(work)
