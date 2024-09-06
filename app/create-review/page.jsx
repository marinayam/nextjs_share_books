"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateReview = () => {
  const router = useRouter()
  const {data: session} = useSession()

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ review: "", tag: "" });

  const createReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/review/new", {
        method: "POST",
        body: JSON.stringify({
          review: post.review,
          userId: session?.user.id,
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createReview}
    />
  );
};

export default CreateReview;
