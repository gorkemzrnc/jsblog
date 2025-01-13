import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createBlog } from '../lib/api';

const BlogPanel = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('674dc94584c252ac479bd7a8');
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['code-block'],
    ['link', 'image'],
    ['clean'],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('category', category);
    if (thumbnailImage) {
        postData.append('thumbnailImage', thumbnailImage);
    }

    try {
      const response = await createBlog(postData);
      console.log('Post saved:', response);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  console.log(content);
  return (
    <div className="w-full min-h-screen">
      <div className="blog-section container mx-auto mt-14 px-4">
        <h1 className="text-2xl mb-8">Blogs</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Başlık"
            required
          />
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            modules={modules}
            className='mx-auto mb-16 my-4 h-96'
          />
          <div className='flex gap-3 items-center'>
            <span className='tracking-wide text-lg'>Thumbnail Image:</span>
            <input
              type="file"
              name='thumbnailImage'
              onChange={(e) => setThumbnailImage(e.target.files?.[0] || null)}
              required
            />
            <button type="submit" className='rounded-full w-20 h-10 bg-blue-500 text-white'>Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogPanel;