import {Router} from "express";

import {
    createComment,
    deleteComment,
    getAllComments,
    getCommentById,
    updateComment
} from "../controllers/comment.controller";

const commentRouter = Router()

commentRouter.get('/', getAllComments)
commentRouter.get("/:id", getCommentById)
commentRouter.post('/', createComment)
commentRouter.put("/:id", updateComment)
commentRouter.delete("/:id", deleteComment)

export default commentRouter