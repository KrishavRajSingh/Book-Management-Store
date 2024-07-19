import axios from 'axios';

const API_URL = 'http://localhost:5000'; // replace with your backend URL

export const register = async (username, password) => {
    return axios.post(`${API_URL}/auth/register`, {username, password});
}

export const login = async (username, password) => {
    return axios.post(`${API_URL}/auth/login`, {username, password});
}

export const getBooks = async () => {
    return await axios.get(`${API_URL}/books`);
};

export const getBookById = async (id) => {
    return await axios.get(`${API_URL}/books/${id}`);
};

export const addBook = async (book, token) => {
    return await axios.post(`${API_URL}/books/add`, book,
        {headers: {
            Authorization: `Bearer ${token}`
        }});
};

export const updateBook = async (id, book, token) => {
    return await axios.put(`${API_URL}/books/${id}/update`, book, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteBook = async (id, token) => {
    return await axios.delete(`${API_URL}/books/${id}/delete`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
