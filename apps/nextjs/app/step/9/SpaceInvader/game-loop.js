export const gameLoop = (update = () => null) => {
    let loop = lastTime => {
      let currentTime = now()
      update(currentTime - lastTime)
      requestAnimationFrame(() => loop(currentTime))
    }
    loop(now())
  }

  const now = () => Date.now()