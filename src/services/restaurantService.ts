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
