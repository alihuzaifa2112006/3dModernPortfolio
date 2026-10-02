import { createContext, useContext } from 'react'

/** `ready` flips to true once the preloader starts lifting, so entrance animations can begin. */
export const IntroContext = createContext({ ready: true })

export const useIntro = () => useContext(IntroContext)
