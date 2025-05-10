import { createFileRoute } from "@tanstack/react-router";
import { contentsAPI } from "@/api";
import { type ContentSchema } from "@/api/returnTypes";
import { EditorLoading } from "@/components/editor/editor-loading";
import { useStoreSlug } from "@/hooks/use-store-slug";
import React from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { storeSlug } = useStoreSlug();
  const [contents, setContents] = React.useState<ContentSchema[]>([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchContents = async () => {
      if (!storeSlug) return;

      try {
        const data = await contentsAPI.getContentsByStoreSlug(storeSlug);
        setContents(data);
      } catch (error) {
        console.error("Failed to fetch contents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContents();
  }, [storeSlug]);

  if (!storeSlug) return <EditorLoading />;

  if (isLoading) return <EditorLoading />;
  if (contents === null) return { notFound: true };

  return <pre>{JSON.stringify(contents, null, 2)}</pre>;
}
