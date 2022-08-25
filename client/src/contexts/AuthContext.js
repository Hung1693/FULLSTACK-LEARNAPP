import { createContext, useReducer } from 'react';
import { authReducer } from '../reducer/AuthReducer';
import axios from 'axios';

export const AuthContext = createContext()

const AuthContextProvider = ({ childre }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    //login
    const loginUser = async userForm => {
        try {
            
        }
    }
}