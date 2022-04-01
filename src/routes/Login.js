import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function Login() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const { signin } = useAuth();

  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await signin({ email, password });
      setIsLoading(false);
      navigate("/home", { replace: true });
    } catch (error) {}
  }

  return (
    <>
      <Flex direction={["column", "row"]}>
        <Flex
          width={["flex", "60%"]}
          height={["flex", "100vh"]}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          backgroundImage="url('images/loginBG.png')"
          direction={["column"]}
          p={["45px 0 25px 30px", "309px 187px 308px 162px"]}
        >
          <Image
            display={["none", "flex"]}
            minWidth="418px"
            src="images/whiteLogo.png"
            alt="logo"
          />
          <Image
            display={["flex", "none"]}
            width={["52px"]}
            height={["52px"]}
            src="images/whiteStepSymbol.png"
            alt="stepSymbol"
          />
          <Text
            display={["flex", "none"]}
            mt={["40px"]}
            fontSize="36px"
            color={["#FFFFFF"]}
            lineHeight={["49px"]}
          >
            Comece agora. Conecte-se já.
          </Text>
        </Flex>
        <Flex
          p={["30px 32px 24px 32px", "63px 72px 80px 72px"]}
          direction={["column"]}
          alignItems={"center"}
          width={["100%", "40%"]}
        >
          <Image
            alignSelf={"flex-start"}
            display={["none", "flex"]}
            width={["76px"]}
            height={["76px"]}
            src="images/cyanStepSymbol.png"
            alt="stepSymbol"
          />
          <Text
            display={["none", "flex"]}
            mt={"26px"}
            mb={"32px"}
            fontSize="36px"
            fontWeight={"700"}
            color={["cyan.400"]}
            lineHeight={["49px"]}
            alignSelf={"flex-start"}
          >
            Comece agora. <br />
            Conecte-se já.
          </Text>
          <Text
            color={["#212121"]}
            fontSize={["24px"]}
            lineHeight={["40px"]}
            fontWeight={["600px"]}
            alignSelf={["flex-start"]}
          >
            Login
          </Text>

          <FormControl as={"form"} onSubmit={handleSubmit} mt={["32px"]}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              width={["100%"]}
              height={["40px"]}
              name="email"
              type="email"
              placeholder="Email"
            />
            <Flex justify={["space-between"]}>
              <FormLabel mt="32px" htmlFor="senha">
                Senha
              </FormLabel>
              <Link
                textDecoration={["underline"]}
                mt="32px"
                color="cyan.400"
                as={ReachLink}
                to="/recovery-password"
              >
                Esqueci minha senha
              </Link>
            </Flex>
            <InputGroup>
              <Input
                width={["100%"]}
                height={["40px"]}
                name="password"
                type={show ? "text" : "password"}
                placeholder="Senha"
              />
              <InputRightElement width="4.5rem">
                {/* TODO: FIX THE ICON ( OUTLINE BORDER) */}
                <Button
                  variant={"unstyled"}
                  outline={"none"}
                  height={"30px"}
                  color={"black"}
                  backgroundColor={"white"}
                  onClick={handleClick}
                >
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              isLoading={isLoading}
              variant="solid"
              mt="40px"
              width={["100%"]}
              height={["40px"]}
              type="submit"
            >
              Entrar
            </Button>
          </FormControl>
          <Flex alignSelf={"flex-start"} direction={["column", "row"]}>
            <Text mt={["24px"]}>Ainda não possui uma conta?</Text>
            <Link
              mt={["0", "24px"]}
              ml={["0", "5px"]}
              textDecoration={["underline"]}
              color="cyan.400"
              as={ReachLink}
              to="/register"
            >
              Cadastre-se
            </Link>
          </Flex>
          <Image
            display={["flex", "none"]}
            mt={["62px"]}
            width={["180px"]}
            src={["images/cyanLogo.png"]}
            alt="petwitterLogo"
          />
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
