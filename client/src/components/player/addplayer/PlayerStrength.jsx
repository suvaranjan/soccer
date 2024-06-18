// PlayerStrength.js
import React from "react";
import {
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Field } from "formik";

function PlayerStrength({ label, name }) {
  return (
    <Box mt="1rem" width="100%">
      <Text fontWeight="600" fontSize="1rem" mb="0.5rem">
        {label}
      </Text>
      <Field name={name}>
        {({ field, form }) => (
          <Slider
            {...field}
            onChange={(value) => form.setFieldValue(field.name, value)}
            min={0}
            max={100}
            colorScheme="teal"
          >
            <SliderTrack bg="rgba(255,255,255,0.4)">
              <SliderFilledTrack bg="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)" />
            </SliderTrack>
            <SliderThumb boxSize={6} color="#000" fontWeight="600">
              {field.value}
            </SliderThumb>
          </Slider>
        )}
      </Field>
    </Box>
  );
}

export default PlayerStrength;
