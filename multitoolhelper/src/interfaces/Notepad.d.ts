export interface Notepad {
    id:number;
    title:string;
    content:string;
    createdAt: Date;
    updatedAt: Date;
    labels?: NotepadLabel[];
}

export interface NotepadLabel {
    id: number;
    name: string;
    color?:string;
}