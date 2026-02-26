// src/api.js
const API_URL = "http://10.2.1.66:3001";

// Hent token fra localStorage når filen lastes
let token = localStorage.getItem("authToken");

export const api = {
  // LOGIN
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    token = data.token;
    localStorage.setItem("authToken", token);
    return data.user;
  },

  // log ut
  logout() {
    token = null;
    localStorage.removeItem("authToken");
  },

  // hent alle lister
  async getLists() {
    const response = await fetch(`${API_URL}/lists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  // opprett ny liste
  async createList(name, color = "#667eea", icon = "📋") {
    const response = await fetch(`${API_URL}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, color, icon }),
    });
    return response.json();
  },

  // slett liste
  async deleteList(id) {
    const response = await fetch(`${API_URL}/lists/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  // hent todos for en liste
  async getTodos(listId) {
    const response = await fetch(`${API_URL}/todos?list_id=${listId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  // opprett ny todo
  async createTodo(title, listId, description = "", priority = "medium") {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        list_id: listId,
        description,
        priority,
      }),
    });
    return response.json();
  },

  // OPPDATER TODO (toggle completed eller andre updates)
  async updateTodo(id, updates) {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PATCH", // Endret fra PUT til PATCH
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  // SLETT TODO
  async deleteTodo(id) {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  // Sjekk om bruker er logget inn
  isLoggedIn() {
    return !!token;
  },

  // Hent gjeldende token
  getToken() {
    return token;
  },
};
