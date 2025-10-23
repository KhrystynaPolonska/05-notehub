import axios from "axios";
import type { Note, NoteCreate } from "../types/note";
import type { NoteResponse } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

export async function fetchNotes(page = 1, perPage = 12, search = '') {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search.trim()) {
    params.search = search.trim();
  }

  const response = await axios.get<NoteResponse>(BASE_URL, {
    params,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
}

export async function createNote(note: NoteCreate): Promise<Note> {
  const response = await axios.post<Note>(BASE_URL, note, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const url = `${BASE_URL}/${id}`;
  const response = await axios.delete<Note>(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}
