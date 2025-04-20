// import { useOutletContext } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import CategoryNav from '../../components/common/CategoryNav';
import ArticleList from '../../components/common/ArticleList';
import { useToast } from '../../hooks/useToast';

const Home = () => {
  // const { user } = useOutletContext();
  const { toast } = useToast();

  const handlePromise = () => {
    const promise = new Promise<string>((resolve, reject) => {
      setTimeout(() => Math.random() > 0.5 ? resolve('Success') : reject('Error'), 2000)
    })

    toast.promise(promise, {
      loading: <div>Processing...</div>,
      success: (data: string) => (
        <div>
          <strong>Operation Successful</strong>
          <p>Result: {data}</p>
        </div>
      ),
      error: (err) => (
        <div>
          <strong>Operation Failed</strong>
          <p>Error: {err}</p>
        </div>
      ),
    })
  }

  return (
    <div className='h-full w-full md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[1536px] mx-auto flex flex-col md:flex-row mt-4'>
      <div className='w-full md:w-[70%] flex flex-col md:mx-0'>
        <CategoryNav />
        <ArticleList />
      </div>
      <div className='hidden md:block md:w-[30%]'>
        <Sidebar />
        <button
          onClick={() =>
            toast.show('Profile updated successfully', {
              type: 'success',
              position: 'bottom-right',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo profile update')
              }
            })
          }
        >
          Show Success Toast
        </button>

        <button
          onClick={() =>
            toast.show('Invalid credentials', {
              type: 'error',
              description: 'Please check your email and password'
            })
          }
        >
          Show Error Toast
        </button>

        <button onClick={handlePromise}>
          Trigger Promise
        </button>
      </div>
    </div>
  )
}

export default Home