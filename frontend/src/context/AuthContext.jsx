import { createContext, useContext, useEffect, useState } from 'react';


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        try {
            const savedData = localStorage.getItem('user');

            if (savedData && savedData !== 'undefined') {
                const parsed = JSON.parse(savedData);

                // Only if both exist
                if (parsed?.user && parsed?.token) {
                    setUser(parsed.user);
                    setToken(parsed.token);
                }
            }
        } catch (err) {
            console.error('Failed to parse saved user data:', err);
            localStorage.removeItem('user'); // Clean up corrupted value
        }

        setLoading(false);
    }, []);


    const login = (data) => {
        if (!data || !data.user || !data.token) {
            console.error('Invalid login data:', data);
            return;
        }

        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
