import { create } from "zustand";
import axios from "axios";

export const useWorkspace = create((set, get) => ({
  workspaces: [],
  currentWorkspace: null,
  loading: false,
  error: null,

  fetchWorkspaces: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/workspace", { withCredentials: true });
      set({
        workspaces: res.data.payload || [],
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch workspaces",
        loading: false,
      });
    }
  },

  getWorkspaceById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/workspace/${id}`, { withCredentials: true });
      set({
        currentWorkspace: res.data.payload,
        loading: false,
      });
      return res.data.payload;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch workspace",
        loading: false,
      });
    }
  },

  createWorkspace: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/workspace", data, { withCredentials: true });
      const newWorkspace = res.data.payload;
      set((state) => ({
        workspaces: [...state.workspaces, newWorkspace],
        loading: false,
      }));
      return newWorkspace;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to create workspace",
        loading: false,
      });
      throw err;
    }
  },

  updateWorkspace: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`/workspace/${id}`, data, { withCredentials: true });
      const updatedWorkspace = res.data.payload;
      set((state) => ({
        workspaces: state.workspaces.map((w) => (w._id === id ? updatedWorkspace : w)),
        currentWorkspace: state.currentWorkspace?._id === id ? updatedWorkspace : state.currentWorkspace,
        loading: false,
      }));
      return updatedWorkspace;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to update workspace",
        loading: false,
      });
      throw err;
    }
  },

  deleteWorkspace: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/workspace/${id}`, { withCredentials: true });
      set((state) => ({
        workspaces: state.workspaces.filter((w) => w._id !== id),
        currentWorkspace: state.currentWorkspace?._id === id ? null : state.currentWorkspace,
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to delete workspace",
        loading: false,
      });
      throw err;
    }
  },

  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  clearError: () => set({ error: null }),
}));
