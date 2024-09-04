import { faker } from "@faker-js/faker";

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
export const getRestaurantDetailsService = async (): Promise<
  RestauranDetailsState | errorResponse
> => {
  try {
    const randomHour = faker.number.int({ min: 1, max: 12 });
    const randomMinute = faker.number.int({ min: 0, max: 59 });

    const data: RestauranDetailsState = {
      details: {
        itemImgSrc: "./logo/image-1.webp",
        restaurantName: `${faker.company.name()}`,
        foodTypes: ["Chicken", "Salads", "Healthy"],
        distance: faker.number.int({ min: 1, max: 5 }),
        openTime: [randomHour, randomMinute],
        minOrderAmount: faker.number.int({ min: 7, max: 14 }),
        minDeliveryFee: faker.number.int({ min: 1, max: 5 }),
      },
    };
    return data;
  } catch (error) {
    console.error("Error generating restaurant details:", error);
    return { error: "Cannot generate data right now" };
  }
};
export const getCategoriesList = (): category[] => {
  try {
    const categoriesData: category[] = [
      { id: 1, name: "Platters" },
      { id: 2, name: "House Specials" },
      { id: 3, name: "Create your own" },
      { id: 4, name: "Salads" },
      { id: 5, name: "Gym food" },
      { id: 6, name: "Hot Power Bowls" },
      { id: 7, name: "Rainbow Wraps" },
      { id: 8, name: "Vegan Menu" },
      { id: 9, name: "Snacks & Sides" },
      { id: 10, name: "Yoghurt & fruit" },
      { id: 11, name: "Cold Drinks" },
      { id: 12, name: "Smoothies, shakes & juice" },
    ];

    return categoriesData;
  } catch (error) {
    console.error("Error generating category details:", error);
    // Return an empty array or handle the error as needed
    return [];
  }
};
