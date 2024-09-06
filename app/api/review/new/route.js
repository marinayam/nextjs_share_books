import Review from "@models/review";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, review, tag } = await request.json();

    try {
        await connectToDB();
        const newReview = new Review({ creator: userId, review, tag });

        await newReview.save();
        return new Response(JSON.stringify(newReview), { status: 201 })
    } catch (error) {
        return new Response("投稿の作成に失敗しました", { status: 500 });
    }
}