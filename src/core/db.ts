import Dexie, { type EntityTable } from 'dexie'

export type Project = {
   id: string,
   title: string,
   last_edited: Date,
   content: string,
}

export const db = new Dexie('flowchart') as Dexie & {
   projects: EntityTable<Project, 'id'>
}

db.version(1).stores({
   projects: 'id, title, last_edited, content',
})