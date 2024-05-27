import React, { useState, useEffect } from "react";
import { Container, VStack, Text, Select, Image, Spinner, Box, useBreakpointValue } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";

const Index = () => {
  const [scope, setScope] = useState("rockets");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.spacexdata.com/v4/${scope}`);
        const data = await response.json();
        const imageDetails = data.map((item) => ({
          url: item.flickr_images[0],
          title: item.name || item.description || "No title available",
        }));
        setImages(imageDetails);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [scope]);

  const boxSize = useBreakpointValue({ base: "100%", md: "100%" });

  return (
    <Container centerContent maxW="container.lg" minHeight="100vh" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" py={8}>
      <VStack spacing={4}>
        <Text fontSize="3xl" fontWeight="bold" mt={4}>
          Beautiful SpaceX images
        </Text>
        <Text fontSize="2xl">SpaceX Image Gallery</Text>
        <Select value={scope} onChange={(e) => setScope(e.target.value)} placeholder="Select scope">
          <option value="rockets">Rockets</option>
          <option value="launches">Launches</option>
          <option value="landpads">Landpads</option>
        </Select>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <VStack spacing={4}>
            {images.length > 0 ? (
              images.map((image, index) => (
                <Box key={index} boxSize={boxSize} m="16px">
                  <Image src={image.url} alt={`SpaceX ${scope}`} />
                  <Text fontWeight="bold" fontSize="1.8em">
                    {image.title}
                  </Text>
                </Box>
              ))
            ) : (
              <Text>No images available</Text>
            )}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
