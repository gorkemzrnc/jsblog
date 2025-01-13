import { useEffect, useState } from "react"
import { getBlogs } from "../lib/api";

function processHtmlString(htmlString: string) {
  const stringWithoutImages = htmlString.replace(/<img[^>]*>/g, '');
  return stringWithoutImages;
}

const ArticleList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await getBlogs({ page: 1 });
      console.log(response);
      setBlogs(response.results);
    }
    fetchBlogs();
  }, [])

  return (
    <div className="w-full flex flex-col">
      {
        blogs.length > 0 && blogs.map((blog) => (
          <div key={blog.id} className="w-full flex justify-between border border-gray-300 p-4 my-2 overflow-hidden h-48">
            <div className="flex flex-col gap-2 w-[80%] h-full">
              <h1 className="text-2xl font-bold">{blog.title}</h1>
              <div
                className="card-content text-gray-700 w-full"
                dangerouslySetInnerHTML={{ __html: processHtmlString(blog.content) }}
              />
            </div>
            <img src={`http://localhost:8000/uploads/${blog.thumbnailImage}`} className="h-32 rounded-md" />
          </div>
        ))
      }
    </div>
  )
}

export default ArticleList;