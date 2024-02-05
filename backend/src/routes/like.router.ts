import {Router} from "express";

import {
    createLike,
    deleteLike,
    getAllLikes,
    getLikeById,
    updateLike
} from "../controllers/like.controller";

const likeRouter = Router()

likeRouter.get('/', getAllLikes)
likeRouter.get("/:id", getLikeById)
likeRouter.post('/', createLike)
likeRouter.put("/:id", updateLike)
likeRouter.delete("/:id", deleteLike)

export default likeRouter