export interface TagModel {
    id: string
    name: string
    color: string
    bg: string
}

export interface TaskModel {
    id: string
    completed: Boolean
    title: string
    description: string
    tag: TagModel
    created: string
    deadline: string
}
