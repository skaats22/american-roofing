import { useState, useEffect } from 'react';
import * as postService from '../../services/postService';

export default function ResourcePage() {

  useEffect(() => {
    async function fetchPosts() {
      const posts = await postService.index();
      setPosts(posts);
    }
    fetchPosts();
  // Empty dependency array means run this only once after rendering
  }, []);

  return (
    <>
      <h1>Frequently Asked Questions</h1>
    </>
  );
}