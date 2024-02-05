import {PrismaClient} from "@prisma/client";

const likeClient = new PrismaClient().like

// getAllLikes
export const getAllLikes = async (req: any, res: any) => {
    try {
        const allLikes = await likeClient.findMany()
        res.status(200).json({data: allLikes})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the likes"})
    }
}

// getLikeById
export const getLikeById = async (req: any, res: any) => {
    try {
        const likeId = req.params.id;
        const like = await likeClient.findUnique({
            where: {
                id: likeId,
            }
        })
        if (like) {
            res.status(200).json({data: like});
        } else {
            res.status(404).json({message: `The like with ID ${likeId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the like with ID ${req.params.id}`});
    }
};


// createLike
export const createLike = async (req: any, res: any) => {
    try {
        const likeData = req.body
        const like = await likeClient.create({
            data: likeData,
        })
        res.status(201).json({data: like})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new like"})
    }
}

// updateLike
export const updateLike = async (req: any, res: any) => {
    try {
        const likeId = req.params.id
        const likeData = req.body
        const like = await likeClient.update({
            where: {
                id: likeId,
            },
            data: likeData,
        })
        res.status(200).json({data: like})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the like"})
    }
}

// deleteLike
export const deleteLike = async (req: any, res: any) => {
    try {
        const likeId = req.params.id
        await likeClient.delete({
            where: {
                id: likeId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the like"})
    }
}