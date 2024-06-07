import postsData from "../db/posts/postsData.json";
import posts from "../db/posts/postMethods.posts";
import { BadRequestResponse, InvalidDataResponse } from "./index.services";

const postsServices = {
    createPost: (data: IPosts): IPosts => {
        try {
            const { title } = data;
        
            const titleDuplicate = posts.findOne({ title });
        
            if (titleDuplicate) throw new InvalidDataResponse('Title already exist');
        
            const newPost = posts.create(data);
        
            return newPost;
        } catch (e: any) {
            throw new BadRequestResponse(e?.message || "Server error");
        }
    },
    getPosts: (): IPosts[] => {
        try {
            return posts.getAllPosts();
        } catch (e: any) {
            throw new BadRequestResponse(e?.message || "Server error");
        }
    },
    getPost: (data: Record<string, string>): IPosts => {
        try {
            const { id } = data;

            const post = posts.findOne({ id });

            if (!post) throw new InvalidDataResponse("Post does not exist");

            return post;
        } catch (e: any) {
            throw new BadRequestResponse(e?.message || "Server error");
        }
    },
};

export default postsServices;