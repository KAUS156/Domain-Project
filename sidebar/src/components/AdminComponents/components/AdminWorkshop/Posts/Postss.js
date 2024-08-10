import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Postss.css';
import { UploadToCloudinary } from './UploadToCloudinary';

const Postss = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setPosts(response.data);
      console.log("FETCH POSTS DATA - ", posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await UploadToCloudinary(image);
      const response = await axios.post('http://localhost:8080/api/users/add', {
        text: text,
        imageUrl: imageUrl // Sending imageUrl instead of the image
      });
      setPosts([...posts, response.data]);
      setText('');
      setImage(null);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className='abc'>
      <h1></h1>
      <div className="PostBox">
        <div className="card">
          <div className="card-header">
            
          </div>
          <div className='postbox'>
            {posts.map(post => (
              <div className='post' key={post.id}>
                <img src={post.imageurl} alt="Post Image" /> {/* Display image */}
                <p>{post.text}</p>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="PostBar">
            <textarea
              name="text"
              placeholder="Enter post text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <button type='submit' id='send'>Add Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Postss;