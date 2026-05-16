interface ArtworkPageProps {
  params: Promise<{
    museum: string;
    artworkId: string;
  }>;
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { museum, artworkId } = await params;

  return (
    <div>
      {museum} - {artworkId}
    </div>
  );
}
