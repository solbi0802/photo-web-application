import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  collection: any[];
}

const CollectionList = (props: Props): JSX.Element => {
  const { collection } = props;
  const [collectionItem, setCollectionItem] = useState(collection);

  return <span>collection</span>;
};

export default CollectionList;
