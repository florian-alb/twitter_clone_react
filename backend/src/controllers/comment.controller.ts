import {PrismaClient} from "@prisma/client";

const commentClient = new PrismaClient().comment

// getAllComments
export const getAllComments = async (req: any, res: any) => {
    try {
        const allComments = await commentClient.findMany()
        res.status(200).json({data: allComments})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the comments"})
    }
}

// getCommentById
export const getCommentById = async (req: any, res: any) => {
    try {
        const commentId = req.params.id;
        const comment = await commentClient.findUnique({
            where: {
                id: commentId,
            }
        })
        if (comment) {
            res.status(200).json({data: comment});
        } else {
            res.status(404).json({message: `The comment with ID ${commentId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the comment with ID ${req.params.id}`});
    }
};


// createComment
export const createComment = async (req: any, res: any) => {
    try {
        const commentData = req.body
        const comment = await commentClient.create({
            data: commentData,
        })
        res.status(201).json({data: comment})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new comment"})
    }
}

// updateComment
export const updateComment = async (req: any, res: any) => {
    try {
        const commentId = req.params.id
        const commentData = req.body
        const comment = await commentClient.update({
            where: {
                id: commentId,
            },
            data: commentData,
        })
        res.status(200).json({data: comment})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the comment"})
    }
}

// deleteComment
export const deleteComment = async (req: any, res: any) => {
    try {
        const commentId = req.params.id
        await commentClient.delete({
            where: {
                id: commentId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the comment"})
    }
}