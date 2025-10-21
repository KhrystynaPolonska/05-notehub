export interface Note {
    id: string;
    title: string;
    content: string;
    tag: string;
    createdAt: string;
    updatedAt: string;
}

export interface NoteResponse {
    notes: Note[];
    totalPages: number;
    page: number;
}
export interface NoteCreate {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  }