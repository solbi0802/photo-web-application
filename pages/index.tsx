import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { Button, InputGroup } from '@blueprintjs/core';
import store from '../store';

const Home = (): JSX.Element => {
  const { photoStore } = store;
  const [item, setItem] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getPhotoList();
  }, []);

  const getPhotoList = async () => {
    const result = await photoStore.getPhotoList();
    setItem(result);
  };

  const searchPhoto = async () => {
    if (keyword) {
      const result = await photoStore.searchPhoto(keyword);
      setItem(result.results);
    } else {
      getPhotoList();
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Photo Web Application</title>
        <meta name="description" content="Photo Web Application" />
      </Head>
      <div className={styles.search_section}>
        <InputGroup
          className={styles.keyword}
          placeholder="사진 검색"
          onKeyUp={(e: any) => {
            setKeyword(e.target.value);
          }}
        />
        <Button
          className={styles.keyword}
          icon="search"
          onClick={(): void => {
            searchPhoto();
          }}
        >
          검색
        </Button>
      </div>
      <main className={styles.main}></main>
      {item?.map((i: any) => {
        return (
          <Image
            key={i.id}
            width={500}
            height={500}
            src={i.urls?.regular}
            alt={i.name}
            layout={'intrinsic'}
          />
        );
      })}
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
