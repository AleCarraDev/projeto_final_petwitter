import Tweet from "../components/Tweet";
import { ModalTweet } from "../components/ModalTweet";
import {
  Flex,
  Image,
  Textarea,
  Button,
  FormControl,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllPetweets, postPetweet } from "../services/petweets";
import { useChange } from "../context/petweetChange-context";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [petweets, setPetweets] = useState([]);
  const [textLenght, setTextLenght] = useState(0);
  const { petweetsChange, setPetweetsChange } = useChange(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleChange = (event) => {
    let inputValue = event.target.value;
    setTextLenght(inputValue.length);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const content = formData.get("content");

    try {
      await postPetweet({ content });
      setPetweetsChange(!petweetsChange);
      setIsLoading(false);
      setPage(1);
      event.target.reset();
    } catch (error) {}
  }
  useEffect(() => {
    try {
      const request = async () => {
        const response = await getAllPetweets({ page, perPage: 10 });
        if (page === 1) {
          setPetweets(response.data.petweets);
        } else {
          setPetweets(petweets.concat(response.data.petweets));
        }
        setHasMore(page < response.data.pagination.pageCount);
      };
      request();
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petweetsChange, page]);

  return (
    <>
      <Flex
        p={"34px 0 0 27px"}
        borderBottom={"1px solid rgba(0, 0, 0, 0.1)"}
        boxShadow={"0px 10px 0px #E7ECF0;"}
        borderRight={"1px solid #EEEEEE"}
        borderLeft={"1px solid #EEEEEE"}
        display={["none", "flex"]}
      >
        <Image
          width={"48px"}
          height={"48px"}
          borderRadius={"50%"}
          src={
            "https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg"
          }
          alt={"avatar"}
        />
        <FormControl as={"form"} onSubmit={handleSubmit}>
          <Flex>
            <Textarea
              resize={"none"}
              focusBorderColor="none"
              border={"none"}
              placeholder="O que está acontecendo?"
              name="content"
              onChange={handleChange}
            />

            <Text color={"#828282"} fontWeight="400" m={"110px 10px 25px 0"}>
              {textLenght}/140
            </Text>
            <Button
              isLoading={isLoading}
              isDisabled={textLenght !== 0 ? false : true}
              m={"103px 30px 25px 0"}
              borderRadius={"10px"}
              variant="solid"
              width={"92px"}
              height={["40px"]}
              type="submit"
            >
              Petwittar
            </Button>
          </Flex>
        </FormControl>
      </Flex>

      <InfiniteScroll
        dataLength={petweets.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={
          <CircularProgress left={"50%"} isIndeterminate color="cyan.400" />
        }
      >
        {petweets?.map((user) => (
          <Tweet
            name={user.user.name}
            tweet={user.content}
            postTime={user.createdAt}
            username={user.user.username}
            photo={
              "https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg"
            }
          />
        ))}
      </InfiniteScroll>
      <ModalTweet />
    </>
  );
};

export default Home;
