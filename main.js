const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let mouse = {
  x: undefined,
  y: undefined
}

let maxRadius = 30
// let minRadius = 2

let colorArray = [
  '#734E38',
  '#F2EAE4',
  '#D9CBBF',
  '#A6866A',
  '#595022',
  '#59554C',
  '#F2EFDF',
  '#D0D9D4',
  '#AEBFBE',
  '#798C8C'
  ]

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  init()
})


function Circle(x, y, dx, dy, r) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.r = r
  this.minRadius = r
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = () => {
    c.beginPath()
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    c.fill()
    c.fillStyle = this.color
  }

  this.update = () => {
    if (this.x + this.r > innerWidth || this.x - r < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r > innerHeight || this.y - r < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx
    this.y += this.dy

    // interactivity 

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.r < maxRadius) {
        this.r += 1
      }
    } else if (this.r > this.minRadius) {
      this.r -= 1
    }
    this.draw()
  }
}

let circleArray = []

function init () {
  circleArray = []
  
  for (let i = 0; i < 800; i++) {
  let r = Math.random() * 3 + 1
  let x = Math.random() * (innerWidth - r * 2) + r
  let y = Math.random() * (innerHeight - r * 2) + r
  let dx = (Math.random() - .5) * 2
  let dy = (Math.random() - .5) * 2
  circleArray.push(new Circle(x, y, dx, dy, r))
  }
  
  animate()
}

const animate = function() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update()
  }
}


init()