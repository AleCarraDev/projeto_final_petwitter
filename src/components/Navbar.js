import { Outlet } from "react-router-dom";
import { Flex, Image, Container, Grid, GridItem } from "@chakra-ui/react";
import MenuHeader from "./MenuHeader";
import { useAuth } from "../context/auth-context";
import CustomLink from "./CustomLink";

function Navbar() {
  const auth = useAuth();
  return (
    <Container p={0} maxW={"container.xl"}>
      <Grid templateColumns="repeat(9, 1fr)">
        <GridItem colSpan={[0, 2]}>
          <Flex display={["none", "flex"]} direction="column">
            <Flex p={"24px 36px"}>
              <Image minWidth={"225px"} src="/images/cyanLogo.png" alt="Logo" />
            </Flex>
            <CustomLink icon={"home"} to={"/home"}>
              Home
            </CustomLink>
            <CustomLink icon={"petfil"} to={`/profile/${auth.user.username}`}>
              Meu Petfil
            </CustomLink>
          </Flex>{" "}
        </GridItem>
        <GridItem colSpan={[9, 5]}>
          <MenuHeader />
          <Outlet />
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Navbar;
