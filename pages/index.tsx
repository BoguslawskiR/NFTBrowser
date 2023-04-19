import { Box, Button, Center, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';

export default function Home() {
  const router = useRouter();

  return <Center height="100vh">
    <Box display="flex" flexDir="column">
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const data = new FormData(e.target as HTMLFormElement);
          router.push(`/${data.get('address')}/${data.get('tokenId')}`);
        }}
      >
        <FormControl>
          <FormLabel>Collection Address</FormLabel>
          <Input type="text" name="address" />
        </FormControl>
        <FormControl>
          <FormLabel>Token Id</FormLabel>
          <Input type="number" step="1" min="0" name="tokenId" />
        </FormControl>
        <Button type="submit" variant="solid">Search</Button>
        <Link href='/0xED5AF388653567Af2F388E6224dC7C4b3241C544/9266' color='blue.400' width="100%" _hover={{ color: 'blue.500' }}>
          <Button type="button" variant="outline" width="100%">Example Token</Button>
        </Link>
      </form>
    </Box>
  </Center>;
};