export const resetToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

export const resetToBottom = () => {
    document.body.scrollTop = document.body.scrollHeight;
    document.documentElement.scrollTop = document.body.scrollHeight;
}

export const isAtTop = (): boolean => {
    return window.scrollY === 0
}

export const isAtBottom = (): boolean => {
    return (window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight
}

export const canScrollUp = (modifier: number): boolean => {
    return document.body.scrollTop > modifier || document.documentElement.scrollTop > modifier
}

export const canScrollDown = (modifier: number) : boolean => {
    return window.scrollY + window.innerHeight + modifier < document.body.scrollHeight;
}