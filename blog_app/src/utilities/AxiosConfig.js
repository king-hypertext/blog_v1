import axios from 'axios'

// Create an instance of axios
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
    },
});

// Define API endpoints

// export const getPosts = () => apiClient.get('/posts');

// export const getPost = (id) => apiClient.get(`/posts/${id}`);

// export const createPost = (data) => apiClient.post('/posts', data);

// export const updatePost = (id, data) => apiClient.put(`/posts/${id}`, data);

// export const deletePost = (id) => apiClient.delete(`/posts/${id}`);

// export const login = (data) => apiClient.post('/login', data);

// export const register = (data) => apiClient.post('/register', data);

// export const logout = () => apiClient.post('/logout');

// Set token in header for authenticated requests

apiClient.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// Remove token from header for unauthenticated requests

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            window.localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
