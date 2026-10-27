// The dot grid behind the hero.
// Dots near the mouse grow and turn red, and clicking sends a ripple across the grid.
//
// To keep it cheap: the plain grid is drawn once into a hidden canvas and just copied in,
// only the red "hot" dots get drawn each frame, and nothing runs at all when the mouse
// isn't near it and there's no ripple going.

const dotCanvas = document.getElementById('dots')
const dctx = dotCanvas.getContext('2d')
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

const GAP = 30        // space between dots
const REACH = 150     // how far from the mouse dots react

let dw = 0, dh = 0, dpr = 1
let cols = 0, rows = 0, offX = 0, offY = 0
let heat = new Float32Array(0) // how red each dot is right now, 0..1
let base = document.createElement('canvas') // the plain grid, drawn once
let ripples = []
let pointer = { x: -9999, y: -9999 }
let heroVisible = true
let running = false
let baseColor = '#3d1515', hotColor = '#FF0000'

function readColors() {
  const css = getComputedStyle(document.documentElement)
  baseColor = css.getPropertyValue('--dim').trim()
  hotColor = css.getPropertyValue('--red').trim()
}

function drawBase() {
  base.width = dw * dpr
  base.height = dh * dpr
  const b = base.getContext('2d')
  b.setTransform(dpr, 0, 0, dpr, 0, 0)
  b.fillStyle = baseColor
  b.beginPath()
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = offX + c * GAP, y = offY + r * GAP
      b.moveTo(x + 1, y)
      b.arc(x, y, 1, 0, Math.PI * 2)
    }
  }
  b.fill()
}

function setupDots() {
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  const box = dotCanvas.getBoundingClientRect()
  dw = box.width
  dh = box.height
  dotCanvas.width = dw * dpr
  dotCanvas.height = dh * dpr
  dctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  // center the grid so the edges look even
  offX = (dw % GAP) / 2
  offY = (dh % GAP) / 2
  cols = Math.ceil((dw - offX) / GAP)
  rows = Math.ceil((dh - offY) / GAP)
  heat = new Float32Array(cols * rows)

  readColors()
  drawBase()
  render()
}

// one frame. returns true if something is still moving and it should keep going
function render() {
  dctx.clearRect(0, 0, dw, dh)
  dctx.drawImage(base, 0, 0, dw, dh)

  for (const r of ripples) { r.radius += 9; r.life -= 0.012 }
  ripples = ripples.filter(r => r.life > 0)

  // only dots near the mouse can get hot, unless a ripple is crossing the grid
  let c0 = 0, c1 = cols - 1, r0 = 0, r1 = rows - 1
  if (!ripples.length) {
    c0 = Math.max(0, Math.floor((pointer.x - REACH - offX) / GAP))
    c1 = Math.min(cols - 1, Math.ceil((pointer.x + REACH - offX) / GAP))
    r0 = Math.max(0, Math.floor((pointer.y - REACH - offY) / GAP))
    r1 = Math.min(rows - 1, Math.ceil((pointer.y + REACH - offY) / GAP))
  }

  let moving = ripples.length > 0
  dctx.fillStyle = hotColor
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c
      const inRange = r >= r0 && r <= r1 && c >= c0 && c <= c1
      if (!inRange && heat[i] < 0.01) continue // cold and far away, skip it

      const x = offX + c * GAP, y = offY + r * GAP
      let target = 0
      if (inRange) {
        const d = Math.hypot(x - pointer.x, y - pointer.y)
        target = Math.max(0, 1 - d / REACH)
        for (const rp of ripples) {
          const band = 1 - Math.abs(Math.hypot(x - rp.x, y - rp.y) - rp.radius) / 40
          if (band > 0) target = Math.max(target, band * rp.life)
        }
      }

      // ease toward the target so it feels soft instead of jumpy
      heat[i] += (target - heat[i]) * 0.18
      if (Math.abs(target - heat[i]) > 0.01) moving = true
      if (heat[i] < 0.04) continue

      dctx.globalAlpha = 0.25 + heat[i] * 0.75
      dctx.beginPath()
      dctx.arc(x, y, 1 + heat[i] * 3.2, 0, Math.PI * 2)
      dctx.fill()
    }
  }
  dctx.globalAlpha = 1
  return moving
}

function loop() {
  if (heroVisible && render()) requestAnimationFrame(loop)
  else running = false
}
// wakes the loop up, it goes back to sleep by itself once everything has settled
function wake() {
  if (running || reduceMotion || !heroVisible) return
  running = true
  requestAnimationFrame(loop)
}

window.addEventListener('pointermove', e => {
  const box = dotCanvas.getBoundingClientRect()
  pointer.x = e.clientX - box.left
  pointer.y = e.clientY - box.top
  // only bother if the mouse is somewhere near the grid
  if (pointer.y > -REACH && pointer.y < dh + REACH) wake()
}, { passive: true })
document.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; wake() })

dotCanvas.closest('section').addEventListener('pointerdown', e => {
  if (reduceMotion) return
  const box = dotCanvas.getBoundingClientRect()
  ripples.push({ x: e.clientX - box.left, y: e.clientY - box.top, radius: 0, life: 1 })
  wake()
})

new IntersectionObserver(([entry]) => {
  heroVisible = entry.isIntersecting
  if (heroVisible) wake()
}).observe(dotCanvas)

let resizeTimer
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(setupDots, 150)
})
window.addEventListener('themechange', () => {
  readColors()
  drawBase()
  render()
})

setupDots()
