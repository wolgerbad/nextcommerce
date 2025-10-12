'use client';
import { useState } from 'react';
import BookItem from './BookItem';
import { useCommerce } from '../lib/context/CommerceContext';

export default function BestSellersHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    'left' | 'right' | 'fade'
  >('fade');

  const { books, loading } = useCommerce();

  const booksPerSlide = 4;
  const totalSlides = Math.ceil(books.length / booksPerSlide);
  const currentBooks = books.slice(
    currentSlide * booksPerSlide,
    (currentSlide + 1) * booksPerSlide
  );

  const goToNext = () => {
    setAnimationDirection('right');
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevious = () => {
    setAnimationDirection('left');
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setAnimationDirection(
      slideIndex > currentSlide
        ? 'right'
        : slideIndex < currentSlide
        ? 'left'
        : 'fade'
    );
    setCurrentSlide(slideIndex);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-purple-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <h1 className="uppercase text-center text-purple-800 font-bold text-2xl my-10">
        Çok satanlar
      </h1>

      {/* Books Grid with Animation */}
      <div className="relative max-w-6xl mx-auto">
        <div
          key={currentSlide}
          className={`grid grid-cols-4 gap-4 ${
            animationDirection === 'left'
              ? 'animate-slideInLeft'
              : animationDirection === 'right'
              ? 'animate-slideInRight'
              : 'animate-fadeIn'
          }`}
        >
          {currentBooks.map((book: BookType) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* Navigation */}
      {totalSlides > 1 && (
        <>
          {/* Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-purple-700 transition-colors shadow-lg"
          >
            ‹
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-purple-700 transition-colors shadow-lg"
          >
            ›
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index
                    ? 'bg-purple-600'
                    : 'bg-gray-300 hover:bg-purple-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
