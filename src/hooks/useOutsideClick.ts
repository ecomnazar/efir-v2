import React from 'react'

export const useOutsideClick = ( callBack: () => void) => {
    const ref = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(ref.current && !ref.current.contains(event.target as Node)){
                callBack()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [callBack])
    return ref;
}