import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface User {
    uid: string
    email: string
    displayName: string
    photoURL: string
}

const initialUser: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
}

export const state = () => ({
    user: null as User | null,
})

export type UserState = ReturnType<typeof state>

export const getters: GetterTree<UserState, UserState> = {
    user: (state) => state.user,
}

export const mutations: MutationTree<UserState> = {
    SET_USER: (state, user: User) => {
        state.user = user
    },
}

export const actions: ActionTree<UserState, UserState> = {
    setUser(ctx, newUser: User) {
        const dataBody: User = {
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            photoURL: newUser.photoURL,
        }
        ctx.commit('SET_USER', dataBody)
        localStorage.setItem('user', JSON.stringify(dataBody))
    },
    clearUser(ctx) {
        ctx.commit('SET_USER', initialUser)
        localStorage.removeItem('user')
    },
}
