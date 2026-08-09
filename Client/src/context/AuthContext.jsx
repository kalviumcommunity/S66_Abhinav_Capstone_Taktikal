import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Never call localhost from a deployed HTTPS site — browsers show a
    // "Access other apps and services on this device" permission prompt.
    const rawApi = import.meta.env.VITE_API_BASE_URL;
    const API_BASE_URL = (
        import.meta.env.PROD && (!rawApi || /localhost|127\.0\.0\.1/.test(rawApi))
    ) ? '/api' : (rawApi || 'http://localhost:3001/api');

    // Check if user is authenticated on app load
    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                    headers: {
                        ...(storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {})
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.coach);
                    if (storedToken) setToken(storedToken);
                } else {
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null);
            }
            setLoading(false);
        };

        checkAuth();
    }, [API_BASE_URL]);

    // Login function
    const login = useCallback(async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.coach);
                if (data.token) {
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                }
                return { success: true, user: data.coach };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }, [API_BASE_URL]);

    // Register function
    const register = useCallback(async (name, email, password, sport) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ name, email, password, sport })
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.coach);
                if (data.token) {
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                }
                return { success: true, user: data.coach };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Register error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }, [API_BASE_URL]);

    // Logout function
    const logout = useCallback(async () => {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    }, [API_BASE_URL]);

    // Send OTP for Password Change
    const sendPasswordOTP = useCallback(async () => {
        try {
            const storedToken = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {})
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, message: data.message, debugOtp: data.debugOtp };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Send OTP error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }, [API_BASE_URL]);

    // Verify OTP
    const verifyPasswordOTP = useCallback(async (otp) => {
        try {
            const storedToken = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {})
                },
                credentials: 'include',
                body: JSON.stringify({ otp })
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Verify OTP error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }, [API_BASE_URL]);

    // Change Password with OTP
    const changePasswordWithOTP = useCallback(async (otp, newPassword) => {
        try {
            const storedToken = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/auth/change-password-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {})
                },
                credentials: 'include',
                body: JSON.stringify({ otp, newPassword })
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Change password error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }, [API_BASE_URL]);

    // Delete Account
    const deleteAccount = useCallback(async () => {
        try {
            const storedToken = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/auth/account`, {
                method: 'DELETE',
                headers: {
                    ...(storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {})
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setUser(null);
                setToken(null);
                localStorage.removeItem('token');
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Delete account error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }, [API_BASE_URL]);

    const isAuthenticated = useCallback(() => {
        return !!user;
    }, [user]);

    const value = useMemo(() => ({
        user,
        setUser,
        token,
        loading,
        login,
        register,
        logout,
        sendPasswordOTP,
        verifyPasswordOTP,
        changePasswordWithOTP,
        deleteAccount,
        isAuthenticated,
        API_BASE_URL
    }), [
        user, token, loading, login, register, logout,
        sendPasswordOTP, verifyPasswordOTP, changePasswordWithOTP,
        deleteAccount, isAuthenticated, API_BASE_URL
    ]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
