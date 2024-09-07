import React, { createContext, useContext, useState } from 'react';
const Context = createContext({
    user: null,
    setUser: () => { },
    accessToken: null,
    setAccessToken: () => { },
    // profile: null,
    // setProfile: () => {},
    // notifications: [],
    // setNotifications: () => {},
    posts: [],
    setPosts: () => { },
    // comments: [],
    // setComments: () => {},
    // likes: [],
    // setLikes: () => {},

});
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [accessToken, setToken] = useState(window.localStorage.getItem('access_token'));
    const setAccessToken = (token) => {
        setToken(token);    
        token ? window.localStorage.setItem('access_token', token) : window.localStorage.removeItem('access_token');
    }
    return (
        <Context.Provider value={{ user, setUser, accessToken, setAccessToken, posts, setPosts }}>
            {children}
        </Context.Provider>
    );
}

// const [profile, setProfile] = useState(null);
// const [notifications, setNotifications] = useState([]);
// const [posts, setPosts] = useState([]);
// const [comments, setComments] = useState([]);
// const [likes, setLikes] = useState([]);
// }

export const useStateContext = () => useContext(Context);