// import { useOutletContext } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CategoryTab from '../components/CategoryTab';
import ArticleList from '../components/ArticleList';
import PostForm from '../components/PostForm';


const Home = () => {
  // const { user } = useOutletContext();
  
  return (
    <div className='h-full w-full md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[1536px] mx-auto flex flex-col md:flex-row mt-4'>
      <div className='w-full md:w-[70%] flex flex-col md:mx-0'>
        <CategoryTab />
        <ArticleList />
        <PostForm />
      </div>
      <div className='hidden md:block md:w-[30%]'>
        <Sidebar/>
      </div> 
    </div>
  )
}

export default Home