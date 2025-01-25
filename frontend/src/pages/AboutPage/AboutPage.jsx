import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as postService from '../../services/jobService';

export default function AboutPage() {
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const post = await postService.create(content);
      navigate('/posts');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>About Us</h2>
    </>
  );
}