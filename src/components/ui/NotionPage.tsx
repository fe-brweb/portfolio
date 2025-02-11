"use client";

import Link from "next/link";
import { type ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import { Equation } from "react-notion-x/build/third-party/equation";
import { Modal } from "react-notion-x/build/third-party/modal";
import { Pdf } from "react-notion-x/build/third-party/pdf";

import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";
import { useEffect, useState } from "react";

export default function NotionPage({
  recordMap,
  previewImagesEnabled,
  rootPageId,
  rootDomain,
}: {
  recordMap: ExtendedRecordMap;
  previewImagesEnabled?: boolean;
  rootPageId?: string;
  rootDomain?: string;
}) {
  const [hydrateData, setHydrateData] = useState<ExtendedRecordMap | null>(
    null,
  );

  useEffect(() => {
    setHydrateData(recordMap);
  }, [recordMap]);

  if (!hydrateData) return <p>Loading...</p>;

  return (
    <NotionRenderer
      recordMap={hydrateData}
      fullPage={false}
      darkMode={false}
      rootDomain={rootDomain}
      rootPageId={rootPageId}
      previewImages={previewImagesEnabled}
      components={{
        nextLink: Link,
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
      }}
    />
  );
}
