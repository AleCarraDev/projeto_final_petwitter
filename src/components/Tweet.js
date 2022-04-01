import { Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import ptBrStrings from "react-timeago/lib/language-strings/pt-br";

const Tweet = (props) => {
  const { photo, name, username, postTime, tweet } = props;
  const formatter = buildFormatter(ptBrStrings);
  return (
    <Flex
      borderBottom={"1px solid #EEEEEE"}
      borderRight={["none", "1px solid #EEEEEE"]}
      borderLeft={["none", "1px solid #EEEEEE"]}
      p={["20px 16px 16px 16px"]}
    >
      <Image
        width={["48px", "40px"]}
        height={["48px", "40px"]}
        borderRadius={"50%"}
        src={photo}
        alt={username}
      />
      <Flex pl={"16px"} direction={"column"}>
        <Flex direction={"row"}>
          <Flex as={Link} to={`/profile/${username}`}>
            <Text
              color={["#757575", "black"]}
              lineHeight={["19px", "20px"]}
              fontWeight={"bold"}
            >
              {name}
            </Text>
            <Text
              lineHeight={["17px", "20px"]}
              color={["#757575", "#828282"]}
              ml={["4px"]}
            >
              @{username} •
            </Text>
          </Flex>
          <Text
            lineHeight={["17px", "20px"]}
            color={["#757575", "#828282"]}
            ml={["4px"]}
          >
            <TimeAgo date={new Date(postTime)} formatter={formatter} />
          </Text>
        </Flex>
        <Text color={["#141619", "#333333"]} mt={"4px"}>
          {tweet}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Tweet;
