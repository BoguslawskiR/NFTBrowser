import { Button, Center } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js';

export default function Home() {
  return <Center height="100vh">
    <Link href='/0xED5AF388653567Af2F388E6224dC7C4b3241C544/9266' color='blue.400' _hover={{ color: 'blue.500' }}>
      <Button type="button" variant="outline">Example Token</Button>
    </Link>
  </Center>;
};