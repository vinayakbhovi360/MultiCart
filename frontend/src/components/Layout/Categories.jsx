import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categoriesData } from "../../static";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/slices/productSlice";


const Categories = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category.title}`);
    dispatch(setCategory(category.title)); 
  };
  

  return (
    <div className="bg-white py-3">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div
            ref={scrollRef}
            className="overflow-hidden whitespace-nowrap pb-4 mx-auto"
            style={{ maxWidth: "calc(100vw - 2rem)" }}
          >
            <div className="inline-flex space-x-6">
              {categoriesData.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-center rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 transform hover:scale-105 h-40 w-auto cursor-pointer" 
                  onClick={() => handleCategoryClick(category)} 
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-auto object-cover transition-opacity duration-300 hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
