interface IpostRequestBody {
    postId?: string;
    title: string;
    content: string;
    author: string;
}

interface IPost extends IpostRequestBody {
    postId: string;
    creationDate: Date;
}

interface IPostMethods {
    findOne: (query: { title?: string, postId?: string }) => IPost | undefined;
    create: (data: IpostRequestBody) => IPost;
    getAllPosts: () => IPost[];
    update: (data: IpostRequestBody) => IPost;
    delete: (data: { postId: string }) => IPost;
}