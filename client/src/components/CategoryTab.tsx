import { useRef } from 'react';
import { CategoryData } from "../data/CategoryData";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CategoryTab = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const categoryWidth = scrollRef.current.firstChild ? (scrollRef.current.firstChild as HTMLElement).clientWidth : 0;
      const scrollTo = direction === 'left' ? scrollLeft - categoryWidth : scrollLeft + categoryWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }

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
        {CategoryData.map((category, index) => (
          <div key={index} className="min-w-[100px] w-[100px]">
            <span className='tracking-wide text-gray-600 font-serif font-medium flex justify-center'>
              {category.category}
            </span>
          </div>
        ))}
      </div>
      <button onClick={() => scroll('right')} className="h-full text-gray-600"><AiOutlineRight className="text-lg "/></button>
    </div>
  );
};

export default CategoryTab;