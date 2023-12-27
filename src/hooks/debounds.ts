import { useEffect, useState } from "react"

export const useDebounds  = (value: string, delay = 300): string => {
    const [debounds, setDebounds] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebounds(value), delay)
        return () => clearTimeout(handler)
    },[value, delay])

    return debounds
}