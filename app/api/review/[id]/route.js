import Review from "@models/review";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const review = await Review.findById(params.id).populate("creator")
        if (!review) return new Response("Reviewが見つかりません", { status: 404 });

        return new Response(JSON.stringify(review), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { review, tag } = await request.json();

    try {
        await connectToDB();

        // reviewが存在するかどうか
        const existingReview = await Review.findById(params.id);

        if (!existingReview) {
            return new Response("reviewが見つかりませんでした", { status: 404 });
        }

        // 新しいデータによってレビューを更新する
        existingReview.review = review;
        existingReview.tag = tag;

        await existingReview.save();

        return new Response("更新しました", { status: 200 });
    } catch (error) {
        return new Response("更新中にエラーが発生しました", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // 該当のReviewを見つけて削除
        await Review.findByIdAndRemove(params.id);

        return new Response("削除しました", { status: 200 });
    } catch (error) {
        return new Response("削除エラーが発生しました", { status: 500 });
    }
};