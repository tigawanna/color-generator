import { createContext } from 'react'
import { createStore } from 'zustand'

interface BearProps {
    bears: number
}

interface BearState extends BearProps {
    addBear: () => void
}

type BearStore = ReturnType<typeof createBearStore>

export const createBearStore = (initProps?: Partial<BearProps>) => {
    const DEFAULT_PROPS: BearProps = {
        bears: 0,
    }
    return createStore<BearState>()((set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        addBear: () => set((state) => ({ bears: ++state.bears })),
    }))
}

export const BearContext = createContext<BearStore | null>(null)
