import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getBlog, getCategoriesById, getUserById } from "../../lib/api";
import { User } from "../../types/User";
import { ArticleParams } from "../../types/Article";
import { CategoriesParams } from "../../types";


function calculateReadingTime(htmlText: string) {
  // HTML tag'larını ve fazla boşlukları temizle
  const cleanText = htmlText
    .replace(/<[^>]+>/g, ' ') // Tüm HTML tag'larını boşlukla değiştir
    .replace(/\s+/g, ' ')     // Ardışık boşlukları tek boşluğa indirge
    .trim();                  // Baştaki ve sondaki boşlukları kes

  const wordsPerMinute = 200;
  const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleParams>();
  const [categories, setCategories] = useState<CategoriesParams[]>([]);
  const [user, setUser] = useState<User>();
  const [_, setError] = useState('');

  if (!id) return;

  useEffect(() => {
    getBlog(id).then((response) => {
      setArticle(response.data);
    }).catch((error) => {
      setError(error);
    });
  }, []);

  useEffect(() => {
    const findUserById = async () => {
      if (article?.userId) {
        await getUserById(article.userId).then((response) => {
          setUser(response.data);
        })
      }
    }
    findUserById();

    const findCategoryByIds = async () => {
      if (article?.category) {
        const response = await getCategoriesById([article.category]);
        setCategories(response.data);
      }
    }
    findCategoryByIds();
  }, [article]);

  if (!user || !article) {
    return 'loading..'
  }

  const styledCategories = () => {
    return categories.map(
      category =>
        <div className="p-1 border rounded-md font-light text-sm tracking-wide">
          {
            category.categoryName
          }
        </div>
    );
  }

  return (
    <div className="w-full sm:w-[600px] md:w-[700px] mx-auto px-4">
      <div className="flex flex-col gap-4 mt-4">
        <h1 className="font-bold text-2xl">{article.title}</h1>
        <div className="flex gap-4">
          <img src={`http://localhost:8000${user.image}`} className="rounded-full w-14" />
          <div className="flex flex-col text-gray-700">
            <span className="text-lg text-black">{user.username}</span>
            <div className="flex gap-3 text-sm font-light">
              <span>
                {new Date(article.createdAt).toLocaleDateString("tr-TR")}
              </span>
              <span>
                • {calculateReadingTime(article.content)}
              </span>
            </div>
          </div>
          <div className="flex mb-1 items-end gap-4 text-gray-700">
            {
              categories.length > 0 ? styledCategories() : <></>
            }
          </div>
        </div>
        <img className="w-full mx-auto max-h-[500px] rounded-xl" src={`http://localhost:8000/uploads/${article.thumbnailImage}`} />
        {/* <ReactQuill value={article?.content || ''} readOnly={true} theme="bubble" /> */}
        <div className="blog-content mx-auto w-full" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  )
}

export default Article