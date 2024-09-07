"use client";

import { useState, useEffect } from "react";

import ReviewCard from "./ReviewCard";

const ReviewCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 review_layout'>
      {data.map((post) => (
        <ReviewCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search状態管理
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/review");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterReviews = (searchtext) => {
    // 'i' flag for 大文字小文字を区別しない検索
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.review)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    // 短時間で連続して発生するイベントに対して、処理を一度だけ行う
    // このコードでは、ユーザーが入力を終えてから500ミリ秒経過した後に、検索結果をフィルタリングして表示する処理が実行
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterReviews(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterReviews(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='名前やタグで検索してください'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* all posts */}
      {searchText ? (
        <ReviewCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <ReviewCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;