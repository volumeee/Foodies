import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Animated from "react-native-reanimated";

export const CacheImage = (props) => {
  const [cacheSource, setCacheSource] = useState(null);
  const { uri } = props;
  useEffect(() => {
    const getCachedImage = async () => {
      try {
        // console.log("Trying to get cached image for URI:", uri);
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          // console.log("Found cached image for URI:", uri);
          setCacheSource({ uri: cachedImageData });
        } else {
          // console.log("Cached image not found for URI:", uri);
          const response = await fetch(uri);
          const imageBlob = await response.blob();
          const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
          await AsyncStorage.setItem(uri, base64Data);
          setCacheSource({ uri: base64Data });
        }
      } catch (error) {
        // console.error("errror caching image", error);
        setCacheSource({ uri });
      }
    };
    getCachedImage();
  }, []);

  return <Animated.Image source={cacheSource} {...props} />;
};
