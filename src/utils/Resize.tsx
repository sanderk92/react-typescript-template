export const onResize = (callback: () => void) => {
    window.addEventListener('resize', callback, {once: true})
}

export const resetOnResize = (callback: () => void) => {
    window.removeEventListener('resize', callback)
}