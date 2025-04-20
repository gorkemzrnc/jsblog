import { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createBlog } from '../../lib/api';
import Input from '../../components/ui/Input';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Dropdown';
import { useCategory } from '../../hooks/useCategoryData';
import { useToast } from '../../hooks/useToast';

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['code-block'],
  ['link', 'image'],
  ['clean'],
];

const BlogPanel = () => {
  const { user } = useContext(AuthContext) || { user: null };
  const { toast } = useToast();
  const { categories } = useCategory();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<(string | number)[]>([]);
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  console.log(category)
  const modules = {
    toolbar: toolbarOptions,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    category.forEach(cat => {
      postData.append('categories[]', cat.toString());
    });
    postData.append('userId', user._id);
    
    if (thumbnailImage) {
      postData.append('thumbnailImage', thumbnailImage);
    }

    if(!title){
      toast.show('title must be filled', {type:'error'});
      return;
    }

    if(!content){
      toast.show('content must be filled', {type:'error'});
      return;
    }

    if(!category.length){
      toast.show('category must be filled', {type:'error'});
      return;
    }

    try {
      const response = await createBlog(postData);
      toast.show('Post created successfully', {type: 'success'})
      console.log('Post saved:', response);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const selectCategories = () => {
    return [
      ...categories.map(data => (
        {
          label: data.categoryName,
          value: data._id
        }
      ))
    ]
  }

  return (
    <div className="w-full min-h-screen">
      <div className="blog-section container mx-auto mt-14 px-4">
        <h1 className="text-2xl mb-8">Blogs</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='flex flex-col gap-4'>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Başlık"
            // required
          />
          <Select 
            placeholder='Pick Category' 
            options={selectCategories()} 
            onChange={(selectedValues) => setCategory(Array.isArray(selectedValues) ? selectedValues : [])}
            multiple
            required
          />
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            modules={modules}
            className='mb-16 h-96'
          />
          <div className='flex gap-3 items-center'>
            <span className='tracking-wide text-lg'>Thumbnail Image:</span>
            <Input
              type="file"
              name='thumbnailImage'
              onChange={(e) => setThumbnailImage(e.target.files?.[0] || null)}
              required
              variant='outline'
            />
            <Button type="submit" variant='green'>Kaydet</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogPanel;