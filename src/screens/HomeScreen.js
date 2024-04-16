import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";
import CustomAlert from "../components/alert";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      // console.log("response", response.data);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("err", err.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      // console.log("response", response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log("err", err.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      // console.log(response.data);
      if (response && response.data && response.data.meals !== null) {
        setMeals(response.data.meals);
        setShowAlert(false);
      } else {
        setAlertMessage("Resep tidak ditemukan");
        setShowAlert(true);
      }
    } catch (err) {
      console.log("err", err.message);
      setAlertMessage("Terjadi kesalahan saat mencari resep");
      setShowAlert(true);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar n bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/avatar.png")}
            style={{ height: hp(5), width: hp(5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings n punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text
            style={{ fontSize: hp(1.7) }}
            className="font-semibold text-neutral-600"
          >
            Hello, Moms!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Kreasikan cita rasa,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            dengan <Text className="text-amber-400">cinta</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-3.5 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Cari resep"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(2) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <Pressable onPress={handleSearch}>
            <View className="bg-white rounded-full p-3">
              <MagnifyingGlassIcon
                size={hp(2.5)}
                color="gray"
                strokeWidth={3}
              />
            </View>
          </Pressable>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes categories={categories} meals={meals} />
        </View>
      </ScrollView>
      {showAlert && (
        <CustomAlert
          title="Perhatian"
          message={alertMessage}
          onPressOk={() => setShowAlert(false)}
          onPress={() => {
            setShowAlert(false);
          }}
        />
      )}
    </View>
  );
};

export default HomeScreen;
