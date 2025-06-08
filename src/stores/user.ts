import {defineStore} from 'pinia'
import {ref} from 'vue'
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    type User
} from 'firebase/auth'
import {auth} from '../firebase'

const LOCAL_STORAGE_KEY = 'firebase:authUser'
const googleProvider = new GoogleAuthProvider()

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const error = ref<string | null>(null)
    const isLoading = ref(false)

    const setUser = (firebaseUser: User | null) => {
        user.value = firebaseUser
        if (firebaseUser) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(firebaseUser))
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY)
        }
    }

    const init = () => {
        const savedUser = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (savedUser) {
            try {
                user.value = JSON.parse(savedUser)
            } catch (e) {
                localStorage.removeItem(LOCAL_STORAGE_KEY)
            }
        }

        onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
        })
    }

    const loginWithGoogle = async () => {
        isLoading.value = true
        error.value = null
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (e: any) {
            error.value = e.message
            throw e
        } finally {
            isLoading.value = false
        }
    }

    const login = async (email: string, password: string) => {
        isLoading.value = true
        error.value = null
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (e: any) {
            error.value = e.message
            throw e
        } finally {
            isLoading.value = false
        }
    }

    const register = async (email: string, password: string) => {
        isLoading.value = true
        error.value = null
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (e: any) {
            error.value = e.message
            throw e
        } finally {
            isLoading.value = false
        }
    }

    const logout = async () => {
        isLoading.value = true
        try {
            await signOut(auth)
            setUser(null)
        } catch (e: any) {
            error.value = e.message
        } finally {
            isLoading.value = false
        }
    }

    return {
        user,
        error,
        isLoading,
        init,
        login,
        logout,
        register,
        loginWithGoogle
    }
})