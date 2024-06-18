import { Box, Input, Text } from "@chakra-ui/react";
import { Field, ErrorMessage } from "formik";

const SponsorInfo = ({ sponsor, setSponsor }) => {
  return (
    <Box className="childBox">
      <Text mb="1rem" fontWeight="600">
        SPONSOR INFO
      </Text>

      <Field name="sponsor.name">
        {({ field }) => (
          <Input
            {...field}
            placeholder="Sponsor Name"
            mb="0.5rem"
            value={sponsor.name}
            onChange={setSponsor}
          />
        )}
      </Field>
      <ErrorMessage
        name="sponsor.name"
        component="div"
        className="error-message"
      />

      <Field name="sponsor.contact">
        {({ field }) => (
          <Input
            {...field}
            placeholder="Sponsor Contact Information"
            mb="0.5rem"
            value={sponsor.contact}
            onChange={setSponsor}
          />
        )}
      </Field>
      <ErrorMessage
        name="sponsor.contact"
        component="div"
        className="error-message"
      />

      <Field name="sponsor.amount">
        {({ field }) => (
          <Input
            {...field}
            placeholder="Sponsorship Amount"
            mb="0.5rem"
            value={sponsor.amount}
            onChange={setSponsor}
          />
        )}
      </Field>
      <ErrorMessage
        name="sponsor.amount"
        component="div"
        className="error-message"
      />

      <Field name="sponsor.period">
        {({ field }) => (
          <Input
            {...field}
            placeholder="Sponsorship Period (Start Date - End Date)"
            value={sponsor.period}
            onChange={setSponsor}
          />
        )}
      </Field>
      <ErrorMessage
        name="sponsor.period"
        component="div"
        className="error-message"
      />
    </Box>
  );
};

export default SponsorInfo;
