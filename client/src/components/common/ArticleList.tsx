import { Link } from "react-router-dom";
import { User } from "../../types/User";
import { useBlogs, useUsers } from '../../hooks/useBlogData';
import { ArticleParams } from "../../types";

function sanitizeContent(htmlString: string) {
  // Sadece resim ve kod bloklarını kaldır
  return htmlString
    .replace(/<img[^>]*>/g, '')
    .replace(/<pre[^>]*>[\s\S]*?<\/pre>/g, '');
}

// ArticleCard bileşeni
const ArticleCard = ({ blog, user }: { blog: ArticleParams; user?: User }) => {
  return (
    <Link
      key={blog._id}
      to={`/article/${blog._id}`}
      className="flex justify-between items-stretch h-48 border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden bg-white"
    >
      <div className="flex flex-col p-6 flex-1 overflow-hidden">
        <h1 className="text-xl font-bold mb-2 line-clamp-1">{blog.title}</h1>
        <div
          className="text-gray-600 text-ellipsis overflow-hidden line-clamp-3 [&>*]:inline [&>*]:whitespace-normal"
          dangerouslySetInnerHTML={{ __html: sanitizeContent(blog.content) }}
        />
        <UserInfo user={user} createdAt={blog.createdAt} />
      </div>
      {blog.thumbnailImage && <Thumbnail image={blog.thumbnailImage} title={blog.title} />}
    </Link>
  );
};

const UserInfo = ({ user, createdAt }: { user?: User; createdAt: string }) => (
  <div className="flex justify-between items-center mt-auto">
    <div className="flex gap-2 items-center h-6">
      <img
        src={`http://localhost:8000${user?.image}`}
        className="object-fill h-full rounded-full"
        alt={user?.username}
      />
      <div className="h-full text-gray-900 font-sans font-medium text-sm my-auto">
        {user?.username}
      </div>
    </div>
    <span className="text-gray-500 text-sm">
      {new Date(createdAt).toLocaleDateString('tr-TR')}
    </span>
  </div>
);

const Thumbnail = ({ image, title }: { image: string; title: string }) => (
  <div className="w-48 min-w-[12rem] h-full border-l">
    <img
      src={`http://localhost:8000/uploads/${image}`}
      className="h-full w-full object-cover"
      alt={title}
    />
  </div>
);

const ArticleList = () => {
  const { blogs } = useBlogs();
  const { users } = useUsers(blogs);

  return (
    <div className="w-full flex flex-col gap-4 mt-4 px-2">
      {blogs.map((blog) => (
        <ArticleCard
          key={blog._id}
          blog={blog}
          user={users.find((user) => user._id === blog.userId)}
        />
      ))}
    </div>
  );
};

export default ArticleList;