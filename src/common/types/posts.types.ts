interface IPosts {
    id?: string;
    title: string;
    content: string;
    author: string;
    creationDate?: Date;
}

interface IPostMethods {
    findOne: (query: { title: string }) => IPosts | undefined;
    create: (data: IPosts) => IPosts;
}