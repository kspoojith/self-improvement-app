import { Button, Card, CardBody, CardFooter, Heading, Text, Stack, Flex } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { EditIcon } from "@chakra-ui/icons";

const BehaviourCard = ({ behaviour, onDelete, onEdit,onView }) => {
  return (
    <Card width="320px" mb={9}>
      <CardBody>
        <Stack spacing={4} align="start">
          <Heading size="md">{behaviour.title}</Heading>
          <Text noOfLines={4}>
            {behaviour.description}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="space-between" alignItems="center" gap={2}>
        <Button colorScheme="blue" onClick={()=>onView()}>View</Button>
        <Flex gap={3} align="center">
          <EditIcon
            boxSize={5}
            cursor="pointer"
            onClick={() => onEdit(behaviour)} // Pass the behaviour data for editing
          />
          <MdDelete 
            size={25} 
            style={{ cursor: 'pointer' }} 
            onClick={() => onDelete && onDelete(behaviour._id)} 
          />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default BehaviourCard;
