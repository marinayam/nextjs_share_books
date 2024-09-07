"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateReview = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("id");

  const [post, setPost] = useState({ review: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getReviewDetails = async () => {
      const response = await fetch(`/api/review/${reviewId}`);
      const data = await response.json();

      setPost({
        review: data.review,
        tag: data.tag,
      });
    };

    if (reviewId) getReviewDetails();
  }, [reviewId]);

  const updateReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!reviewId) return alert("reviewIdがありません!");

    try {
      const response = await fetch(`/api/review/${reviewId}`, {
        method: "PATCH",
        body: JSON.stringify({
          review: post.review,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateReview}
    />
  );
};

export default UpdateReview;