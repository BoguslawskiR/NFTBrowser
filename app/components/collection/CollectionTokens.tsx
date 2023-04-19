import alchemy from "@/app/data/alchemy";
import { AspectRatio, Box, Card, CardBody, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Nft } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Address } from "wagmi";
import Link from "next/link";

interface Props {
  collectionAddress?: Address;
}

export default function CollectionTokens({ collectionAddress }: Props) {
  const [collectionTokens, setCollectionTokens] = useState<Nft[]>([]);
  useEffect(() => {
    if (collectionAddress) {
      alchemy.nft.getNftsForContract(collectionAddress, { pageSize: 4 }).then((response) => {
        setCollectionTokens(response.nfts);
      });
    }
  }, [collectionAddress]);
  return <Box display="flex" flexDir="column" p={4} gap={4}>
    <Heading size="md">Check other collection NFTs</Heading>
    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={6}>
      {collectionTokens.map((nft) => <Link href={`/${nft.contract.address}/${nft.tokenId}`}>
        <Card key={nft.tokenId} maxW='sm'>
          <CardBody>
            <AspectRatio rounded={4} flex={1} overflow="hidden" pos="relative" ratio={1}><Image src={nft.media[0].thumbnail!} alt="Token Image" fill /></AspectRatio>
            <Stack mt='6' spacing='3'>
              <Heading size='sm'>{nft.title}</Heading>
            </Stack>
          </CardBody>
        </Card>
      </Link>)}
    </Grid>
  </Box>;
};