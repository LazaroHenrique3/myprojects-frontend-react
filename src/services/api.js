import axios from "axios"

//Configurando a URL de conexão 
export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})

//Session
export const createSession = async (user) => {
    return api.post('/login', user)
}

//Projects
export const getProjects = async (userId, titleSearch = "") => {
    return api.get(`/project/${userId}/q=${titleSearch}`)
}

export const createProject = async (title, userId) => {
    return api.post('/project', {title, user: userId})
}

export const deleteProject = async (projectId) => {
    return api.delete(`/project/${projectId}`)
}

export const updateProject = async (projectId, title, status) => {
    return api.put(`/project/${projectId}`, {title, status})
}

//Tasks
export const createTask = async (title, projectId) => {
    return api.post('/task', {title, projectId})
}

export const deleteTask = async (taskId) => {
    return api.delete(`/task/${taskId}`)
}

export const updateTask = async (taskId, title, status) => {
    return api.put(`/task/${taskId}`, {title, status})
}

//User
export const createUser = async (name, email, password, passwordConfirm) => {
    return api.post(`/users`, {name, email, password, passwordConfirm})
}

export const deleteUser = async (userId) => {
    return api.delete(`/users/${userId}`)
}

export const updateUser = async (userId, name, email, password='', passwordConfirm='') => {
    return api.put(`/users/${userId}`, {name, email, password, passwordConfirm})
}