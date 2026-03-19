import axios, { type AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';

const apiNotes = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await apiNotes.get(
    '/notes',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }
  );
  return response.data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (payload: CreateNoteParams): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiNotes.post('/notes', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiNotes.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
