import { useEffect, useState } from 'react';
import RecursiveCategoryAccordion from './RecursiveCategoryAccordion';
import { AccordionDetails } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

function NestedCategories({ categories, setFilters }) {
  const [checkedState, setCheckedState] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initCheckedState = {};
    const categoriesFromParams =
      searchParams.get('categories')?.split(',').map(decodeURIComponent) || [];

    const initializeCheckedState = (categoryList, state) => {
      categoryList.forEach((category) => {
        const isCategoryChecked = categoriesFromParams.includes(category.name);
        state[category.id] = isCategoryChecked;

        if (isCategoryChecked && category.subcategories) {
          checkSubcategories(category.subcategories, state, isCategoryChecked);
        } else if (category.subcategories) {
          initializeCheckedState(category.subcategories, state);
        }
      });
    };

    initializeCheckedState(categories, initCheckedState);
    setCheckedState(initCheckedState);
  }, [searchParams, categories]);

  const checkSubcategories = (subcategories, state, isChecked) => {
    subcategories.forEach((subcat) => {
      state[subcat.id] = isChecked;
      if (subcat.subcategories) {
        checkSubcategories(subcat.subcategories, state, isChecked);
      }
    });
  };

  const checkSupercategories = (categoryId, state, categories) => {
    // Helper function to recursively check parent categories
    const recursivelyCheckParents = (id, categoriesArray) => {
      for (const category of categoriesArray) {
        if (category.subcategories.some((subcat) => subcat.id === id)) {
          // Check if all sibling subcategories are checked
          const allSiblingsChecked = category.subcategories.every(
            (subcat) => state[subcat.id]
          );
          // If all siblings are checked, set the parent category as checked
          if (allSiblingsChecked) {
            state[category.id] = true;
            // Recursively check this category's parent
            recursivelyCheckParents(category.id, categories);
          }
          break; // Found the immediate parent, no need to look further
        }

        if (category.subcategories.length > 0) {
          recursivelyCheckParents(id, category.subcategories);
        }
      }
    };

    // Start the recursive checking process for the current categoryId
    recursivelyCheckParents(categoryId, categories);
  };

  const uncheckSupercategories = (categoryId, state, categories) => {
    state[categoryId] = false;

    const parentCategoryId = findCategoryById(categories, categoryId).parent;
    if (parentCategoryId !== null) {
      uncheckSupercategories(parentCategoryId, state, categories);
    }
  };

  const handleToggle = (id, isChecked, subcategories) => {
    setCheckedState((prevState) => {
      const newCheckedState = { ...prevState, [id]: isChecked };

      if (subcategories) {
        checkSubcategories(subcategories, newCheckedState, isChecked);
      }

      if (!isChecked) {
        uncheckSupercategories(id, newCheckedState, categories);
      } else {
        checkSupercategories(id, newCheckedState, categories);
      }

      updateQueryParams(newCheckedState);

      return newCheckedState;
    });
  };

  // Function to find category by id, including nested subcategories and assigns parent prop
  const findCategoryById = (categories, id, parentId = null) => {
    for (const category of categories) {
      if (category.id === id) {
        return { ...category, parent: parentId };
      }
      if (category.subcategories.length > 0) {
        const found = findCategoryById(category.subcategories, id, category.id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const updateQueryParams = (newCheckedState) => {
    const categoryIds = Object.keys(newCheckedState).filter(
      (key) => newCheckedState[key]
    );

    const queryParamsArray = categoryIds.filter((id) => {
      const category = findCategoryById(categories, parseInt(id));
      return !category.parent || !newCheckedState[category.parent];
    });

    const categoryNames = queryParamsArray.map((id) => {
      const category = findCategoryById(categories, parseInt(id));
      return category.name;
    });

    const categoriesQueryParams = categoryNames.join(',');
    setFilters((prevState) => ({
      ...prevState,
      categories: categoriesQueryParams,
    }));
  };

  return (
    <AccordionDetails>
      {categories.map((category) => (
        <RecursiveCategoryAccordion
          key={category.id}
          category={category}
          handleToggle={handleToggle}
          checkedState={checkedState}
        />
      ))}
    </AccordionDetails>
  );
}

export default NestedCategories;
