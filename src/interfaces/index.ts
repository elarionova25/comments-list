export interface IPagination {
    page: number;
    size: number;
    total_pages: number;
}

export interface IComment {
    id: number,
    created: string,
    text: string,
    author: number,
    parent: number | null,
    likes: number,
    children: IComment[] | [],
}

export interface IAuthor {
    id: number,
    name: string,
    avatar: string,
}