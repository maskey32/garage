import postsData from "../db/posts/postsData.json";
import posts from "../db/posts/postMethods.posts";
import { BadRequestResponse, InvalidDataResponse } from "./index.services";

const postsServices = {
    createPost: (data: IpostRequestBody): IPost => {
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
    getPosts: (): IPost[] => {
        try {
            return posts.getAllPosts();
        } catch (e: any) {
            throw new BadRequestResponse(e?.message || "Server error");
        }
    },
    getPost: (data: Record<string, string>): IPost => {
        try {
            const { postId } = data;

            const post = posts.findOne({ postId });

            if (!post) throw new InvalidDataResponse("Post does not exist");

            return post;
        } catch (e: any) {
            throw new BadRequestResponse(e?.message || "Server error");
        }
    },
    updatePost: (data: IpostRequestBody): IPost => {
        try {
          const { postId } = data;
  
          const post = posts.findOne({ postId });        
  
          if (!post) throw new InvalidDataResponse("Post does not exist");
  
          const updatedPost = posts.update(data);      
        
          return updatedPost;
        } catch (e: any) {
          throw new BadRequestResponse(e?.message || "Server error");
        }
      },
};

export default postsServices;