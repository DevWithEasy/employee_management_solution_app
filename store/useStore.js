import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const appStore = (set) => ({
    loading: false,
    setLoading: () => {
        set((state) => ({
            loading : state.loading ? false : true
        }))
    }
})
const useAppStore = create(
    devtools(appStore)
)
export default useAppStore;