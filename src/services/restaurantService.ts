import { faker } from '@faker-js/faker';

export interface RestauranDetailsState {
  details: {
    itemImgSrc: string;
    restaurantName: string;
    foodTypes: string[];
    distance: number | null;
    openTime: number[] | null;
    minOrderAmount: number | null;
    minDeliveryFee: number | null;
  };
}
interface errorResponse {
  error: string;
}
interface category {
  name: string;
  id: number;
}

interface FoodItem {
  image: string;
  name: string;
  calories: number;
  price: number;
  description: string;
}

const categoriesData: category[] = [
  { id: 1, name: 'Platters' },
  { id: 2, name: 'House Specials' },
  { id: 3, name: 'Create your own' },
  { id: 4, name: 'Salads' },
  { id: 5, name: 'Gym food' },
  { id: 6, name: 'Hot Power Bowls' },
  { id: 7, name: 'Rainbow Wraps' },
  { id: 8, name: 'Vegan Menu' },
  { id: 9, name: 'Snacks & Sides' },
  { id: 10, name: 'Yoghurt & fruit' },
  { id: 11, name: 'Cold Drinks' },
  { id: 12, name: 'Smoothies, shakes & juice' },
];

export const getRestaurantDetailsService = async (): Promise<
  RestauranDetailsState | errorResponse
> => {
  try {
    const randomHour = faker.number.int({ min: 1, max: 12 });
    const randomMinute = faker.number.int({ min: 0, max: 59 });

    const data: RestauranDetailsState = {
      details: {
        itemImgSrc: './logo/image-1.webp',
        restaurantName: `${faker.company.name()}`,
        foodTypes: ['Chicken', 'Salads', 'Healthy'],
        distance: faker.number.int({ min: 1, max: 5 }),
        openTime: [randomHour, randomMinute],
        minOrderAmount: faker.number.int({ min: 7, max: 14 }),
        minDeliveryFee: faker.number.int({ min: 1, max: 5 }),
      },
    };
    return data;
  } catch (error) {
    console.error('Error generating restaurant details:', error);
    return { error: 'Cannot generate data right now' };
  }
};

export const getCategoriesList = (): category[] => {
  try {
    return categoriesData;
  } catch (error) {
    console.error('Error generating category details:', error);
    return [];
  }
};

export const generatePopularFoodItems = (count: number) => {
  const foodItems: FoodItem[] = [];

  for (let i = 0; i < count; i++) {
    foodItems.push({
      image: faker.image.food(150, 150, true),
      name: faker.commerce.productName(),
      calories: faker.datatype.number({ min: 200, max: 1000 }),
      price: parseFloat(faker.commerce.price(5, 20, 2)),
      description: faker.lorem.paragraph(),
    });
  }

  return foodItems;
};

export const generateFoodItems = (count: number) => {
  const foodItems = [];

  for (let i = 0; i < count; i++) {
    foodItems.push({
      image: faker.image.food(150, 150, true),
      name: faker.commerce.productName(),
      calories: faker.datatype.number({ min: 200, max: 1000 }),
      price: parseFloat(faker.commerce.price(5, 20, 2)),
      description: faker.lorem.sentence(),
    });
  }

  return foodItems;
};
