import { useRouter } from "next/router";
import { TokenService, TokenServiceKeys } from "@/app/data/TokenService";
import { useQuery } from "react-query";
import { TokenResponse } from "@/app/types/token";
import { AspectRatio, Box, Heading, TagLabel, Text } from "@chakra-ui/react";
import Image from "next/image";
import OwnerIndicator from "@/app/components/wallet/OwnerIndicator";
import dynamic from "next/dynamic";
import { Address } from "wagmi";

const Layout = dynamic(
  () => import('@/app/components/layout'),
  { ssr: false }
)
interface Props {
  initialData: TokenResponse;
}

export default function TokenDetailsPage({ initialData }: Props) {
  const router = useRouter()
  const { data } = useQuery({
    initialData,
    queryKey: TokenServiceKeys.getTokenById(router.query.address as string, router.query.tokenId as string),
    queryFn: () => TokenService.getTokenById(router.query.address as string, router.query.tokenId as string),
    enabled: !!router.query.address && !!router.query.tokenId
  })

  return <Layout>
    <Box display="flex" flexDir={['column', 'column', 'row']} p={4} gap={4}>
      {data?.data.imageURI && <AspectRatio rounded={4} flex={1} overflow="hidden" pos="relative" ratio={1}><Image src={data?.data.imageURI} alt="Token Image" fill /></AspectRatio>}
      <Box display="flex" flexDir="column" gap={2} flex={2}>
        <Heading>{data?.data.name}</Heading>
        <Text size="xs">{data?.data.tokenId}</Text>
        <Text>{data?.data.description}</Text>
        <OwnerIndicator assetAddress={router.query.address as Address} tokenId={router.query.tokenId as string} />
      </Box>
    </Box>
  </Layout>;
};
