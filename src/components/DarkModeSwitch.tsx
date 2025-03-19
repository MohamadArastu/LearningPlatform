import { Flex, Text, Switch, useColorMode } from "@chakra-ui/react";

export default function DarkModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex align="center" justify="flex-end" mb={6}>
      <Text mr={2}>{colorMode === "light" ? "Light Mode" : "Dark Mode"}</Text>
      <Switch
        colorScheme="teal"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        size={"lg"}
      />
    </Flex>
  );
}
