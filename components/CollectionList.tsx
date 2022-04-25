import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Collection.module.scss';
import { rgbDataURL } from '../utils/color';
import DetailDialog from './DetailDialog';
import { userInfo } from 'os';

interface Props {
  collection: any[];
}

const CollectionList = (props: Props): JSX.Element => {
  const { collection } = props;
  const [photoId, setPhotoId] = useState<string>('');
  const [showDetailDialog, setShowDetailDialog] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <p>Related collections</p>
      <div className={styles.collection_area}>
        {collection?.map((c: any, index: number) => {
          return (
            <div key={index} className={styles.collection_list}>
              {c.preview_photos.map((preview: any, index: number) => {
                if (index < 3) {
                  return (
                    <Image
                      key={index}
                      className={styles.collection_image}
                      width={300}
                      height={300}
                      src={preview?.urls?.regular}
                      alt={c.alt_description}
                      layout={'intrinsic'}
                      placeholder="blur"
                      blurDataURL={rgbDataURL(1, 1, 1)}
                      onClick={(): void => {
                        window.open(`${c.links.html}`);
                      }}
                    />
                  );
                }
              })}

              <h2>{c.title}</h2>
              <div className={styles.info_section}>
                <p>{`${c.total_photos} photos ·`}</p>
                <p>
                  Curated by
                  <a href={c.user.links.html} target="_blank" rel="noreferrer">
                    {` ${c.user.name}`}
                  </a>
                </p>
              </div>
              {c.tags.map((tag: any, index: number) => {
                if (index < 3) {
                  return (
                    <p key={index} className={styles.tag}>
                      <a
                        href={`https://unsplash.com/s/photos/${tag.title}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {tag.title}
                      </a>
                    </p>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionList;
