import { Flex, Image, Text, CircularProgress } from "@chakra-ui/react";
import { useEffect, useState, useLayoutEffect } from "react";
import Tweet from "../components/Tweet";
import { getPetweetsByUserId } from "../services/petweets";
import { getUserByParams } from "../services/users";
import { CalendarIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import ptBrStrings from "react-timeago/lib/language-strings/pt-br";
import InfiniteScroll from "react-infinite-scroll-component";

const Profile = () => {
  const [petweets, setPetweets] = useState([]);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  let { username } = useParams();
  const formatter = buildFormatter(ptBrStrings);

  useEffect(() => {
    try {
      const request = async () => {
        const responseUser = await getUserByParams(username);
        setUser(responseUser.data.data.user);
      };
      request();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useLayoutEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    try {
      const request = async () => {
        const responsePetweets = await getPetweetsByUserId(user.id, {
          page,
          perPage: 10,
        });
        console.log(page);
        if (page === 1) {
          setPetweets(responsePetweets.data.petweets);
        } else {
          setPetweets(petweets.concat(responsePetweets.data.petweets));
        }
        setHasMore(page < responsePetweets.data.pagination.pageCount);
      };
      if (user) {
        request();
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, user]);

  return (
    <Flex direction={"column"}>
      <Flex
        borderBottom={"1px solid rgba(0, 0, 0, 0.1)"}
        borderRight={"1px solid #EEEEEE"}
        borderLeft={"1px solid #EEEEEE"}
        direction={"column"}
      >
        <Image
          zIndex={0}
          height={["100px", "221px"]}
          src="/images/profileBG.png"
          alt={"BG"}
        />
        <Image
          top={["122px", "-40px"]}
          left={["17px", "30px"]}
          position={["absolute", "relative"]}
          zIndex={1}
          width={["73px", "120px"]}
          height={["73px", "120px"]}
          borderRadius={"50%"}
          border={["4px solid #FFFFFF", "5px solid #FFFFFF"]}
          src={
            "https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg"
          }
          alt={"avatar"}
        />
        <Flex mt={["63px", "0"]} ml={"16px"} direction={"column"}>
          <Text color={"#141619"} fontWeight={"700"} fontSize={"22px"}>
            {user?.name}
          </Text>
          <Text lineHeight={["22px"]} color={["#687684"]}>
            @{user?.username}
          </Text>
          <Text mt={"12px"} color={"#424242"}>
            {" "}
            Bio do perfil
          </Text>
          <Flex mt={"12px"}>
            <CalendarIcon color={"#687684"} />
            <Text fontWeight={"400"} color={"gray.800"} ml={"4px"}>
              Entrou{" "}
              <TimeAgo date={new Date(user?.createdAt)} formatter={formatter} />
            </Text>
          </Flex>
          <Text
            ml={["9px", "0"]}
            width={"70px"}
            borderBottom={"4px solid #00ACC1"}
            fontWeight={"600"}
            color={"gray.800"}
            mt={["18px", "51px"]}
          >
            Petposts
          </Text>
        </Flex>
      </Flex>

      <Flex direction={"column"} overflow="hidden">
        <InfiniteScroll
          dataLength={petweets.length}
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          loader={
            <CircularProgress left={"50%"} isIndeterminate color="cyan.400" />
          }
        >
          {petweets?.map((petweet) => (
            <Tweet
              key={petweet.id}
              name={petweet.user.name}
              tweet={petweet.content}
              postTime={petweet.createdAt}
              username={petweet.user.username}
              photo={
                "https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg"
              }
            />
          ))}
        </InfiniteScroll>
      </Flex>
    </Flex>
  );
};

export default Profile;
