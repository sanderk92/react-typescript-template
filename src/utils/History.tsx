export const onBack = (callback: () => void) => {
    window.onpopstate = callback
}