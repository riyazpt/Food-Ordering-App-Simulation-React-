import classes from "./AvialableMeaslsSummary.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMealsSummary = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHttpError, setIsHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-ordering-app-1d72b-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();

      console.log(responseData);
      const loadMeals = [];
      for (const key in responseData) {
        loadMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setIsHttpError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <sectionc className={classes.mealsLoading}>
        <p>Loading...</p>
      </sectionc>
    );
  }
  if (isHttpError) {
    return (
      <sectionc className={classes.mealsError}>
        <p>{isHttpError}...</p>
      </sectionc>
    );
  }
  const mealsList = meals.map((meal) => (
    <i>
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    </i>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMealsSummary;
