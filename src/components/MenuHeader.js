import {
  Flex,
  Image,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../context/auth-context";
import { useRef } from "react";
import CustomLink from "./CustomLink";

const MenuHeader = () => {
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Flex
        display={["flex", "none"]}
        boxShadow={"0px 2px 4px rgba(33, 33, 33, 0.2)"}
        p={["16px 0 14px 16px"]}
        alignItems={["center"]}
        direction={["row"]}
        height={["48px"]}
      >
        <Button
          ref={btnRef}
          onClick={onOpen}
          display={["flex", "none"]}
          variant={"unstyled"}
          outline={"none"}
          height={"35px"}
          color={"cyan.400"}
          backgroundColor={"white"}
        >
          <Image height="16px" src="/images/hamburguerButt.png" alt="Logo" />
        </Button>
        <Image
          height={["28px", "54px"]}
          width={["116px", "225px"]}
          ml={["84px", "0"]}
          src="/images/cyanLogo.png"
          alt="Logo"
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Flex pt={"40px"} direction={"column"}>
            <DrawerHeader alignSelf={"center"}>
              <Image
                width={"56px"}
                height={"56px"}
                borderRadius={"50%"}
                src="https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg"
                alt="user"
              />
            </DrawerHeader>

            <DrawerBody p={"0"} mt={"36px"}>
              <Flex direction={"column"}>
                <CustomLink to={"/home"}>Home</CustomLink>
                <CustomLink to={`/profile/${auth.user.username}`}>
                  Meu Petfil
                </CustomLink>
              </Flex>
            </DrawerBody>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuHeader;
