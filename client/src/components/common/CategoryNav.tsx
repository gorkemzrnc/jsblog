import { useEffect, useRef, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { getCategories } from '../../lib/api';
import { CategoriesParams } from '../../types';

const CategoryTab = () => {
  const [categories, setCategories] = useState<CategoriesParams[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const categoryWidth = scrollRef.current.firstChild ? (scrollRef.current.firstChild as HTMLElement).clientWidth : 0;
      const scrollTo = direction === 'left' ? scrollLeft - categoryWidth : scrollLeft + categoryWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }

  useEffect(()=>{
    const requestGetCategories = async ()=>{
      const response = await getCategories();
      setCategories(response.data);
    }
    requestGetCategories();
  }, []);

  console.log(categories);

  return (
    <div className="flex w-full ">
      <button onClick={() => scroll('left')} className="h-full text-gray-600"><AiOutlineLeft className="text-lg"/></button>
      <div 
        ref={scrollRef} 
        className="flex overflow-x-auto scrollbar-hide w-full"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {categories.map((category, index) => (
          <div key={index} className="min-w-[100px] w-[100px]">
            <span className='tracking-wide text-gray-600 font-serif font-medium flex justify-center'>
              {category.categoryName}
            </span>
          </div>
        ))}
      </div>
      <button onClick={() => scroll('right')} className="h-full text-gray-600"><AiOutlineRight className="text-lg "/></button>
    </div>
  );
};

export default CategoryTab;