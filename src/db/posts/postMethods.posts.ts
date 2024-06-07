import postsData from "./postsData.json";
import generateUUID from "../../common/utils/uuid.utils";

const postsArray: IPosts[] = postsData;

const posts: IPostMethods = {
    findOne: (query) => {
        const { title } = query;

        return postsArray.find(post => post.title === title);
    },
    create: (data) => {
        const postId = generateUUID();
        const newPost = { ...data, id: postId, creationDate: new Date() };

        postsArray.push(newPost);

        return newPost;
    },
    getAllPosts: () => postsArray
};

export default posts;