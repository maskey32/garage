import postsData from "./postsData.json";
import generateUUID from "../../common/utils/uuid.utils";

const postsArray: IPost[] = postsData;

const posts: IPostMethods = {
    findOne: (query): IPost | undefined => {
        const { title, postId } = query;

        if (title) {
            return postsArray.find(post => post.title === title);
        }

        if (postId) {
            return postsArray.find(post => post.postId === postId);
        }
    },
    create: (data): IPost => {
        const postId = generateUUID();
        const newPost = { ...data, postId, creationDate: new Date() };

        postsArray.push(newPost);

        return newPost;
    },
    getAllPosts: (): IPost[] => postsArray,
    update: (data: IpostRequestBody): IPost => {
        const { postId, title, content } = data;

        const post = postsArray.find(post => post.postId === postId) as IPost;
        const postIndex = postsArray.findIndex(post => post.postId === postId);

        const updatedPost = { ...post, title,  content };

        postsArray.splice(postIndex, 1, updatedPost);

        return updatedPost;
    },
    delete: (data: { postId: string }): IPost => {
        const postIndex = postsArray.findIndex(post => post.postId !== data.postId);

        const deletedPostArray = postsArray.splice(postIndex, 1);

        return deletedPostArray[0];
    }
};

export default posts;