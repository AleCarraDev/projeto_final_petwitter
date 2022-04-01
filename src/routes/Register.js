import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { signup } from "../services/auth";

function Register() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  let schema = yup.object().shape({
    name: yup
      .string("Campo nome precisa ser um texto")
      .required("Campo nome é necessário"),
    password: yup
      .string("Campo senha precisa ser um texto")
      .required("Campo senha é necessário")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/,
        "Deve conter 8 caracteres, uma letra maiúscula, uma minúscula, um caracter especial e um número"
      ),
    email: yup
      .string("Campo email precisa ser um texto")
      .required("Campo email é necessário"),
    username: yup
      .string("Campo usuario precisa ser um texto")
      .required("Campo usuario é necessário"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    try {
      await signup(data);
      navigate("/login", { replace: true });
    } catch (error) {
      toast({
        title: "Conta não foi criada.",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleClick = () => setShow(!show);

  return (
    <>
      <Flex direction={["column", "row"]}>
        <Flex
          width={["flex", "50%"]}
          height={["flex", "100vh"]}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          backgroundImage={[
            "url('images/registerBG.png')",
            "url('images/fullRegisterBG.png')",
          ]}
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
        </Flex>
        <Flex
          width={["100%", "50%"]}
          p={["30px 32px 24px 32px", "60px 64px 50px 74px"]}
          direction={["column"]}
          alignItems={"center"}
        >
          <Image
            alignSelf={"flex-start"}
            display={["none", "flex"]}
            width={["76px"]}
            height={["76px"]}
            src="images/cyanStepSymbol.png"
            alt="stepSymbol"
            mb={["46px"]}
          />
          <Text
            color={["#212121"]}
            fontSize={["24px"]}
            lineHeight={["40px"]}
            fontWeight={["600px"]}
            alignSelf={["flex-start"]}
          >
            Cadastro
          </Text>
          <FormControl
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
            mt={["32px"]}
          >
            <FormLabel htmlFor="email">Nome</FormLabel>
            <Input
              width={["100%"]}
              height={["40px"]}
              type="text"
              placeholder="Nome"
              {...register("name")}
            />
            <Text fontSize={["10px"]} mt={["4px"]}>
              {errors.name && <span>{errors.name.message}</span>}
            </Text>
            <FormLabel mt="16px" htmlFor="email">
              Email
            </FormLabel>
            <Input
              width={["100%"]}
              height={["40px"]}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <Text fontSize={["10px"]} mt={["4px"]}>
              {errors.email && <span>{errors.email.message}</span>}
            </Text>
            <FormLabel mt="16px" htmlFor="email">
              Nome de usuário
            </FormLabel>
            <Input
              width={["100%"]}
              height={["40px"]}
              type="text"
              placeholder="EX.: billbuldog"
              {...register("username")}
            />
            <Text fontSize={["10px"]} mt={["4px"]}>
              {errors.username && <span>{errors.username.message}</span>}
            </Text>
            <FormLabel mt="16px" htmlFor="senha">
              Senha
            </FormLabel>
            <InputGroup>
              <Input
                width={["100%"]}
                height={["40px"]}
                type={show ? "text" : "password"}
                placeholder="Senha"
                {...register("password")}
              />

              <InputRightElement width="4.5rem">
                {/* TODO: FIX THE ICON (OUTLINE BORDER) */}
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
            <Text fontSize={["10px"]} mt={["4px"]}>
              {errors.password && <span>{errors.password.message}</span>}
            </Text>

            <Button
              isLoading={isSubmitting}
              variant="solid"
              mt="40px"
              width={["100%"]}
              height={["40px"]}
              type="submit"
            >
              Registrar
            </Button>
          </FormControl>
          <Flex alignSelf={"flex-start"} direction={["column", "row"]}>
            <Text mt={["24px"]}>Já possui cadastro?</Text>
            <Link
              mt={["0", "24px"]}
              ml={["0", "5px"]}
              textDecoration={["underline"]}
              color="cyan.400"
              as={ReachLink}
              to="/login"
            >
              Faça login
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

export default Register;
