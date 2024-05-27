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
        const imageUrls = data.map((item) => item.flickr_images).flat();
        setImages(imageUrls);
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
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
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
              images.map((url, index) => (
                <Box key={index} boxSize={boxSize} m="16px">
                  <Image src={url} alt={`SpaceX ${scope}`} />
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
