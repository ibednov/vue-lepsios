const isClient = () => typeof window !== 'undefined'

export const scrollToTop = () => {
  if (!isClient()) {
    return
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export const lockPageScroll = () => {
  if (!isClient()) {
    return
  }
  document.body.style.overflow = 'hidden'
}

export const unlockPageScroll = () => {
  if (!isClient()) {
    return
  }
  document.body.style.overflow = 'auto'
}
