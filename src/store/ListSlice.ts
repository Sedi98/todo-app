import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewNote,
  deleteNote,
  getAllNotesByUser,
  updateNoteStatus,
} from "../lib/crud";
import type { ListResponse } from "../../types/types";

interface ListState {
  list: ListResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: ListState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk(
  "list/fetchNotes",
  async (completed: boolean | undefined) => {
    const response = await getAllNotesByUser(completed);
    return response;
  }
);

export const createNote = createAsyncThunk(
  "list/createNote",
  async (text: string) => {
    const response = await addNewNote(text);
    return response; // assuming response includes the created note with id
  }
);

export const removeNote = createAsyncThunk(
  "list/removeNote",
  async (noteId: number) => {
    const response = await deleteNote(noteId);
    return response; // return the id so we can remove it from state
  }
);

export const updateStatus = createAsyncThunk(
  "list/updateStatus",
  async ({ noteId, completed }: { noteId: number; completed: boolean }) => {
    await updateNoteStatus(noteId, completed);
    return { noteId, completed }; // return both so we can update state
  }
);

export const ListSlice = createSlice({
  name: "List",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Notes cases
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data ?? [];
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      })
      // Create Note cases
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.list.push(action.payload[0]);
        }
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create note";
      })
      // Remove Note cases
      .addCase(removeNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.data) {
          state.list = state.list.filter(
            // @ts-ignore
            (note) => note.id !== action.payload.data[0]?.id
          );
        }

        console.log(action.payload);
      })
      .addCase(removeNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete note";
      })
      //   update status
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { noteId, completed } = action.payload;
        const note = state.list.find((note) => note.id === noteId);
        if (note) {
          note.completed = completed;
        }
      });
  },
});

export default ListSlice.reducer;
