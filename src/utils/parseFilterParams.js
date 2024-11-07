import { categoryType } from '../db/models/products.js';

const parseCategory = (category) => {
  if (typeof category !== 'string') return;
  if (categoryType.includes(category)) return category;
};

const parsedPrice = (price) => {
  if (typeof price !== 'string') return;

  const parsePrice = Math.ceil(parseInt(price));

  if (Number.isNaN(parsePrice)) return;

  return parsePrice;
};

export const parseFilterParams = (filter) => {
  const parsedCategory = parseCategory(filter.category);
  const parsedMinPrice = parsedPrice(filter.minPrice);
  const parsedMaxPrice = parsedPrice(filter.maxPrice);

  return {
    category: parsedCategory,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  };
};
