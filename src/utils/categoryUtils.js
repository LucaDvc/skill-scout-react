const findCategoryById = (categories, id) => {
  for (let category of categories) {
    if (category.id === id) {
      return category;
    } else {
      const found = findCategoryById(category.subcategories, id);
      if (found) {
        return found;
      }
    }
  }
};

const categoryUtils = {
  findCategoryById,
};

export default categoryUtils;
