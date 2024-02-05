import {PrismaClient} from "@prisma/client";

const postClient = new PrismaClient().post

// getAllPosts
export const getAllPosts = async (req: any, res: any) => {
    try {
        const allPosts = await postClient.findMany({
            include: {
                comments: true,
                likes: true
            }
        })
        res.status(200).json({data: allPosts})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the posts"})
    }
}

// getPostById
export const getPostById = async (req: any, res: any) => {
    try {
        const postId = req.params.id;
        const post = await postClient.findUnique({
            where: {
                id: postId,
            },
            include: {
                comments: true,
                likes: true
            }
        })
        if (post) {
            res.status(200).json({data: post});
        } else {
            res.status(404).json({message: `The post with ID ${postId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the post with ID ${req.params.id}`});
    }
};


// createPost
export const createPost = async (req: any, res: any) => {
    try {
        const postData = req.body
        const post = await postClient.create({
            data: postData,
        })
        res.status(201).json({data: post})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new post"})
    }
}

// updatePost
export const updatePost = async (req: any, res: any) => {
    try {
        const postId = req.params.id
        const postData = req.body
        const post = await postClient.update({
            where: {
                id: postId,
            },
            data: postData,
        })
        res.status(200).json({data: post})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the post"})
    }
}

// deletePost
export const deletePost = async (req: any, res: any) => {
    try {
        const postId = req.params.id
        await postClient.delete({
            where: {
                id: postId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the post"})
    }
}